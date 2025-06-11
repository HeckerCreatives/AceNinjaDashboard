import Superadminlayoutcopy from '@/components/layout/Superadminlayout'
import React from 'react'
import GameVersionComponent from './game-version'

export default function page() {
  return (
    <Superadminlayoutcopy>
      <div className=' p-4 lg:p-8 w-full'>
      <GameVersionComponent/>
      </div>
    </Superadminlayoutcopy>
  )
}
