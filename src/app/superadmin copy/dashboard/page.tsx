import Card from "@/components/cards/Card";
import Barchart from "@/components/charts/Barchart";
import Linechart from "@/components/charts/Linechart";
import Piechart from "@/components/charts/Piechart";
import Superadminlayout from "@/components/layout/Superadminlayout";
import { ArrowUpRight, UsersRound, UserRoundCheck, UserRoundX, DollarSign, LaptopMinimal, TabletSmartphone } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1920px]'>

    <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
    <Card name={"Current Season"} value={1} isAmount={false} icon={<ArrowUpRight size={20}/>} />
        <Card name={"Total Users"} value={999999} isAmount={false} icon={<UsersRound size={20}/>}/>
        <Card name={"Total Active Users"} value={999999} isAmount={false} icon={<UserRoundCheck size={20}/>}/>
        <Card name={"Total Inactive Users"} value={999999} isAmount={false} icon={<UserRoundX size={20}/>}/>
        <Card name={"Total Sales"} value={999999} isAmount={true} icon={<DollarSign size={20}/>}/>
        <Card name={"Website Sales"} value={999999} isAmount={true} icon={<LaptopMinimal size={20}/>}/>
        <Card name={"Playstore / Ios Sales"} value={999999} isAmount={true} icon={<TabletSmartphone size={20}/>}/>
        <Card name={"Steam Sales"} value={999999} isAmount={true} icon={<ArrowUpRight size={20}/>}/>
      </div>

      <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Linechart/>
        <Barchart/>
        
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
