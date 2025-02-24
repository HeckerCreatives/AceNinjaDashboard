import Card from '@/components/cards/Card'
import { Ticket, TicketX } from 'lucide-react'
import React from 'react'

export default function Cards() {
  return (
    <div className=' w-full grid grid-cols-3 gap-6'>
        <Card name={'Total Codes'} value={9999} isAmount={false} icon={<Ticket size={20}/>}/>
        <Card name={'Total Redeemed Codes'} value={9999} isAmount={false} icon={<Ticket size={20}/>}/>
        <Card name={'Total Unredeemed Codes'} value={9999} isAmount={false} icon={<TicketX size={20}/>}/>

    </div>
  )
}
