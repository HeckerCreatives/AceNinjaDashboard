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
import axios from 'axios'
  

export default function TableInventory() {
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
    <div className=' bg-zinc-950 p-4 w-full'>
    <Table>
    <TableCaption>Purchase history</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="">Item Id</TableHead>
        <TableHead>Item Name</TableHead>
        <TableHead>Bought at</TableHead>
        <TableHead className="">Currency</TableHead>
        <TableHead className="">Price</TableHead>
        <TableHead className="">Date</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">00011</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>test</TableCell>
        <TableCell>Crystal</TableCell>
        <TableCell className="">99999</TableCell>
        <TableCell className="">00/00/00</TableCell>
        </TableRow>
    </TableBody>
    </Table>

    </div>
  )
}
