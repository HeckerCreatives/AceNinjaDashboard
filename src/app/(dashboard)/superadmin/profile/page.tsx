import Superadminlayout from "@/components/layout/Superadminlayout";
import Changepassword from "./Changepassword";


export default function Home() {
  return (
    <Superadminlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-8 justify-between h-auto max-w-[1920px]'>
      <p>Profile</p>

      <div className=' w-full '>
        <Changepassword/>
       
      </div>
      
    </div>
 
  </Superadminlayout>
  );
}
