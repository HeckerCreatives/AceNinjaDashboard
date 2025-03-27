import React from 'react'

export default function Companion() {
  return (
    <div className=' w-full bg-light h-auto border-amber-900 border-[1px] rounded-md overflow-hidden'>
        <div className=' w-full bg-dark px-4 py-2'>
            <p className=' text-sm font-semibold'>Companion</p>

        </div>

        {/* <div className=' w-full h-auto flex flex-wrap items-center justify-center gap-4 p-8'>
            <div className=' h-auto flex flex-col gap-4'>
                <div className=' flex flex-col gap-6 p-4 bg-dark max-w-[300px] w-full'>
                    <p className=' text-lg font-semibold'>Passive:</p>
                    <p className=' text-sm'>Lorem ipsum dolor sit amet consectetur. </p>
                    
                </div>

                <div className=' flex flex-col gap-6 p-4 bg-dark max-w-[300px] w-full'>
                    <p className=' text-lg font-semibold'>Active:</p>
                    <p className=' text-sm'>Lorem ipsum dolor sit amet consectetur. </p>
                    
                </div>

            </div>

            <div className=' max-w-[300px] w-full h-[260px] bg-dark'>

            </div>
        </div> */}

        <div className=' flex items-center justify-center w-full h-full p-20'>
            <p className=' text-xs text-zinc-400'>No companion</p>

        </div>

    </div>
  )
}
