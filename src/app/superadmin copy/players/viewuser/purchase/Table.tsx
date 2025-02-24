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
  

export default function TableInventory() {
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
