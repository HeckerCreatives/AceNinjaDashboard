'use client'
import React from 'react'
import Userlayout from '@/components/layout/Userlayout'
import TopupHistory from './Table'
import PayPalTopUpCard from '@/components/cards/TopupCard'
import { useGetVipPacks } from '@/client_actions/user/vip-packs'
import { StoreCard } from './vip-card'
import { useUserData } from '@/client_actions/user/dashboard/dashboard'
import useCharacterStore from '@/hooks/character'
import { Wallet } from 'lucide-react'

export default function page() {
  const {data} = useGetVipPacks()
  const { characterid } = useCharacterStore()
  
  const { data: wallet, isLoading } = useUserData(characterid)
  

  return (
    <Userlayout>
      <div className=' w-full ~p-2/8'>
              <div className=' w-full flex flex-col items-center border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
                      <div className=' w-full bg-light p-3'>
                          <p className=' text-lg font-semibold'>VIP Packs</p>
                      </div>

                      
                      <div className=' w-full flex flex-col gap-8 p-4'>
                        <div className=" flex items-center justify-center w-fit min-w-[300px]">
                        <div className="flex flex-col gap-2 w-full h-auto bg-zinc-900 p-8 rounded-md">
                          <p className="text-sm uppercase text-amber-50">Credit Balance</p>
                          <div className=" flex items-center gap-2 mt-2">
                            <Wallet size={25}/>
                            <h2 className="text-4xl text-orange-500 font-semibold">{(wallet?.wallet.find((item) => item.type === 'topupcredit')?.amount || 0).toLocaleString()}</h2>
                          </div>
                        </div>
                      </div>

                      <div className=' border-t-2 border-zinc-800 w-full'>

                      </div>
                      </div>

                      
                      

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 w-full">
                        {data?.data.map((item) => (
                          <StoreCard key={item.id} item={item} />
                        ))}
                      </div>

             
                  </div>

          </div>
  
 
  </Userlayout>
  )
}
