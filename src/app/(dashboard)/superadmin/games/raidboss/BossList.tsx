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

import { Eye, SquarePen, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { editBossStatus, Reward, useEditBossStatus, useGetBossList } from '@/client_actions/superadmin/raidboss'
import { RaidRewardsDialog } from './RaidBossRewards'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'

  

export default function Bosslist() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [open, setOpen] = useState(false)
    const {data: boss, isLoading} = useGetBossList()
    const [viewRewards, setViewRewards] = useState<Reward[] | null>(null)
    const [bossId, setBossid] = useState('')
    const [status, setStatus] = useState('')
    const { mutate: editBossStatus, isPending} = useEditBossStatus()
    
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


   const updateStatus = () => {
    editBossStatus({ bossid: status}, {
        onSuccess: () => {
        toast.success(`Raid boss status updated successfully`);
          setOpen(false)
        },
    })
   }



  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Raid Boss</p>
            </div>

            <div className=' flex flex-col gap-4 p-4'>
                {/* <CreateRankTier/> */}
                <Table className=' text-xs h-auto'>
                {boss?.pagination.totalCount === 0 && (
                    <TableCaption>No data.</TableCaption>
                    )}

                    {isLoading && (
                    <TableCaption>
                        <Loader/>
                    </TableCaption>
                    )}
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Rewards</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {boss?.data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.bossname}</TableCell>
                            <TableCell> 
                                <Button className=' bg-zinc-700 text-white' onClick={() => {setViewRewards(item.rewards), setBossid(item.id)}}><Eye size={15}/> Rewards</Button>
                            </TableCell>
                            <TableCell>
                                <Badge className={` capitalize ${item.status === 'active' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell className=' flex items-center gap-2'>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger onClick={() => setStatus(item.id)} className=' bg-amber-800 text-white p-2 flex items-center gap-1 rounded-sm'><SquarePen size={15}/>Status</DialogTrigger>
                                    <DialogContent className=' max-w-sm h-fit p-6 bg-amber-950 border-[1px] border-amber-800'>
                                        <DialogHeader>
                                        <DialogTitle>Raid Boss</DialogTitle>
                                        <DialogDescription>
                                           Set active {item.bossname} raid boss.
                                        </DialogDescription>
                                        </DialogHeader>

                                        {/* <Select>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                           
                                        </SelectContent>
                                        </Select> */}

                                        <Button disabled={isPending} onClick={() => updateStatus()} className=' mt-4'>
                                                             {isPending && <Loader/>}
                                            
                                            Set Active</Button>
                                    </DialogContent>
                                    </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                
                </TableBody>
                </Table>

            </div>

            {viewRewards && (
                <RaidRewardsDialog isOpen={!!viewRewards} onClose={() => setViewRewards(null)} rewards={viewRewards}
                 onRewardsChange={(updated: any[]) => setViewRewards(updated)} id={bossId}
                />
            )}


        
        </div>
            
        </div>

    

    </div>
  )
}
