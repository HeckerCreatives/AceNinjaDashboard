import ViewCard from '@/components/viewuser/ViewCard'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function PvpCards() {
  return (
    <div className=' w-full grid grid-cols-4 gap-4'>
        <ViewCard name={'Rank'} value={1} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
        <ViewCard name={'MMR'} value={999} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
        <ViewCard name={'Wins'} value={9999} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
        <ViewCard name={'Loses'} value={9999} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>

    </div>
  )
}
