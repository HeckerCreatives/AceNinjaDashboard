import Card from "@/components/cards/Card";
import Barchart from "@/components/charts/Barchart";
import Linechart from "@/components/charts/Linechart";
import Piechart from "@/components/charts/Piechart";
import Superadminlayout from "@/components/layout/Superadminlayout";
import Image from "next/image";
import Battlepasstable from "./Table";



export default function Home() {
  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1920px]'>
      <p>Battle Pass</p>
    

      <div className=' w-full '>
        <Battlepasstable/>
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
