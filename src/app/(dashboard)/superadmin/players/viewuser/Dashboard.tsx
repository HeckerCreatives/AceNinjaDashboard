import ViewCard from '@/components/viewuser/ViewCard'
import ViewCardSecondary from '@/components/viewuser/ViewCardSecondary'
import { ShoppingBag } from 'lucide-react'
import React from 'react'
import Stats from './Stats'
import EquipedItems from './EquipedItems'
import Companion from './Companion'

export default function Dashboard() {
  return (
    <div className=' w-full max-w-[1540px] h-auto flex flex-col gap-6 items-center p-4'>
        <div className=' w-full h-auto flex lg:flex-row flex-col gap-4 items-center justify-between bg-light py-4 px-6 border-[1px] border-amber-900 rounded-md'>
            <div className=' flex flex-col items-center gap-2 px-20'>
                <p className=' text-xl font-bold'>Username</p>
                <p className=' w-[130px] text-center py-1 bg-dark text-[.7rem]'>Current: Lvl 99</p>
                <p className=' w-[130px] text-center py-1 bg-dark text-[.7rem]'>Xp: 99</p>

            </div>

            <div className=' flex flex-col items-center gap-2'>
                <p className=' text-lg font-semibold'>User Title Here</p>

                <div className=' w-[200px] h-[80px] bg-zinc-800'>

                </div>

            </div>

            <div className=' w-full max-w-[365px] shadow-md'>
            <ViewCard name={'Total Purchase'} value={9999} isAmount={false} icon={<ShoppingBag size={20}/>} isLoading={true} bg={''} border={true}/>

            </div>

            

        </div>

        <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-6'>
            <ViewCard name={'Coins'} value={9999} isAmount={false} icon={<ShoppingBag size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
            <ViewCard name={'Emerald'} value={9999} isAmount={false} icon={<ShoppingBag size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
            <ViewCardSecondary name={'ROOKIE'} value={9999} isAmount={false} icon={<ShoppingBag size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
        </div>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Stats/>
            <EquipedItems/>

        </div>

        <Companion/>

    </div>
  )
}
