import React from 'react'
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
            <div className=' bg-amber-950 w-[70%] h-8 rounded-md animate-pulse duration-1000'>

            </div>
          ): (
            <p className=' text-4xl font-semibold'>{prop.isAmount === true && '$'}{prop.value?.toLocaleString()}</p>

          )}

          {prop.timeleft !== undefined ? ( 
            <Countdown
              className="mt-2"
              date={Date.now() + prop.timeleft}
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
