'use client'
import { ArrowUpRight, Swords } from 'lucide-react'
import React, { ReactElement, useState } from 'react'
import { Switch } from "@/components/ui/switch"


type Props = {
    name: string
    img: string
    value: boolean
}

export default function MaintenanceCard(prop:Props){
    const [check, setCheck] = useState(prop.value)

    console.log(prop)


  return (
    <div
      className=" relative w-auto h-auto gap-8 rounded-md bg-zinc-950 shadow flex items-center justify-center"
      // style={{
      //   backgroundImage: prop.img ? `url('${prop.img}')` : "none", 
      //   backgroundSize: "contain",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
       
      // }}
    >

      <img src={prop.img} alt="bg" className='' />

      <div className=' absolute z-10 w-full h-full flex '>
        <div className=' w-full flex flex-col gap-4 p-6'>
              <p className=' text-sm font-semibold '>{prop.name}</p>
              <Switch checked={check} onCheckedChange={setCheck}/>

          </div>

          <div className=' w-full flex items-center justify-center'>
          
          </div>
      </div>
        

    </div>
  )
}
