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
import { useDeleteSeasons, useGetSeasons } from '@/client_actions/superadmin/season'
import CreateSeasons from '@/components/forms/CreateSeasons'
import Pagination from '@/components/common/Pagination'
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
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import UpdateSeasons from '@/components/forms/UpdateSeason'
  

export default function Seasons() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const {data, isLoading} = useGetSeasons(currentPage, 10, '')
    const {mutate: deleteSeasons, isPending} = useDeleteSeasons()
    const [open, setOpen] = useState(false)

      //paginition
      const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

     useEffect(() => {
        if(data){
            setTotalPage(data.totalPages)
            
        }
    },[data])

    const deleteSeasonData = ( id: string) => {
        deleteSeasons({id: id}, {
            onSuccess: () => {
                toast.success(`Season data deleted successfully.`);
                setOpen(false)
              },
        })
    }

    

  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Seasons</p>
            </div>

            <div className=' flex flex-col gap-4 ~p-2/8'>

                <div className=' w-full flex flex-wrap gap-4 items-center justify-between'>
                    <CreateSeasons/>


                    {/* <div className=' relative flex items-center'>
                        <Search size={15} className=' absolute left-2'/>

                        <input type="text" placeholder='Search player' className=' text-xs h-[30px] p-2 pl-7 bg-zinc-800 rounded-md' />
                    </div> */}

                </div>


                
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
                    <TableHead className="">Created at</TableHead>
                    <TableHead className="">Season</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={item._id}>
                        <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.duration} days</TableCell>
                        <TableCell className={`${item.isActive === 'active' ? 'text-green-500' : 'text-red-600'}`}>{item.isActive}</TableCell>
                        <TableCell className=' flex items-center gap-2'>
                            <UpdateSeasons id={item._id} title={item.title} duration={item.duration} status={item.isActive}/>
                            <Dialog>
                            <DialogTrigger className=' flex items-center gap-1 bg-red-600 p-1 rounded-sm text-xs'>
                                <Trash size={15}/>
                            </DialogTrigger>
                            <DialogContent className=' max-w-[500px] h-auto p-6'>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure, you want to delete this season data?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the data.
                                </DialogDescription>
                                </DialogHeader>

                                <div className=' w-full flex items-end justify-end'>
                                    <Button disabled={isPending} onClick={() => deleteSeasonData(item._id)}>
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
