'use client'
import React from 'react'
import Userlayout from '@/components/layout/Userlayout'
import TopupHistory from './Table'
import PayPalTopUpCard from '@/components/cards/TopupCard'
import { useGetVipPacks } from '@/client_actions/user/vip-packs'
import { StoreCard } from './vip-card'

export default function page() {
  const {data} = useGetVipPacks()

  return (
    <Userlayout>
      <div className=' w-full ~p-2/8'>
              <div className=' w-full flex flex-col items-center border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
                      <div className=' w-full bg-light p-3'>
                          <p className=' text-lg font-semibold'>VIP Packs</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 p-4 w-full">
                        {data?.data.map((item) => (
                          <StoreCard key={item.id} item={item} />
                        ))}
                      </div>

                  <div className=' w-full grid grid-cols-1 lg:grid-cols-[700px_1fr] gap-6'>
                      {/* <div className=' w-full max-w-[400px] bg-amber-950 h-fit rounded-md flex flex-col gap-6 items-center justify-center py-12 border-[1px] border-amber-900'>
                        <div className=' p-4 bg-zinc-950 rounded-md'>
                          <img src="/paypal.png" alt="" width={250} height={250} />
                        </div>

                        <button className=' py-2 px-12 rounded-md bg-yellow-500 text-sm text-amber-950 font-medium'>Connect Paypal Wallet</button>
                      </div> */}

                    {/* <PayPalTopUpCard/> */}

                   


                      {/* <TopupHistory/> */}
                    </div>
                  </div>

          </div>
  
 
  </Userlayout>
  )
}
