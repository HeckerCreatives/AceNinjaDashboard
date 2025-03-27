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
    bg: string
    border: boolean
    rankicon?: string
}

export default function ViewCardSecondary(prop:Props){


  return (
    <div className={` w-full flex gap-4 rounded-md p-4 ${prop.bg} shadow ${prop.border && 'border-[1px] border-amber-900'}`}>
        

        <div className=' w-full flex flex-col gap-2'>
          <p className=' text-sm'>{prop.name}</p>

            <p className=' text-4xl font-semibold mt-4'>{prop.name}</p>
            
            <p className=' text-xs w-fit bg-green-950 px-8 py-1 rounded-sm text-white'>{prop.value.toLocaleString()}</p>
        </div>

        <div className=' w-fit flex items-center justify-between'>
          <img src={`${process.env.NEXT_PUBLIC_API_URL}/${prop.rankicon}`} alt="rank" width={130} height={130}/>
        </div>


    </div>
  )
}
