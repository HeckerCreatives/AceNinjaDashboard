'use client'
import Card from "@/components/cards/Card";
import Superadminlayout from "@/components/layout/Superadminlayout";

import Playertable from "./Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserRoundCheck, UsersRound } from "lucide-react";
import { PlayerCount } from "@/types/Superadmin";
import { useGetCounts } from "@/client_actions/superadmin/dashboard";


export default function Home() {
  const {data, isLoading} = useGetCounts()

  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1625px]'>

    <div className=' w-full px-8 relative'>

      <div className=" z-0 w-full h-[90%] bg-[#330F0D] absolute bottom-0 left-0 border-t-2 border-amber-900/50 rounded-md translate-y-4">

      </div>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        <Card name={"Total Users"} value={data?.data.totalUsers || 0} isAmount={false} icon={<UsersRound size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
        <Card name={"Total Active Users"} value={data?.data.totalActiveUsers || 0} isAmount={false} icon={<UserRoundCheck size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
        <Card name={"Total Inactive Users"} value={data?.data.totalInactiveUsers || 0} isAmount={false} icon={<UsersRound size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
      </div>
        
       
      </div>

      <div className=' w-full bg-[#330F0D]  border-t-2 border-amber-900/50 px-8 py-2 rounded-md '>
       <Playertable/>
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
