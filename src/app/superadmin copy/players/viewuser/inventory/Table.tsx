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
    <TableCaption>A list of your items</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="">Item Id</TableHead>
        <TableHead>Item Name</TableHead>
        <TableHead>Rank Item</TableHead>
        <TableHead className="">Status</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">00011</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Rank</TableCell>
        <TableCell className="">Status</TableCell>
        </TableRow>
    </TableBody>
    </Table>

    </div>
  )
}
