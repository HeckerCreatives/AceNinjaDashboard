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
import RedeemCards from './RedeemCards'
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


export default function RedeemCodes() {
     const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const [status, setStatus] = useState('')
    const {data, isLoading} = useGetRedeemCodes(status,currentPage, 10)

     const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }
    
       useEffect(() => {
          setTotalpage(data?.totalpages || 0)
        },[data])
    

    
  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Redeem Codes</p>
            </div>

            <div className=' flex flex-col gap-8 ~p-2/8'>

                <RedeemCards/>

                <div className=' flex items-center gap-4'>
                    <CreateCodesFrom/>
                    <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        {/* <SelectItem value="unredeemed">Unredeemed</SelectItem> */}
                    </SelectContent>
                    </Select>
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
                    <TableHead>Code</TableHead>
                    <TableHead className="">Reward</TableHead>
                    <TableHead className="">Item Reward</TableHead>
                    <TableHead className="">Expiration</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow>
                        <TableCell className="font-medium">{item.code}</TableCell>
                        <TableCell>
                            <p>Coins: {item.rewards.coins}</p>
                            <p>Exp: {item.rewards.exp}</p>
                            <p>Crystal: {item.rewards.crystal}</p>
                            
                        </TableCell>
                                                <TableCell className="font-medium">{item?.itemrewards?.[0]?.name || "No item!"}</TableCell>
                        

                        <TableCell>{new Date(item.expiration).toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{item.status}</TableCell>

                        <TableCell className="text-right flex items-center gap-2">
                            <DeleteRedemCode id={item.id}/>
                            <UpdateRedeemCode code={item.code} emerald={item.rewards.exp} coins={item.rewards.coins} crystal={item.rewards.crystal} expiration={item.expiration} id={item.id} itemreward={item.itemrewards} type={item.itemrewards[0]?.type}/>
                        </TableCell>
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

        <RedeemCodesHistory/>

    

    </div>
  )
}
