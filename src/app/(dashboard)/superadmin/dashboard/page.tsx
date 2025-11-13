'use client'
import { useGetCounts, useGetGraph, useGetSales } from "@/client_actions/superadmin/dashboard";
import { useGetCurrentSeason } from "@/client_actions/superadmin/season";
import Card from "@/components/cards/Card";
import Barchart from "@/components/charts/Barchart";
import Linechart from "@/components/charts/Linechart";
import Superadminlayout from "@/components/layout/Superadminlayout";
import axios from "axios";
import { ArrowUpRight, DollarSign, LaptopMinimal, TabletSmartphone, UserRoundCheck, UserRoundX, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState(true)
  const {data, isLoading} = useGetCounts()
  const {data: currentSeason} = useGetCurrentSeason()
  const {data: sales, isLoading: salesLoading} = useGetSales()



  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1625px]'>

      <div className=" relative w-full flex flex-col items-center justify-center gap-8 ~px-2/8">

        <div className=" w-full h-[80%] bg-[#330F0D] absolute border-t-2 border-amber-900/50 rounded-md">

        </div>
        <div className=' relative z-10 w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8'>
          <Card name={"Current Season"} value={currentSeason?.data.title || 'No Data'} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true} timeleft={currentSeason?.data.timeleft} />
          <Card name={"Total Users"} value={data?.data.totalUsers || 0} isAmount={false} icon={<UsersRound size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
          <Card name={"Total Active Users"} value={data?.data.totalActiveUsers || 0} isAmount={false} icon={<UserRoundCheck size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
          <Card name={"Total Inactive Users"} value={data?.data.totalInactiveUsers || 0} isAmount={false} icon={<UserRoundX size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
          
        </div>

        <div className=' relative z-10 w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 bg-[#531414] rounded-md border-[1px] border-amber-900 ~px-2/8 py-2'>
          <Card name={"Total Sales"} value={(sales?.data.websales || 0)} isAmount={true} icon={<DollarSign size={20} />} isLoading={true} bg={"bg-[#220909]"} border={false}/>
          <Card name={"Website Sales"} value={sales?.data.websales || 0} isAmount={true} icon={<LaptopMinimal size={20} />} isLoading={true} bg={"bg-[#220909]"} border={false}/>
          <Card name={"Playstore / Ios Sales"} value={999999} isAmount={true} icon={<TabletSmartphone size={20} />} isLoading={false} bg={"bg-[#220909]"} border={false}/>
          <Card name={"Steam Sales"} value={999999} isAmount={true} icon={<ArrowUpRight size={20} />} isLoading={false} bg={"bg-[#220909]"} border={false}/>
        </div>
      </div>
      

      <div className=' w-full grid grid-cols-1 gap-8 bg-[#330F0D] border-t-2 border-amber-900/50 rounded-md ~p-2/8'>
        <Linechart/>
        {/* <Barchart/> */}
        
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
