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
  

export default function EquipedItems() {
  return (
    <div className=' w-full bg-light h-[380px] border-amber-900 border-[1px] rounded-md overflow-hidden'>
        <div className=' w-full bg-dark px-4 py-2'>
            <p className=' text-sm font-semibold text-zinc-500'>Equiped Items</p>

        </div>

        <div className=' w-full p-4'>
            <Table className=' bg-dark h-full text-xs'>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow className=' border-collapse '>
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Id</TableHead>
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Item Equiped</TableHead>
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Date Equiped</TableHead>
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Rank</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="">$250.00</TableCell>
                </TableRow> */}
            </TableBody>
            </Table>
        </div>

        


    </div>
  )
}
