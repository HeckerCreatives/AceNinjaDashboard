import Card from '@/components/cards/Card'
import Viewuserlayout from '@/components/layout/Viewuserlayout'
import { ArrowUpRight, Coins, Gem, ShoppingBag } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <Viewuserlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-6 items-center h-auto'>

        <div className=' flex flex-col gap-6 w-full lg:w-[60%] bg-zinc-950 rounded-md h-auto p-8'>
           

            <div className=' w-full grid grid-cols-1 gap-6 md:grid-cols-3 text-sm'>
                <div className=' w-full flex flex-col items-center justify-center gap-4'>
                    <p className=' text-zinc-100 text-4xl font-semibold'>Username</p>
                    <p className=' text-sm font-medium text-zinc-300'>Current level: 10</p>
                  
                </div>

                <div className=' w-full flex flex-col items-center justify-center gap-4'>
                    <p className=' text-zinc-100 text-xl font-semibold'>User Title Here</p>
                    <img src="/logo.png" alt="" width={100} height={100} />
                  
                </div>

                <div className=' w-full flex flex-col items-center justify-center gap-4'>
                    <p className=' text-zinc-100 text-lg flex items-center justify-center gap-4'>Stage: <span className=' text-4xl font-semibold'>1</span></p>
                  
                  
                </div>


            </div>

            
        </div>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-[60%]'>
          <Card name={'Coins'} value={999999} isAmount={false} icon={<Coins size={20} />} isLoading={true}/>
          <Card name={'Crystals'} value={999999} isAmount={false} icon={<Gem size={20} />} isLoading={true}/>
          <Card name={'Total Purchase'} value={999999} isAmount={false} icon={<ShoppingBag size={20} />} isLoading={true}/>

        </div>

      {/* <div className=' w-full grid grid-cols-3 gap-8'>
        <Linechart/>
        <Barchart/>
        <Piechart/>
        <Linechart/>
        <Barchart/>
        <Piechart/>
      </div> */}
      
    </div>
 
  </Viewuserlayout>
  )
}
