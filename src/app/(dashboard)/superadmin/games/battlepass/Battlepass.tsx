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
import CreateCodesFrom from '@/components/forms/CreateCodesFrom'
import { useGetRedeemCodes } from '@/client_actions/superadmin/redeemcodes'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import DeleteRedemCode from '@/components/forms/DeleteRedeemCode'
import UpdateRedeemCode from '@/components/forms/UpdateRedeemCode'
import RedeemCodesHistory from './RedeemCodesHistory'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetBattlepass } from '@/client_actions/superadmin/battlepass'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import BpFreemission from './FreeMissions'
import { Eye } from 'lucide-react'
import BattlePassTiers from './BpTiers'
import UpdateBattlePass from '@/components/forms/UpdateBattlepass'


export default function Battlepass() {
     const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [status, setStatus] = useState('')
    const {data, isLoading} = useGetBattlepass(currentPage, 10)

     const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }
    
       useEffect(() => {
          setTotalpage(data?.totalPages || 0)
        },[data])

        console.log(data)
    

    
  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Battle Pass</p>
            </div>

            <div className=' flex flex-col gap-8 ~p-2/8'>

{/* 
                <div className=' flex items-center gap-4'>
                    <CreateCodesFrom/>
                    <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="redeemed">Reedemed</SelectItem>
                    </SelectContent>
                    </Select>
                </div> */}


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
                    <TableHead className="">Battle Pass</TableHead>
                    <TableHead className="">Start Date</TableHead>
                    <TableHead className="">End Date</TableHead>
                    <TableHead className="">Premium Cost</TableHead>
                    <TableHead className="">Free Missions</TableHead>
                    <TableHead className="">Premium Missions</TableHead>
                    <TableHead className="">Tiers</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow>
                        <TableCell className="font-medium">{item.seasonName}</TableCell>
                        <TableCell className="font-medium">{new Date(item.startDate).toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{new Date(item.endDate).toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{item.premiumCost.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">
                            <Dialog>
                            <DialogTrigger className=' flex items-center justify-center gap-1 bg-amber-700 rounded-md px-3 py-1'><Eye size={20}/>View</DialogTrigger>
                            <DialogContent className=' h-fit max-h-[90%] w-full max-w-[500px]'>
                          
                                <BpFreemission id={item.id} title='Battle Pass Free Missions' freeMission={item.freeMissions || []}/>
                            </DialogContent>
                            </Dialog>
                        </TableCell>
                        <TableCell className="font-medium">
                            <Dialog>
                            <DialogTrigger className=' flex items-center justify-center gap-1 bg-amber-700 rounded-md px-3 py-1'><Eye size={20}/>View</DialogTrigger>
                            <DialogContent className=' h-fit max-h-[90%] w-full max-w-[500px]'>
                          
                                <BpFreemission id={item.id} title=' Battle Pass Premium Missions' freeMission={item.premiumMissions || []}/>
                            </DialogContent>
                            </Dialog>
                        </TableCell>
                        <TableCell className="font-medium">
                             <Dialog>
                            <DialogTrigger className=' flex items-center justify-center gap-1 bg-amber-700 rounded-md px-3 py-1'><Eye size={20}/>View</DialogTrigger>
                            <DialogContent className=' h-fit max-h-[90%] w-full max-w-[700px]'>
                          
                                <BattlePassTiers title=' Battle Pass tiers' tiers={item.tiers || []} id={item.id}/>
                            </DialogContent>
                            </Dialog>
                        </TableCell>
                      
                        <TableCell className="font-medium">{item.status}</TableCell>
                        <TableCell className="font-medium">
                            <UpdateBattlePass seasonname={item.seasonName} start={item.startDate} end={item.endDate} status={item.status} tiercount={item.tierCount} premcost={item.tierCount} grandreward={item.grandreward.name} id={item.id} />
                        </TableCell>

                        {/* <TableCell className="text-right flex items-center gap-2">
                            <DeleteRedemCode id={item.id}/>
                            <UpdateRedeemCode code={item.code} emerald={item.rewards.exp} coins={item.rewards.coins} crystal={item.rewards.crystal} expiration={item.expiration} id={item.id}/>
                        </TableCell> */}
                        </TableRow>
                    ))}
                    
                </TableBody>
                </Table>

                 {data?.data.length !== 0 && (
                    <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
                )}


            
            </div>

           
        </div>
            
        </div>

        {/* <RedeemCodesHistory/> */}

    

    </div>
  )
}
