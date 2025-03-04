import Cardlinks from '@/components/cards/Cardlinks'
import React from 'react'

export default function Links() {
  return (
    

    <div className=' w-full p-8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md '>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Social Media</p>
            </div>

            <div className=' flex flex-wrap items-center justify-center gap-20 w-full p-8 h-auto'>
                <Cardlinks image={<img src="/FB Image.svg" alt="playstore" height={100} width={120} className=' mb-4'/>} link={''}/>
                <Cardlinks image={<img src="/X Image.svg" alt="playstore" height={100} width={120} className=' mb-4'/>} link={''}/>
                <Cardlinks image={<img src="/Discord Image.svg" alt="playstore" height={100} width={120} className=' mb-4'/>} link={''}/>
                <Cardlinks image={<img src="/IG Image.svg" alt="playstore" height={100} width={120} className=' mb-4'/>} link={''}/>
                <Cardlinks image={<img src="/Tiktok Image.svg" alt="playstore" height={100} width={120} className=' mb-4'/>} link={''}/>
                <Cardlinks image={<img src="/Yt Image.svg" alt="playstore" height={100} width={120} className=' mb-4'/>} link={''}/>

            </div>
        
        </div>
            
        </div>



    </div>
  )
}
