'use client'
import ViewCard from '@/components/viewuser/ViewCard'
import ViewCardSecondary from '@/components/viewuser/ViewCardSecondary'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import React, { useEffect } from 'react'
import EquipedItems from './EquipedItems'
import Stats from './Stats'
import Companion from './Companion'
import { getData, useGetRank, useGetTotalPayin, useUserData } from '@/client_actions/user/dashboard/dashboard'
import useCharacterStore from '@/hooks/character'
import Card from '@/components/cards/Card'
import { PiRanking } from 'react-icons/pi'
import { useGetCurrentSeason } from '@/client_actions/superadmin/season'
import { badgeImg, currencyCardImg, titleAssets } from '@/utils/findAsset'
import usePlayerNameStore from '@/hooks/player'

export default function Dashboard() {
    const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
    const { data, isLoading } = useUserData(characterid)
    const {data: currentSeason} = useGetCurrentSeason()
    const {data: rank} = useGetRank(characterid)
    const {data: payin} = useGetTotalPayin(characterid)
        const {setPlayername} = usePlayerNameStore()

        useEffect(() => {
            setPlayername(data?.user || '')
        }, [data])
    


  


    

  return (
    <div className=' w-full max-w-[1540px] h-auto flex flex-col gap-6 items-center p-4'>
        <div className=' w-full h-auto flex lg:flex-row flex-col gap-4 items-center justify-between bg-light py-4 px-6 border-[1px] border-amber-900 rounded-md'>
            <div className=' flex flex-col items-center gap-2 px-20'>
                <p className=' text-xl font-bold'>{data?.username}</p>
                <p className=' w-[130px] text-center py-1 bg-dark text-[.7rem]'>Current: Lvl {data?.level}</p>
                <p className=' w-[130px] text-center py-1 bg-dark text-[.7rem]'>Xp: {data?.experience}</p>

            </div>

            <div className=' flex items-center gap-4'>
                <div className=' flex flex-col items-center gap-2'>
                    <p className=' text-sm font-semibold'>User Title</p>

                    <div className=' flex items-center justify-center'>
                        {titleAssets(data?.title || 0)}
                    </div>

                </div>

                <div className=' flex flex-col items-center gap-2'>
                    <p className=' text-sm font-semibold'>Badge</p>

                    <div className=' flex items-center justify-center'>
                        {badgeImg(data?.badge || 0)}
                    </div>

                </div>
            </div>


            <div className=' w-full max-w-[365px] shadow-md'>
                <Card name={"Total Purchased"} value={payin?.data.totalpayin || 0} isAmount={false} icon={<PiRanking size={20} />} isLoading={true} bg={"bg-[#531414]"} border={true}/>
            {/* <ViewCard name={'Total Purchase'} value={9999} isAmount={false} icon={<ShoppingBag size={20}/>} isLoading={true} bg={''} border={true}/> */}

            </div>

            

        </div>

        <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6'>
            <ViewCard name={'Coins'} value={data?.wallet.find((item) => item.type === 'coins')?.amount || 0} isAmount={false} icon={currencyCardImg('coins')} isLoading={true} bg={'bg-[#531414]'} border={true}/>
            <ViewCard name={'Crystal'} value={data?.wallet.find((item) => item.type === 'crystal')?.amount || 0} isAmount={false} icon={currencyCardImg('crystal')} isLoading={true} bg={'bg-[#531414]'} border={true}/>
            <ViewCard name={'Credits'} value={data?.wallet.find((item) => item.type === 'topupcredit')?.amount || 0} isAmount={false} icon={currencyCardImg('topupcredit')} isLoading={true} bg={'bg-[#531414]'} border={true}/>
            <ViewCardSecondary name={rank?.data.rankTier || ''} value={rank?.data.mmr || 0} isAmount={false} icon={<ShoppingBag size={20} />} isLoading={true} bg={'bg-[#531414]'} border={true} rankicon={rank?.data.icon} rankname={rank?.data.rankTier || ''}/>
        </div>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Stats/>
            <EquipedItems/>

        </div>

        <Companion/>

    </div>
  )
}
