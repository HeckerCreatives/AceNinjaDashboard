'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useDeleteNewsletter, useGetNewsletter } from '@/client_actions/superadmin/newsletter'
import CreateNewsletterForm from '@/components/forms/CreateNewsletter'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import EditNewsletterForm from '@/components/forms/EditNewsletter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Subscriberslist from './Subscriberslist'

  

export default function Subscribers() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [open, setOpen] = useState(false)
    const {data, isLoading} = useGetNewsletter(currentPage, 10, 'subscriber')
    const {mutate: deleteNewsletter, isPending} = useDeleteNewsletter()
    
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setTotalPage(data?.data.totalpages || 0)
   },[data])

   const deleteNewsletterdata = (id: string) => {
    deleteNewsletter({newsletterid: id}, {
        onSuccess: () => {
        toast.success(`Newsletter deleted successfully`);
          setOpen(false)
        },
    })
   }


  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Newsletter (Subscribers)</p>
            </div>

            <Tabs defaultValue="Newsletter" className=" w-full p-4">
            <TabsList>
                <TabsTrigger value="Newsletter">Newsletter</TabsTrigger>
                <TabsTrigger value="Subscribers">Subscribers</TabsTrigger>
            </TabsList>
            <TabsContent value="Newsletter">
            <div className=' flex flex-col gap-4 p-4'>
                <CreateNewsletterForm type={'subscriber'}/>
                <Table className=' text-xs h-auto'>
                {data?.data.news.length === 0 && (
                    <TableCaption>No data.</TableCaption>
                    )}

                    {isLoading && (
                    <TableCaption>
                        <Loader/>
                    </TableCaption>
                    )}
                <TableHeader>
                    <TableRow>
                    <TableHead className=" w-[300px]">Banner Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.news.map((item, index) => (
                        <TableRow key={item.newsid}>
                            <TableCell className="">
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.banner}`} alt="banner" className=' h-[80px]' />
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell className=' flex items-center justify-center gap-2'>
                            <EditNewsletterForm title={item.title} description={item.description} id={item.newsid} banner={item.banner}/>
                            <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger className=' flex items-center gap-1 bg-red-600 p-1 rounded-sm text-xs'>
                                <Trash size={13}/>
                            </DialogTrigger>
                            <DialogContent className=' max-w-[500px] h-auto p-6'>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure, you want to delete this newsletter?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the newsletter.
                                </DialogDescription>
                                </DialogHeader>

                                <div className=' w-full flex items-end justify-end'>
                                    <Button disabled={isPending} onClick={() => deleteNewsletterdata(item.newsid)} >
                                        {isPending && <Loader/>}
                                        Continue</Button>
                                </div>
                            </DialogContent>
                            </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                
                </TableBody>
                </Table>

                
                    {data?.data.news.length !== 0 && (
                    <div className=' w-full flex items-center justify-center mb-4'>
                    <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

                    </div>

                    )}
            </div>
            </TabsContent>
            <TabsContent value="Subscribers">
                <Subscriberslist/>
            </TabsContent>
            </Tabs>


         

           
        </div>
            
        </div>

    

    </div>
  )
}
