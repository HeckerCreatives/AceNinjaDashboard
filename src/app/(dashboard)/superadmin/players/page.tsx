'use client'
import Card from "@/components/cards/Card";
import Superadminlayout from "@/components/layout/Superadminlayout";

import Playertable from "./Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserRoundCheck, UsersRound } from "lucide-react";
import { PlayerCount } from "@/types/Superadmin";


export default function Home() {
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState<PlayerCount>()

  //get count
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`,{
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })

      setLoading(false)
      } catch (error) {
      setLoading(false)

        
      }
    }
    getData()
  },[])

  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1920px]'>

    <div className=' w-full px-8 relative'>

      <div className=" z-0 w-full h-[90%] bg-[#330F0D] absolute bottom-0 left-0 border-t-2 border-amber-900/50 rounded-md translate-y-4">

      </div>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <Card name={"Total Users"} value={999999} isAmount={false} icon={<UsersRound size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
        <Card name={"Total Active Users"} value={999999} isAmount={false} icon={<UserRoundCheck size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
        <Card name={"Total Inactive Users"} value={999999} isAmount={false} icon={<UsersRound size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
      </div>
        
       
      </div>

      <div className=' w-full bg-[#330F0D]  border-t-2 border-amber-900/50 px-8 py-2 rounded-md '>
       <Playertable/>
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
