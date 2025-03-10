import Cardlinks from '@/components/cards/Cardlinks'
import React from 'react'

export default function Links() {
  return (
    

    <div className=' w-full ~p-2/8 h-full'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md '>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Download Links</p>
            </div>

            <div className='  w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 ~p-6/32'>
                <Cardlinks image={<img src="/playstore.svg" alt="playstore" height={100} width={200} className=' mb-4'/>} link={''}/>
                <Cardlinks image={<img src="/appstore.svg" alt="playstore" height={100} width={200} className=' mb-4'/>} link={''}/>
                <Cardlinks image={<img src="/steam.svg" alt="playstore" height={100} width={200} className=' mb-4'/>} link={''}/>

            </div>
        
        </div>
            
        </div>



    </div>
  )
}
