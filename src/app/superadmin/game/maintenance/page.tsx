
import Superadminlayout from "@/components/layout/Superadminlayout";
import Cards from "./Cards";

export default function Home() {
  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1920px]'>
      <p>Maintenance</p>
      <Cards/>
      <div className=' w-full '>
       
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
