import React from 'react'
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

  

export default function Battlepasstable() {
  return (
    <div className=' flex flex-col gap-6 bg-zinc-950 p-4 w-full h-[600px]'>
    
    <Table>
    <TableCaption>A list of your items</TableCaption>
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

    </div>
  )
}
