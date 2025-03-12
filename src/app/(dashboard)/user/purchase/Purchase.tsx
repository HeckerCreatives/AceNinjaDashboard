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
import ViewCard from '@/components/viewuser/ViewCard'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

  

export default function Purchase() {
  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

    
      <button className=' py-2 px-4 bg-yellow-500 text-black text-xs w-fit rounded-r-md flex items-center gap-2'>All <ChevronDown size={15}/></button>


      <Table className=' text-xs'>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Item Id</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Item Price</TableHead>
          <TableHead>Item Currency</TableHead>
          <TableHead>Buy Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>

    </div>
  )
}
