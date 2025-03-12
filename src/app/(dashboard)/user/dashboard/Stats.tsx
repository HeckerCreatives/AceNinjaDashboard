import StatsPanel from '@/components/viewuser/stats/stats-panel'
import React from 'react'

export default function Stats() {
  return (
    <div className=' w-full bg-light h-auto border-amber-900 border-[1px] rounded-md overflow-hidden'>
        <div className=' w-full bg-dark px-4 py-2'>
            <p className=' text-sm font-semibold'>Stats</p>

        </div>

        <StatsPanel/>
    </div>
  )
}
