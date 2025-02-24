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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import PaginitionComponent from '@/components/common/Pagination'
import axios from 'axios'
import Loader from '@/components/common/Loader'
  
  
  

export default function TableInventory() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState('')

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
    <div className=' bg-zinc-950 p-4 w-full'>
      <input type="date" name="" id="" className=' bg-zinc-800 rounded-md px-4 py-2 text-xs mb-6 text-white' />
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
          <TableHead className="">Match Id</TableHead>
          <TableHead>Opponent</TableHead>
          <TableHead>Result</TableHead>
          <TableHead className="">MMR Point</TableHead>
          <TableHead className="">Date</TableHead>

          </TableRow>
      </TableHeader>
      <TableBody>
          <TableRow>
          <TableCell className="">00011</TableCell>
          <TableCell>Oponent</TableCell>
          <TableCell>Win</TableCell>
          <TableCell>145</TableCell>
          <TableCell className="">00/00/00</TableCell>
          </TableRow>
      </TableBody>
      </Table>

    <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

    </div>
  )
}
