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
import { Eye, LoaderCircle, OctagonAlert, Plus, Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PaginitionComponent from '@/components/common/Pagination'
import SelectStatus from '@/components/common/SelectStatus'
import { Button } from '@/components/ui/button'
import Viewuser from './Viewuser'


  

export default function Playertable() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className=' flex flex-col gap-6 bg-zinc-950 w-full h-[600px] border-amber-500 border-[1px] rounded-md overflow-hidden'>
      <div className=' w-full flex flex-col gap-2 md:flex-row items-center justify-between text-sm bg-light p-3'>

        <div className=' relative flex items-center'>
          <input type="text" placeholder='Search player' className=' h-[30px] p-2 bg-zinc-800 rounded-md' />
          <Search size={15} className=' absolute right-4'/>
        </div>
      </div>
    <Table>
    <TableCaption>User list.</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="">User Id</TableHead>
        <TableHead>Username</TableHead>
        <TableHead>Coins</TableHead>
        <TableHead>Crystal</TableHead>
        <TableHead className="">Status</TableHead>
        <TableHead className="">Action</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">00011</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Rank</TableCell>
        <TableCell className="">Status</TableCell>
        <TableCell className=" text-green-200">Active</TableCell>
        <TableCell className=" flex items-center gap-2">

          <Viewuser/>
          <Dialog>
          <DialogTrigger>
          <button className=' bg-zinc-500 flex items-center gap-1 px-3 py-1 text-xs rounded-md'><OctagonAlert size={15} className=' text-red-500'/> Ban / Unban</button>
          </DialogTrigger>
          <DialogContent className=' w-full h-auto p-6 max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure, you want to ban this user?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <SelectStatus/>

            <Button className=' w-fit'>
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Continue
          </Button>

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
