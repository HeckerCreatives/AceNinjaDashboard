import Card from '@/components/cards/Card'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function Cards() {
  return (
    <div className=' w-full grid grid-cols-4 gap-6'>
        <Card name={'Rank'} value={1} isAmount={false} icon={<ArrowUpRight size={20}/>}/>
        <Card name={'MMR'} value={9999} isAmount={false} icon={<ArrowUpRight size={20}/>}/>
        <Card name={'Win'} value={9999} isAmount={false} icon={<ArrowUpRight size={20}/>}/>
        <Card name={'Lose'} value={9999} isAmount={false} icon={<ArrowUpRight size={20}/>}/>

    </div>
  )
}
