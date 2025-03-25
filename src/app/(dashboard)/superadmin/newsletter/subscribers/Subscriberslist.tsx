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
import { useGetNewsletter, useDeleteNewsletter } from '@/client_actions/superadmin/newsletter'
import PaginitionComponent from '@/components/common/Pagination'
import EditNewsletterForm from '@/components/forms/EditNewsletter'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"  
import toast from 'react-hot-toast'
import { useDeleteSubscribers, useGetSubscriber } from '@/client_actions/superadmin/subscribers'
import Loader from '@/components/common/Loader'
import { Trash } from 'lucide-react'

export default function Subscriberslist() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [open, setOpen] = useState(false)
    const {data, isLoading} = useGetSubscriber(currentPage, 10, '')
    const {mutate: deleteSubscribers, isPending} = useDeleteSubscribers()
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSelect = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === data?.data.data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data?.data.data.map((item) => item._id) || []); // Select all
    }
  };

  useEffect(() => {
    setTotalPage(data?.data.totalpages || 0)
   },[data])

   const deleteSubscribersdata = () => {
    if(selectedIds.length === 0){
        toast.error(`There is no subscriber selected.`);
    } else {
        deleteSubscribers({userIds: selectedIds}, {
            onSuccess: () => {
            toast.success(`Subscribers deleted successfully`);
              setOpen(false)
            },
        })
    }
   
   }

  return (
    <div className=' flex flex-col gap-4 p-4'>

        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className=' flex items-center gap-1 bg-red-600 px-3 py-1 rounded-sm text-xs w-fit'>
            <Trash size={13}/> Delete
        </DialogTrigger>
        <DialogContent className=' max-w-[500px] h-auto p-6'>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure, you want to delete the selected subcribers?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete the subcribers data.
            </DialogDescription>
            </DialogHeader>
            <div className=' w-full flex items-end justify-end'>
                <Button disabled={isPending} onClick={deleteSubscribersdata} >
                    {isPending && <Loader/>}
                    Continue</Button>
            </div>
        </DialogContent>
        </Dialog>

        
         <Table className=' text-xs h-auto'>
                {data?.data.data.length === 0 && (
                    <TableCaption>No data.</TableCaption>
                    )}

                    {isLoading && (
                    <TableCaption>
                        <Loader/>
                    </TableCaption>
                    )}
                <TableHeader>
                    <TableRow>
                    <TableHead className=' flex items-center gap-2'>
                    <input
                        type="checkbox"
                        checked={selectedIds.length === data?.data.data.length}
                        onChange={handleSelectAll}
                        className=' cursor-pointer'
                    />
                    <p>Select All</p>
                    </TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.data.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell>
                                <input
                                type="checkbox"
                                checked={selectedIds.includes(item._id)}
                                onChange={() => handleSelect(item._id)}
                                className=' cursor-pointer'
                                />
                            </TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{item.email}</TableCell>
                          
                        </TableRow>
                    ))}
                
                </TableBody>
         </Table>

                
        {data?.data.data.length !== 0 && (
        <div className=' w-full flex items-center justify-center mb-4'>
            <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>
            </div>

            )}
    </div>
  )
}
