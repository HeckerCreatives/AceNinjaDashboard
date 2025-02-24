import Card from '@/components/cards/Card'
import { ArrowUpRight, Crown, UserCheck, UserX } from 'lucide-react'
import React from 'react'

export default function Cards() {
  return (
    <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card name={'Rank'} value={1} isAmount={false} icon={<Crown size={20} />} isLoading={true}/>
        <Card name={'MMR'} value={9999} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true}/>
        <Card name={'Win'} value={9999} isAmount={false} icon={<UserCheck size={20} />} isLoading={true}/>
        <Card name={'Lose'} value={9999} isAmount={false} icon={<UserX size={20} />} isLoading={true}/>

    </div>
  )
}
