'use client'
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
import { ChevronDown, Plus, Search } from 'lucide-react'
import CreateNewsForm from '@/components/forms/CreateNewsForm'
import CreateQuestForm from '@/components/forms/CreateQuest'
import RedeemCards from './RedeemCards'
import CreateCodesFrom from '@/components/forms/CreateCodesFrom'


export default function RedeemCodes() {
    const [tab, setTab] = useState('Daily')
    
  return (
    <div className=' w-full p-8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Redeem Codes</p>
            </div>

            <div className=' flex flex-col gap-8 p-8'>

                <RedeemCards/>

                <CreateCodesFrom/>

                <Table className=' text-xs'>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Code Id</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="">Reward</TableHead>
                    <TableHead className="">Expiration</TableHead>
                    <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    </TableRow> */}
                </TableBody>
                </Table>


            
            </div>

           
        </div>
            
        </div>

    

    </div>
  )
}
