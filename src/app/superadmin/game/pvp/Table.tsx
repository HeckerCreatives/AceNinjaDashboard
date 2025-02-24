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
import { Eye, OctagonAlert, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

      <div className=' w-full flex md:flex-row flex-col items-center justify-between'>
          <Select>
          <SelectTrigger className="w-[180px] bg-zinc-800 mb-6">
            <SelectValue placeholder="Season Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Season 1</SelectItem>
            <SelectItem value="2">Season 2</SelectItem>
            <SelectItem value="3">Season 3</SelectItem>
            
          </SelectContent>
        </Select>

        <input type="text" placeholder='Search' className=' p-2 bg-zinc-800 rounded-md text-xs' />
      </div>

     
    
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
        <TableHead className="">Rank</TableHead>
        <TableHead>Player</TableHead>
        <TableHead>Wins</TableHead>
        <TableHead>Loses</TableHead>
        <TableHead>Total Match</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">100</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>9999</TableCell>
        <TableCell>9999</TableCell>
        <TableCell>9999</TableCell>
        
        </TableRow>
    </TableBody>
    </Table>

    <PaginitionComponent currentPage={0} total={0} onPageChange={handlePageChange}/>

    </div>
  )
}
