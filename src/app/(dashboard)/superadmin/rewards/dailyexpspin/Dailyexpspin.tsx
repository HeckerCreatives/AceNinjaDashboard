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
import { tierImg } from '@/utils/findAsset'
import { Input } from '@/components/ui/input'

  

export default function Dailyexpspin() {
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
                <p className=' text-lg font-semibold'>Rewards / Daily Exp Spin</p>
            </div>

            <div className=' w-full -full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] p-6 gap-4'>
                {Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-1 w-full">
                    <p className="text-[.7rem] text-zinc-300">Amount {index + 1}</p>
                    <Input placeholder="Amount" className="bg-amber-900 text-white" />
                </div>
                ))}
                
            </div>

            <div className=' w-full flex items-end justify-end mt-2 p-6'>
                <Button>Save</Button>
            </div>

      
        
        </div>
            
        </div>

    

    </div>
  )
}
