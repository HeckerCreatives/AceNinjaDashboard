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
import CreateQuestForm from '@/components/forms/CreateQuest'
import { Minus } from 'lucide-react'
import CreateProduct from '@/components/forms/CreateProduct'

const tabs = [
  'Weapon',
  'Outfit',
  'Hair',
  'Face',
  'Eyes',
  'Skin Color',
  'Skins',
  'Chest',
  'Freebie',
  'Gem Packs',
  'Gold Packs',
]

export default function Store() {
    const [tab, setTab] = useState('Weapon')
    
  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Quest</p>
            </div>

            <div className=' flex flex-col gap-4 ~p-2/8'>

              
                <div className=' flex items-center w-auto whitespace-nowrap gap-[1px] mt-4 mb-1 overflow-x-auto'>
                    {tabs.map((item, index) => (
                    <p onClick={() => setTab(item)} key={index} className={` whitespace-nowrap cursor-pointer transition-all duration-300  text-center min-w-[90px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</p>

                    ))}
                </div>

                <div className=' flex items-center gap-4'>
                  <CreateProduct/>
                  <button className=' bg-red-500 px-6 py-2 text-xs rounded-md flex items-center gap-1'><Minus size={15}/>Delete</button>

                </div>


                <Table className=' text-xs'>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className=' flex items-center gap-2'>
                      <input type="checkbox" name="" id="" />
                      All</TableHead>
                    <TableHead>Item Id</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Action</TableHead>
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
