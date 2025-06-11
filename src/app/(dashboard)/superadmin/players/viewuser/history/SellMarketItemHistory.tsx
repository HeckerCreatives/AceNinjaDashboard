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
import PaginitionComponent from '@/components/common/Pagination'
import useCharacterStore from '@/hooks/character'
import { useGetTopupHistory } from '@/client_actions/superadmin/topup'
import { useGetUserHistory } from '@/client_actions/superadmin/history'
  

export default function SellMarketHistory() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const { characterid } = useCharacterStore()
  const {data, isLoading} = useGetUserHistory(characterid, currentPage, 10, 'sell', 'market')



  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


     useEffect(() => {
     setTotalPage(data?.pagination.totalPages || 0)
   },[data])

console.log(data)


  return (
    <div className=' bg-zinc-950 p-4 w-full h-fit border-[1px] border-amber-900 rounded-md'>
    <Table>
       {!data?.data && (
                 <TableCaption className=' text-xs'>No Data</TableCaption>
                 )}
                 {isLoading && (
                 <TableCaption className=' text-xs'><div className=' loader'></div></TableCaption>
      
                 )}
    <TableHeader>
        <TableRow>
        <TableHead className="">Date</TableHead>
        {/* <TableHead>Amount</TableHead> */}
        <TableHead>Description</TableHead>
        <TableHead>Amount</TableHead>
        {/* <TableHead className="">Item</TableHead> */}
        <TableHead className="">Type</TableHead>
      
        </TableRow>
    </TableHeader>
    <TableBody className=' text-xs'>
      {data?.data.map((item, index) => (
        <TableRow key={item.id}>
        <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
        <TableCell className="">{item.description}</TableCell>
        <TableCell className="">{item.amount.toLocaleString()}</TableCell>

        <TableCell className=" text-green-400">{item.type}</TableCell>
        </TableRow>
      ))}
        
    </TableBody>
    </Table>

      {data?.data && (
        <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

        )}


    </div>
  )
}
