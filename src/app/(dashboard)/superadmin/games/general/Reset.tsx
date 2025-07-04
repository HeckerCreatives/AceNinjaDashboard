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
import QuestReset from './ResetQuest'
import RewardReset from './ResetRewards'
import { useResetHistory } from '@/client_actions/superadmin/reset'
  

export default function Resetables() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const {mutate: deleteSeasons, isPending} = useDeleteSeasons()
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('rewards')
    const {data, isLoading} = useResetHistory(currentPage,10)

      const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

     useEffect(() => {
        if(data){
            setTotalPage(data.pagination.totalPages)
            
        }
    },[data])




  return (
    <div className=" w-full">
        <div className=' w-full py-6'>
            <div className=' flex items-center gap-4 mb-4'>
                <button onClick={() => setTab('rewards')} className={`text-sm ${tab === 'rewards' && 'border-b-2 border-yellow-500'} cursor-pointer`}>Rewards</button>
                <button onClick={() => setTab('quest')} className={`text-sm ${tab === 'quest' && 'border-b-2 border-yellow-500'} cursor-pointer`}>Quest</button>
            </div>

            {tab === 'quest' ? (
                <QuestReset/>
            ): (
                <RewardReset/>
            )}

        
        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>History</p>
            </div>

            <div className=' flex flex-col gap-4 ~p-2/8'>

                
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
                    <TableHead className="">Type</TableHead>
                    <TableHead className="">Reset by</TableHead>
                    <TableHead>Reset at</TableHead>
                 
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={item.id}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.owner}</TableCell>
                        <TableCell className="">{new Date(item.manualresetdate).toLocaleString()}</TableCell>

                      

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

    </div>
  )
}
