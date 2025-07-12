import Superadminlayoutcopy from '@/components/layout/Superadminlayout'
import React from 'react'
import Leaderboards from './Leaderboards'


export default function page() {
  return (
    <Superadminlayoutcopy>
      <div className=' w-full p-6'>
        <Leaderboards/>
      </div>
      
    </Superadminlayoutcopy>
  )
}
