import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Countdown from 'react-countdown';

type Props = {
    name: string
    value: number | string
    isAmount: boolean
    icon: React.ReactElement
    isLoading: boolean
    bg: string
    border: boolean
    subtext?: any
    timeleft?: number
}

export default function Card(prop:Props){
  const remainingTime = prop.timeleft || 0;


  return (
    <div className={` w-full flex flex-col gap-4 rounded-md p-4 ${prop.bg} shadow ${prop.border && 'border-[1px] border-amber-900'}`}>
        <div className=' w-full flex items-center justify-between'>
            <p className=' text-sm'>{prop.name}</p>
            <p className=' p-2 bg-amber-400 rounded-full'>{prop.icon}</p>
        </div>

        <div className=' w-full flex flex-col gap-2'>
          {prop.isLoading === false ? (
            <SkeletonTheme baseColor="#202020" highlightColor="#444" height={35} width={180}>
              <Skeleton/>
            </SkeletonTheme>
          ): (
            <p className=' text-4xl font-semibold'>{prop.isAmount === true && '$'}{prop.value?.toLocaleString()}</p>

          )}

          {prop.timeleft !== undefined ? ( // Ensure prop.timeleft exists before rendering Countdown
            <Countdown
              className="mt-2"
              date={Date.now() + prop.timeleft} // Convert to milliseconds
              renderer={({ days, hours, minutes, seconds, completed }) =>
                completed ? (
                  <span className="text-xs w-fit bg-green-950 px-4 py-1 text-green-500 rounded-sm">
                    {prop.value} is ended
                  </span>
                ) : (
                  <span className="text-xs w-fit bg-green-950 px-4 py-1 text-green-500 rounded-sm">
                    Ends in: {days} days : {hours} : {minutes} : {seconds}
                  </span>
                )
              }
            />
          ) : null}
        
           
            
        </div>


    </div>
  )
}
