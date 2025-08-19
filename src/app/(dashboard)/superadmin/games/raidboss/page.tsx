import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import Tierlist from '../ranktier/Tierlist'
import Bosslist from './BossList'

export default function page() {
  return (
   <Superadminlayout>
      <Bosslist/>
   </Superadminlayout>
  )
}
