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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  
  

export default function TableInventory() {
  return (
    <div className=' bg-zinc-950 p-4 w-full'>
      <input type="date" name="" id="" className=' bg-zinc-800 rounded-md px-4 py-2 text-xs mb-6 text-white' />
    <Table>
    <TableCaption>PVP history</TableCaption>
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

    </div>
  )
}
