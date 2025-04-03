import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import Topup from './Topup'
import TopupHistory from './History'

export default function page() {
  return (
    <Superadminlayout>
        <Topup/>
        <TopupHistory/>
    </Superadminlayout>
  )
}
