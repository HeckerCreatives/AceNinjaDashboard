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
import PvpCards from './PvpCards'
import { useGetPvpHistory } from '@/client_actions/user/pvp'
import PaginitionComponent from '@/components/common/Pagination'
import useCharacterStore from '@/hooks/character'
  

export default function Pvp() {
  const {characterid} = useCharacterStore()
  const [currentPage, setCurrentpage] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [date, setDate] = useState('')
  const {data, isLoading} = useGetPvpHistory(currentPage, 10, characterid, date)

   //paginition
   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  
  useEffect(() => {
    setTotalpage(data?.totalPages || 0)
  },[data])

  return (
    <div className=' w-full flex flex-col gap-8 p-8'>
        <PvpCards/>

        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" name="date" className=' w-fit bg-yellow-500 text-xs text-black p-2 rounded-r-lg' />

        <Table className=' text-xs'>
         {data?.data.length === 0 && (
           <TableCaption className=' text-xs'>No Data</TableCaption>
           )}
           {isLoading && (
           <TableCaption className=' text-xs'><div className=' loader'></div></TableCaption>

           )}
        <TableHeader>
            <TableRow>
            <TableHead>Opponent</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="">Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item, index) => (
            <TableRow key={item._id}>
            <TableCell className="">{item.opponent}</TableCell>
            <TableCell>{item.status === 1 ? 'Win' : 'Lose'}</TableCell>
            <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        
          {Object.values(data?.data || {}).length !== 0 && (
            <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
  
            )}

    </div>
  )
}
