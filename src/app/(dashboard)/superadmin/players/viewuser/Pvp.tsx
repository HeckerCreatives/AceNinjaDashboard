import React from 'react'
import PvpCards from './PvpCards'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export default function Pvp() {
  return (
    <div className=' w-full flex flex-col gap-8 max-w-[1540px] p-8'>
        <PvpCards/>

        <input type="date" name="date" className=' w-fit bg-yellow-500 text-xs text-black p-2 rounded-r-lg' />

        <Table className=' text-xs'>
        <TableCaption></TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="">Match Id</TableHead>
            <TableHead>Opponent</TableHead>
            <TableHead>Result</TableHead>
            <TableHead className="">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {/* <TableRow>
            <TableCell className="">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$250.00</TableCell>
            </TableRow> */}
        </TableBody>
        </Table>

    </div>
  )
}
