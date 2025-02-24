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

    <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <Card name={"Total Users"} value={999999} isAmount={false} icon={<UsersRound size={20} />} isLoading={true}/>
        <Card name={"Total Active Users"} value={999999} isAmount={false} icon={<UserRoundCheck size={20} />} isLoading={true}/>
        <Card name={"Total Inactive Users"} value={999999} isAmount={false} icon={<UsersRound size={20} />} isLoading={true}/>
       
      </div>

      <div className=' w-full '>
       <Playertable/>
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
