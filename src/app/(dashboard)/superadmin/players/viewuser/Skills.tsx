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
    'Basic Skills',
    'Secret Skills',
    'Special Skills',
    'PVP',
    'Clan',
    'Deal Skins',
   
]
export default function Skills() {
    const [tab, setTab] = useState('Basic Skills')
  return (
    <div className=' w-full flex flex-col max-w-[1540px] p-8 '>
        <div className=' flex items-center gap-[1px]'>
            {tabs.map((item, index) => (
            <button onClick={() => setTab(item)} key={index} className={` transition-all duration-300 w-[110px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</button>

            ))}
        </div>

        <Table className=' text-xs mt-4'>
        <TableCaption></TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="">Skill Name</TableHead>
            <TableHead>Skill Level</TableHead>
            <TableHead>Skill Status</TableHead>
            <TableHead className="">Unlock Date</TableHead>
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
