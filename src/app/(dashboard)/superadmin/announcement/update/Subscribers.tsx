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
import { Plus } from 'lucide-react'
import CreateNewsForm from '@/components/forms/CreateNewsForm'
  

export default function Subscribers() {
  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Announcement (Updates)</p>
            </div>

            <div className=' flex flex-col gap-4 p-4'>

                <CreateNewsForm/>
                <Table className=' text-xs h-[500px]'>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">News Id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    </TableRow> */}
                </TableBody>
                </Table>
            </div>

           
        </div>
            
        </div>

    

    </div>
  )
}
