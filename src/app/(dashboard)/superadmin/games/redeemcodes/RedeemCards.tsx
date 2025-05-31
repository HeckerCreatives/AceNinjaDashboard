import { useGetRedeemCodesAnalytics } from '@/client_actions/superadmin/redeemcodes'
import Card from '@/components/cards/Card'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function RedeemCards() {
  const {data} = useGetRedeemCodesAnalytics()

  console.log(data)
  return (
    
    <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 '>
        <Card name={"Total Codes"} value={data?.data.total || 0} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true} />
        <Card name={"Total Redeemed Codes"} value={data?.data.redeemed || 0} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true} />
        {/* <Card name={"Total Unredeemmed Codes"} value={data?.data.unredeemed || 0} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true} /> */}
        

    </div>
  )
}
