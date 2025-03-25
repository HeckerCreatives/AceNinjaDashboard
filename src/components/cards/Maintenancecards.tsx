'use client'
import { ArrowUpRight, Swords } from 'lucide-react'
import React, { ReactElement, useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { useGetMaintenance, useUpdateMaintenance } from '@/client_actions/superadmin/maintenance'
import toast from 'react-hot-toast'


type Props = {
    name: string
    img: string
    value: boolean
    type: string
}

export default function MaintenanceCard(prop:Props){
    const [check, setCheck] = useState(false)
    const {data} = useGetMaintenance()
    const { mutate: updateMaintenance, isPending} = useUpdateMaintenance()

    useEffect(() => {
      setCheck(data?.data.find((item) => item.type === prop.type)?.value === '0' ? false : true)
    },[prop])

    const handleToggle = (newValue: boolean) => {
      setCheck(newValue);
  
      updateMaintenance(
        { type: prop.type, value: newValue ? "1" : "0" },
        {
          onSuccess: () => {
            toast.success(`${prop.name} maintenance is now ${newValue ? "on" : "off"}.`);
          },
        }
      );
    };




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

      <img src={prop.img} alt="bg" className=' w-full' />

      <div className=' absolute z-10 w-full h-full flex '>
        <div className=' w-full h-full flex flex-col justify-center gap-4 p-6'>
              <p className=' text-sm font-semibold '>{prop.name}</p>
              <Switch disabled={isPending} checked={check} onCheckedChange={handleToggle}/>

          </div>

          <div className=' w-full flex items-center justify-center'>
          
          </div>
      </div>
        

    </div>
  )
}
