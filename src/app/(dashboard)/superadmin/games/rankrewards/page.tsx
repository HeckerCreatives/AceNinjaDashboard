import Superadminlayoutcopy from '@/components/layout/Superadminlayout'
import React from 'react'
import RankRewardCards from './Rewards'


export default function page() {
  return (
    <Superadminlayoutcopy>
      <div className=' w-full p-6'>
        <RankRewardCards/>
      </div>
      
    </Superadminlayoutcopy>
  )
}
