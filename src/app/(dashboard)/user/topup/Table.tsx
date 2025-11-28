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
import { useGetTopupHistory } from '@/client_actions/user/topup'
import useCharacterStore from '@/hooks/character'
  

export default function TopupHistory() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const { characterid } = useCharacterStore()
  const {data, isLoading} = useGetTopupHistory(characterid, currentPage, 10)



  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


    useEffect(() => {
    setTotalPage(data?.pagination.totalPages || 0)

  },[data])

  console.log(data?.pagination.totalPages)


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
            <TableHead>Order Id</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="">Item</TableHead>
            <TableHead className="">Status</TableHead>
          
            </TableRow>
        </TableHeader>
        <TableBody className=' text-xs'>
          {data?.data.map((item, index) => (
            <TableRow key={item.id}>
            <TableCell className="">{new Date(item.date).toLocaleString()}</TableCell>
            <TableCell className="">{item.transactionId}</TableCell>
            <TableCell className="">${item.amount.toLocaleString()}</TableCell>
            <TableCell className="">{item.items[0].name}</TableCell>
            <TableCell className=" text-green-400">{item.status}</TableCell>
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
