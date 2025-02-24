import Card from "@/components/cards/Card";
import Superadminlayout from "@/components/layout/Superadminlayout";
import Image from "next/image";
import Playertable from "./Table";
import { UsersRound, UserRoundCheck } from "lucide-react";

export default function Home() {
  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1920px]'>

    <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
    <Card name={"Total Users"} value={999999} isAmount={false} icon={<UsersRound size={20}/>}/>
        <Card name={"Total Active Users"} value={999999} isAmount={false} icon={<UserRoundCheck size={20}/>}/>
        <Card name={"Total Inactive Users"} value={999999} isAmount={false} icon={<UsersRound size={20}/>}/>
       
      </div>

      <div className=' w-full '>
       <Playertable/>
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
