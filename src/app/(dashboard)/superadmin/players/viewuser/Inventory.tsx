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
  

const tabs = [
    'Weapon',
    'Outfit',
    'Hair',
    'Face',
    'Eyes',
    'Skin Color',
    'Skins',
]
export default function Inventory() {
    const [tab, setTab] = useState('Weapon')
  return (
    <div className=' w-full flex flex-col max-w-[1540px] p-8 '>
        <div className=' flex items-center whitespace-nowrap overflow-x-auto gap-[1px]'>
            {tabs.map((item, index) => (
            <button onClick={() => setTab(item)} key={index} className={` transition-all duration-300 min-w-[90px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</button>

            ))}
        </div>

        <Table className=' text-xs mt-4'>
        <TableCaption></TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="">Item Id</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Item Rank</TableHead>
            <TableHead className="">Status</TableHead>
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
  )
}
