'use client'
import { ArrowUpRight, Swords } from 'lucide-react'
import React, { ReactElement, useState } from 'react'
import { Switch } from "@/components/ui/switch"


type Props = {
    name: string
    icon: ReactElement
    value: boolean
}

export default function MaintenanceCard(prop:Props){
    const [check, setCheck] = useState(prop.value)


  return (
    <div className=' w-full md:max-w-[320px] lg:max-w-[420px] grid grid-cols-[1fr_150px] gap-8 rounded-md bg-zinc-950 shadow'>
        <div className=' w-full flex flex-col gap-4 p-6'>
            <p className=' text-lg '>{prop.name}</p>
            <Switch checked={check} onCheckedChange={setCheck}/>

        </div>

        <div className=' w-full flex bg-zinc-900 items-center justify-center'>
         {prop.icon}
        </div>

    </div>
  )
}
