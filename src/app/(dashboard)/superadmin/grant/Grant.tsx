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
import { ChevronDown, Plus, Search } from 'lucide-react'
import CreateNewsForm from '@/components/forms/CreateNewsForm'
import GrantItems from '@/components/forms/GrantItems'
  

export default function Grant() {
  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Grant</p>
            </div>

            <div className=' flex flex-col gap-4 ~p-2/8'>

                <div className=' w-full flex flex-wrap gap-4 items-center justify-between'>
                    <button className=' py-2 px-4 bg-yellow-500 text-black text-xs w-fit rounded-r-md flex items-center gap-2'>Select Item <ChevronDown size={15}/></button>

                    <div className=' relative flex items-center'>
                        <input type="text" placeholder='Search player' className=' text-xs h-[30px] p-2 bg-zinc-800 rounded-md' />
                        <Search size={15} className=' absolute right-4'/>
                    </div>

                </div>

                <GrantItems/>

                
                <Table className=' text-xs h-[500px]'>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="">Item Id</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
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
