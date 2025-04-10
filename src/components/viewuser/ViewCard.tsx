import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
    name: string
    // icon: ReactElement
    value: number
    isAmount: boolean
    icon: any
    isLoading: boolean
    bg: string
    border: boolean
}

export default function ViewCard(prop:Props){


  return (
    <div className={` w-full flex flex-col gap-4 rounded-md p-4 ${prop.bg} shadow ${prop.border && 'border-[1px] border-amber-900'}`}>
        <div className=' w-full flex items-center justify-between'>
            <p className=' text-sm'>{prop.name}</p>
            {prop.icon}
        </div>

        <div className=' w-full flex flex-col gap-2'>
          {prop.isLoading === false ? (
            <SkeletonTheme baseColor="#202020" highlightColor="#444" height={35} width={180}>
              <Skeleton/>
            </SkeletonTheme>
          ): (
            <p className=' text-4xl font-semibold'>{prop.isAmount === true && '$'}{prop.value.toLocaleString()}</p>

          )}
            
        </div>


    </div>
  )
}
