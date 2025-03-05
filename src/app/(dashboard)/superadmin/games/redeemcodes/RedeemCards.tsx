import Card from '@/components/cards/Card'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function RedeemCards() {
  return (
    
    <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 '>
        <Card name={"Total Codes"} value={1} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true} />
        <Card name={"Total Redeemmed Codes"} value={1} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true} />
        <Card name={"Total Unredeemmed Codes"} value={1} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true} />
        

    </div>
  )
}
