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
      <Select>
      <SelectTrigger className="w-[180px] bg-zinc-800 mb-6">
        <SelectValue placeholder="Season Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Season 1</SelectItem>
        <SelectItem value="2">Season 2</SelectItem>
        <SelectItem value="3">Season 3</SelectItem>
        
      </SelectContent>
    </Select>

    <Table>
    <TableCaption>Purchase history</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="">Level</TableHead>
        <TableHead>Rewards</TableHead>
        <TableHead>Date</TableHead>
        
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">100</TableCell>
        <TableCell>Gems</TableCell>
        <TableCell className="">00/00/00</TableCell>
        </TableRow>
    </TableBody>
    </Table>

    </div>
  )
}
