'use client'
import React, { useState } from 'react'
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
  

export default function TopupHistory() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div className=' bg-zinc-950 p-4 w-full h-[400px] border-[1px] border-amber-900 rounded-md'>
    <Table>
    <TableCaption>Top up history</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="">Transaction Id</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="">Date</TableHead>
      
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">00011</TableCell>
        <TableCell>9999</TableCell>
        <TableCell>method</TableCell>
        <TableCell className="">00/00/00</TableCell>
        </TableRow>
    </TableBody>
    </Table>

    <PaginitionComponent currentPage={0} total={0} onPageChange={handlePageChange}/>

    </div>
  )
}
