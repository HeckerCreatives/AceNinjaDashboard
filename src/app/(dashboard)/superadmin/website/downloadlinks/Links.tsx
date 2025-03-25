'use client'
import { useGetDownloadlinks } from '@/client_actions/superadmin/downloadlinks'
import Cardlinks from '@/components/cards/Cardlinks'
import DownloadCardlinks from '@/components/cards/DownloadLinkCard'
import React from 'react'

export default function Links() {
  const {data, isLoading} = useGetDownloadlinks()

  console.log(data)

  return (
    

    <div className=' w-full ~p-2/8 h-full'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md '>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Download Links</p>
            </div>

            <div className='  w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 ~p-6/32'>
                <DownloadCardlinks image={<img src="/playstore.svg" alt="playstore" height={100} width={200} className=' mb-4' />} title={'Playstore'} type={'android'}/>
                <DownloadCardlinks image={<img src="/appstore.svg" alt="appstore" height={100} width={200} className=' mb-4' />} title={'Appstore'} type={'ios'}/>
                <DownloadCardlinks image={<img src="/steam.svg" alt="steam" height={100} width={200} className=' mb-4' />} title={'Steam'} type={'pc'}/>
            </div>
        
        </div>
            
        </div>



    </div>
  )
}
