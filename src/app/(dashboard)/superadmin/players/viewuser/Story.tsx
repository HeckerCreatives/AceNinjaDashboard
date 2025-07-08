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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetStoryHistoryAdmin } from '@/client_actions/superadmin/story'
  

export default function StoryHistory() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [filter, setFilter] = useState('')
  const { characterid } = useCharacterStore()
  const {data, isLoading} = useGetStoryHistoryAdmin(characterid, filter === 'all' ? '' : filter , currentPage, 10)
  
  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


      useEffect(() => {
      setTotalPage(data?.totalPages || 0)
    },[data])



  return (
    <div className=' p-6 w-full '>
        <div className=' w-full py-2'>
            <p className=' text-sm font-semibold'>Story History</p>
        </div>

        <div className=' bg-zinc-950 p-4 w-full h-fit border-[1px] border-amber-900 rounded-md'>
          <div className=' flex items-center gap-2 mb-4'>
            <p>Filter: </p>
            <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="win">Win</SelectItem>
              <SelectItem value="lose">Lose</SelectItem>
            </SelectContent>
          </Select>
          </div>
            <Table>
            {data?.data.length === 0 && (
              <TableCaption className=' text-xs'>No Data</TableCaption>
              )}
               {isLoading && (
               <TableCaption className=' text-xs'><div className=' loader'></div></TableCaption>
  
               )}
            <TableHeader>
                <TableRow>
                <TableHead className="">Chapter</TableHead>
                <TableHead>Challenge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="">Date</TableHead>
            
                </TableRow>
            </TableHeader>
            <TableBody className=' text-xs'>
            {data?.data.map((item, index) => (
                <TableRow key={index}>
                <TableCell className="">{item.chapter}</TableCell>
                <TableCell className="">{item.challenge}</TableCell>
                <TableCell className={`${item.status == 'win' ? 'text-green-400' : 'text-red-600'}`}>{item.status}</TableCell>
                <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>

                </TableRow>
            ))}
                
            </TableBody>
            </Table>

            {data?.data.length !== 0 && (
                <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>
            )}
        </div>       
    </div>
   
  )
}
