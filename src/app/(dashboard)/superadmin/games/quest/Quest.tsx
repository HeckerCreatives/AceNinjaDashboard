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
import QuestItems from './QuestItems'
import CreateQuestForm from '@/components/forms/CreateQuest'

const tabs = [
    'Daily',
    'Pass',
  ]

export default function Quest() {
    const [tab, setTab] = useState('Daily')
    
  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Quest</p>
            </div>

            <div className=' flex flex-col gap-4 ~p-2/8'>

              
                <div className=' flex items-center gap-[1px] mt-4 mb-1'>
                    {tabs.map((item, index) => (
                    <p onClick={() => setTab(item)} key={index} className={` cursor-pointer transition-all duration-300  text-center w-[110px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</p>

                    ))}
                </div>

                <CreateQuestForm/>

               <div className=' flex items-center bg-zinc-800 p-2'>
                <div className='  flex flex-col w-full'>
                   <QuestItems/>
                </div>

               </div>

               <div className=' flex items-center bg-zinc-800 p-2'>
                <div className='  flex flex-col w-full'>
                   <QuestItems/>
                </div>

               </div>

             
            </div>

           
        </div>
            
        </div>

    

    </div>
  )
}
