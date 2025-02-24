'use client'
import Card from "@/components/cards/Card";
import Barchart from "@/components/charts/Barchart";
import Linechart from "@/components/charts/Linechart";
import Superadminlayout from "@/components/layout/Superadminlayout";
import axios from "axios";
import { ArrowUpRight, DollarSign, LaptopMinimal, TabletSmartphone, UserRoundCheck, UserRoundX, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState(true)

  //get list
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

    <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <Card name={"Current Season"} value={1} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} />
        <Card name={"Total Users"} value={999999} isAmount={false} icon={<UsersRound size={20} />} isLoading={true}/>
        <Card name={"Total Active Users"} value={999999} isAmount={false} icon={<UserRoundCheck size={20} />} isLoading={true}/>
        <Card name={"Total Inactive Users"} value={999999} isAmount={false} icon={<UserRoundX size={20} />} isLoading={true}/>
        <Card name={"Total Sales"} value={999999} isAmount={true} icon={<DollarSign size={20} />} isLoading={false}/>
        <Card name={"Website Sales"} value={999999} isAmount={true} icon={<LaptopMinimal size={20} />} isLoading={false}/>
        <Card name={"Playstore / Ios Sales"} value={999999} isAmount={true} icon={<TabletSmartphone size={20} />} isLoading={false}/>
        <Card name={"Steam Sales"} value={999999} isAmount={true} icon={<ArrowUpRight size={20} />} isLoading={false}/>
      </div>

      <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Linechart/>
        <Barchart/>
        
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
