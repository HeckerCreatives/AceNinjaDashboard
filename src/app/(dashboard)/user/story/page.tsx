import Userlayout from '@/components/layout/Userlayout'
import React from 'react'
import StoryHistory from './Story'

export default function page() {
  return (
    <Userlayout>
    <div className=' w-full ~p-2/8'>
        <div className=' w-full flex flex-col items-center border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Story History</p>
            </div>

            <StoryHistory/>
        </div>
    </div>
    </Userlayout>
  )
}
