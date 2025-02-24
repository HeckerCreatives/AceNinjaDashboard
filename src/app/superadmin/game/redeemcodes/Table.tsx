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
import { Pen, Plus, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCode, CreateCode } from '@/schema/schema'
import CreateCodesFrom from '@/components/forms/CreateCodesFrom'
import PaginitionComponent from '@/components/common/Pagination'
import axios from 'axios'
import Loader from '@/components/common/Loader'

export default function Redeemcodetable() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CreateCode>({
    resolver: zodResolver(createCode),
  });

  const createRedeemcode = async ( data: CreateCode) => {
    console.log(data)
   
  }

  console.log(errors)

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
      <div className=' w-full flex items-center justify-between text-sm'>
       
        <CreateCodesFrom/>

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
        <TableHead className="">Code Id</TableHead>
        <TableHead>Code</TableHead>
        <TableHead>Reward</TableHead>
        <TableHead>Expiration</TableHead>
      
        <TableHead className="">Action</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">00011</TableCell>
        <TableCell>YAT3348</TableCell>
        <TableCell>Crystals</TableCell>
        <TableCell>00/00/00</TableCell>
        <TableCell className=" flex items-center gap-4">
          <button className=' btn-primary'><Trash2 size={15} className=' text-red-500'/> Delete</button>

          <Dialog>
            <DialogTrigger>
            <button className=' btn-primary'><Pen size={15} className=' text-amber-300'/> Edit</button>
            
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Code</DialogTitle>
                <DialogDescription>
                
                </DialogDescription>
              </DialogHeader>

              <form action="" className=' text-sm mt-4 flex flex-col'>
                  <label htmlFor="">Code</label>
                  <input type="text" placeholder='Code' className=' input' />

                  <label htmlFor="" className=' mt-4'>Rewards</label>
                  <input type="text" placeholder='Rewards' className=' input' />

                  <label htmlFor="" className=' mt-4'>Expiration</label>
                  <input type="date"  className=' input' />
                  

                  <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
                    <button className=' bg-zinc-800 px-6 py-2 rounded-md'>Cancel</button>
                    <button className=' active-gradient px-6 py-2 rounded-md'>Save</button>

                  </div>


                </form>
            </DialogContent>
        </Dialog>

         
        </TableCell>
        </TableRow>
    </TableBody>
    </Table>

    <PaginitionComponent currentPage={0} total={0} onPageChange={handlePageChange}/>

    </div>
  )
}
