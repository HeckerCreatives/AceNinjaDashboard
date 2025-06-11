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
import { useGetRedeemCodes, useGetRedeemCodesHistory } from '@/client_actions/superadmin/redeemcodes'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import DeleteRedemCode from '@/components/forms/DeleteRedeemCode'
import UpdateRedeemCode from '@/components/forms/UpdateRedeemCode'


export default function RedeemCodesHistory() {
     const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const {data, isLoading} = useGetRedeemCodesHistory(currentPage, 10)

     const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }
    
       useEffect(() => {
          setTotalpage(data?.totalpages || 0)
        },[data])
    

    
  return (
    <div className=' w-full'>

        <div className=' bg-dark border-t-2 border-amber-900/50 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Redeem Code History</p>
            </div>

            <div className=' flex flex-col gap-8 ~p-2/8'>

          

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
                    <TableHead className="">Username</TableHead>
                    <TableHead className="">Redeemed at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow>
                        <TableCell className="font-medium">{item.code}</TableCell>
                        <TableCell>
                             <p>Coins: {item?.rewards?.coins}</p>
                            <p>Exp: {item?.rewards?.exp}</p>
                            <p>Crystal: {item?.rewards?.crystal}</p>
                            
                        </TableCell>
                        <TableCell className="font-medium">{item?.itemrewards?.[0]?.name || "No item!"}</TableCell>
                    
                      

                        <TableCell className="font-medium">{item.username}</TableCell>
                        <TableCell className="font-medium">{new Date(item.redeemedAt).toLocaleString()}</TableCell>

                       
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

    

    </div>
  )
}
