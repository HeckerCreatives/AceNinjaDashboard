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
import { useGetAllTopupHistory, useGetTopupHistory } from '@/client_actions/superadmin/topup'
import { Input } from '@/components/ui/input'
  

export default function TopupHistory() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const { characterid } = useCharacterStore()
  const [search, setSearch] = useState('')
  const {data, isLoading} = useGetAllTopupHistory(currentPage, 10, search)



  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


    useEffect(() => {
    setTotalPage(data?.pagination.totalPages || 0)
    console.log('pagination',data?.pagination)

  },[data])


  return (
    <div className=' bg-zinc-950 p-4 w-[95%] h-fit border-[1px] border-amber-900 rounded-md mt-12'>

      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search character name' className=' w-fit bg-zinc-700 mb-4'/>


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
        <TableHead>Name</TableHead>
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
        <TableCell className="">{item.characterusername}</TableCell>
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
