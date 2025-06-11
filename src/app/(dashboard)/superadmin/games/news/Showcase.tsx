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
import { Plus, Trash } from 'lucide-react'
import CreateNewsForm from '@/components/forms/CreateNewsForm'
import Pagination from '@/components/common/Pagination'
import { useDeleteNews, useGetNews } from '@/client_actions/superadmin/website'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import Loader from '@/components/common/Loader'
import EditNewsForm from '@/components/forms/EditNews'
import { useDeleteShowcaseItem, useGetShowcaseItems } from '@/client_actions/superadmin/news'
import CreateShowcaseForm from '@/components/forms/CreateShowcase'
import EditShowcaseForm from '@/components/forms/EditShowcaseData'
  
  

export default function Showcase() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const {mutate: deleteShowcaseItem , isPending} = useDeleteShowcaseItem()
    const [open, setOpen] = useState(false)
    const {data, isLoading} = useGetShowcaseItems(currentPage, 10)
    



     //paginition
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        if(data){
        setTotalPage(data.totalPages)
        }
    },[data])

    console.log(data?.totalPages)

    const deleteShowcaseData = (id: string) => {
        deleteShowcaseItem({id: id},{
            onSuccess: () => {
                toast.success(`Showcase deleted successfully.`);
                  setOpen(false)
              },
        })
    }

    const extractVideoId = (url: string): string | null => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

  return (
    <div className=' w-full'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Showcase</p>
            </div>

            <div className=' flex flex-col gap-4 p-4'>
                <CreateShowcaseForm/>
                <Table className=' text-xs'>
                {data?.data.length === 0 && (
                <TableCaption>No data.</TableCaption>
                )}
                
                {isLoading && (
                <TableCaption>
                    <Loader/>
                </TableCaption>
                )}
                <TableHeader>
                    <TableRow>
                    <TableHead className=' w-[300px]'>Showcase Title</TableHead>
                    <TableHead className=' w-[300px]'>Item Name</TableHead>
                    <TableHead>Item Type</TableHead>
                    <TableHead>Rarity</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={item.id}>
                      
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.item?.name}</TableCell>
                        <TableCell>{item.itemtype}</TableCell>
                        <TableCell>{item.item?.rarity}</TableCell>
                        <TableCell className=' flex items-center gap-2'>
                            <EditShowcaseForm itemid={item.item?._id} itemtype={item.itemtype} title={item.title} id={item.id} />
                            {/* <EditNewsForm title={item.title} content={item.content} type={item.type} url={item.url} id={item.id}/> */}
                            <Dialog>
                            <DialogTrigger className=' flex items-center gap-1 bg-red-600 p-1 rounded-sm text-xs'>
                                <Trash size={15}/>
                            </DialogTrigger>
                            <DialogContent className=' max-w-[500px] h-auto p-6'>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure, you want to delete this showcase item?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the showcase item.
                                </DialogDescription>
                                </DialogHeader>

                                <div className=' w-full flex items-end justify-end'>
                                    <Button disabled={isPending} onClick={() => deleteShowcaseData(item.id)}>
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

                {data?.data.length !==0 && (
                <Pagination currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

                )}
            </div>

           
        </div>
            
        </div>

    

    </div>
  )
}
