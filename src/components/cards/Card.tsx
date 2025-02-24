import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
    name: string
    // icon: ReactElement
    value: number
    isAmount: boolean
    icon: React.ReactElement
    isLoading: boolean
}

export default function Card(prop:Props){


  return (
    <div className=' w-full flex flex-col gap-8 rounded-md p-6 bg-zinc-950 shadow'>
        <div className=' w-full flex items-center justify-between'>
            <p className=' text-sm'>{prop.name}</p>
            <p className=' p-2 bg-amber-400 rounded-full'>{prop.icon}</p>
        </div>

        <div className=' w-full flex flex-col gap-2'>
          {prop.isLoading === true ? (
            <SkeletonTheme baseColor="#202020" highlightColor="#444" height={35} width={180}>
              <Skeleton/>
            </SkeletonTheme>
          ): (
            <p className=' text-4xl font-semibold'>{prop.isAmount === true && '$'}{prop.value.toLocaleString()}</p>

          )}
            
            <p className=' text-xs text-zinc-500'>Last month</p>
        </div>


    </div>
  )
}
