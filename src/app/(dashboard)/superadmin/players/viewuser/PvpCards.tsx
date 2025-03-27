import { useGetRankStats } from '@/client_actions/superadmin/pvp'
import ViewCard from '@/components/viewuser/ViewCard'
import useCharacterStore from '@/hooks/character'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function PvpCards() {
  const {characterid} = useCharacterStore()
  const {data, isLoading} = useGetRankStats(characterid)

  return (
    <div className=' w-full h-auto grid xl:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4'>
        <ViewCard name={'Rank'} value={data?.data.rank || 0} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
        <ViewCard name={'MMR'} value={data?.data.mmr || 0} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
        <ViewCard name={'Wins'} value={data?.data.win || 0} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>
        <ViewCard name={'Loses'} value={data?.data.lose || 0} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>

    </div>
  )
}
