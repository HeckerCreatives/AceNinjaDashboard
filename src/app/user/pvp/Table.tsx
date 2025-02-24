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
import { Pvp } from '@/types/User'
import axios from 'axios'
import Loader from '@/components/common/Loader'
  

export default function TableInventory() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [pvp, setPvp] = useState<Pvp[]>([])
  const [loading, setLoading] = useState(true)
  
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
    <Table>
    {pvp.length === 0 &&  
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
        <TableHead>Status</TableHead>
        <TableHead className="">MMR</TableHead>
        <TableHead className="">Date Started</TableHead>
        <TableHead className="">Date Ended</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">00011</TableCell>
        <TableCell>Oponent</TableCell>
        <TableCell>Rank</TableCell>
        <TableCell>MMR</TableCell>
        <TableCell className="">00/00/00</TableCell>
        <TableCell className="">00/00/00</TableCell>
        </TableRow>
    </TableBody>
    </Table>

    <PaginitionComponent currentPage={0} total={0} onPageChange={handlePageChange}/>

    </div>
  )
}
