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
import { Eye, LoaderCircle, OctagonAlert, Plus } from 'lucide-react'
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


  

export default function Playertable() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className=' flex flex-col gap-6 bg-zinc-950 p-4 w-full h-[600px]'>
      <div className=' w-full flex flex-col gap-2 md:flex-row items-center justify-between text-sm'>
        <input type="text" placeholder='Search player' className=' p-2 bg-zinc-800 rounded-md' />

      {/* <Dialog>
        <DialogTrigger>
          <button className=' active-gradient px-4 py-2 text-sm flex items-center gap-1'><Plus size={15}/>Create user</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}

      </div>
    <Table>
    <TableCaption>A list of your items</TableCaption>
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
          <a href='/superadmin/players/viewuser/dashboard' className=' btn-primary'><Eye size={15}/> View user</a>
          <Dialog>
          <DialogTrigger>
          <button className=' btn-primary'><OctagonAlert size={15} className=' text-red-500'/> Ban / Unban</button>
          </DialogTrigger>
          <DialogContent className=''>
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
