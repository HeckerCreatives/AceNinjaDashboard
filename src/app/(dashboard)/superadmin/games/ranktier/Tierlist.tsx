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
import Loader from '@/components/common/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import toast from 'react-hot-toast'
import CreateRankTier from '@/components/forms/CreateRankTier'
import { useDeleteRankTier, useGetTierlist } from '@/client_actions/superadmin/ranktier'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EditRankTier from '@/components/forms/EditrankTier'

  

export default function Tierlist() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [open, setOpen] = useState(false)
    const {data, isLoading} = useGetTierlist()
    const {mutate: deleteRankTier, isPending} = useDeleteRankTier()
    
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


   const deleteData = (id: string) => {
    deleteRankTier({id: id}, {
        onSuccess: () => {
        toast.success(`Rank tier deleted successfully`);
          setOpen(false)
        },
    })
   }


  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Rank (Tier)</p>
            </div>

            <div className=' flex flex-col gap-4 p-4'>
                <CreateRankTier/>
                <Table className=' text-xs h-auto'>
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
                    <TableHead className=" w-[300px]">Icon</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Required MMMR</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={item._id}>
                            <TableCell className="">
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.icon}`} alt="banner" className=' h-[80px]' />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.requiredmmr}</TableCell>
                            <TableCell className=' flex items-center gap-2'>
                                <EditRankTier id={item._id} name={item.name} mmr={item.requiredmmr} icon={item.icon}/>
                                <Dialog>
                                <DialogTrigger className=' flex items-center gap-1 bg-red-600 p-1 rounded-sm text-xs'>
                                    <Trash size={13}/>
                                </DialogTrigger>
                                <DialogContent className=' max-w-[500px] h-auto p-6'>
                                    <DialogHeader>
                                    <DialogTitle>Are you absolutely sure, you want to delete this rank tier?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete the rank tier data.
                                    </DialogDescription>
                                    </DialogHeader>

                                    <div className=' w-full flex items-end justify-end'>
                                        <Button disabled={isPending} onClick={() => deleteData(item._id)} >
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

            </div>
        
        </div>
            
        </div>

    

    </div>
  )
}
