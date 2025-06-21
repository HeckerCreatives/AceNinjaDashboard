'use client'
import { useGetSocialMedia } from '@/client_actions/superadmin/socialmedia'
import Cardlinks from '@/components/cards/Cardlinks'
import React from 'react'

export default function Links() {
  const {data} = useGetSocialMedia()


  return (
    

    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md '>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Social Media</p>
            </div>

            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 ~p-6/32'>
                <Cardlinks image={<img src="/FB Image.svg" alt="fb" height={100} width={120} className=' mb-4' />} title={'Facebook'} type={'fb'}/>
                <Cardlinks image={<img src="/X Image.svg" alt="x" height={100} width={120} className=' mb-4' />} title={'X'} type={'x'}/>
                <Cardlinks image={<img src="/Discord Image.svg" alt="discord" height={100} width={120} className=' mb-4' />} title={'Discord'} type={'dc'}/>
                <Cardlinks image={<img src="/IG Image.svg" alt="ig" height={100} width={120} className=' mb-4' />} title={'Instagram'} type={'ig'} />
                <Cardlinks image={<img src="/Tiktok Image.svg" alt="tiktok" height={100} width={120} className=' mb-4' />} title={'Tiktok'} type={'tk'} />
                <Cardlinks image={<img src="/Yt image.svg" alt="yt" height={100} width={120} className=' mb-4' />} title={'Youtube'} type={'yt'}/>
            </div>
        
        </div>
            
        </div>



    </div>
  )
}
