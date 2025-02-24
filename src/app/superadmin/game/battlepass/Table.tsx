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
import axios from 'axios'
import Loader from '@/components/common/Loader'


export default function Battlepasstable() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

   //get list
   useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`,{
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })

      setLoading(false)
      } catch (error) {
      setLoading(false)

        
      }
    }
    getData()
  },[])

  
  return (
    <div className=' flex flex-col gap-6 bg-zinc-950 p-4 w-full h-[600px]'>
    
    <Table>
    {list.length === 0 &&  
        <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
      }
            
      {loading === true && (
        <TableCaption className=' '>
          <Loader/>
        </TableCaption>
      )}
    <TableHeader>
        <TableRow>
        <TableHead className="">Level</TableHead>
        <TableHead>Reward</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Action</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">100</TableCell>
        <TableCell>Gems</TableCell>
        <TableCell>9999</TableCell>
        <TableCell className=" flex items-center gap-2">
          <button className=' btn-primary'>Save</button>
        </TableCell>
        </TableRow>
    </TableBody>
    </Table>

    <PaginitionComponent currentPage={0} total={0} onPageChange={handlePageChange}/>

    </div>
  )
}
