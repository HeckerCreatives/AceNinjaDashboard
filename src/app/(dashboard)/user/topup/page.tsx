import React from 'react'
import Userlayout from '@/components/layout/Userlayout'
import TopupHistory from './Table'
import PayPalTopUpCard from '@/components/cards/TopupCard'

export default function page() {
  return (
    <Userlayout>
      <div className=' w-full ~p-2/8'>
              <div className=' w-full flex flex-col items-center border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
                      <div className=' w-full bg-light p-3'>
                          <p className=' text-lg font-semibold'>Topup</p>
                      </div>

                      <div className=' w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 p-6'>
                      {/* <div className=' w-full max-w-[400px] bg-amber-950 h-fit rounded-md flex flex-col gap-6 items-center justify-center py-12 border-[1px] border-amber-900'>
                        <div className=' p-4 bg-zinc-950 rounded-md'>
                          <img src="/paypal.png" alt="" width={250} height={250} />
                        </div>

                        <button className=' py-2 px-12 rounded-md bg-yellow-500 text-sm text-amber-950 font-medium'>Connect Paypal Wallet</button>
                      </div> */}

                    <PayPalTopUpCard/>


                      <TopupHistory/>
                    </div>
                  </div>

          </div>
    {/* <div className='p-6 top-0 left-0 w-full flex flex-col gap-6 h-auto'>
    <p className=' text-sm'>Topup History</p>

    <div className=' w-full grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className=' w-full h-auto bg-zinc-950 rounded-md flex flex-col gap-6 items-center justify-center py-12'>
        <img src="/paypal.png" alt="" width={250} height={250} />

        <button className=' py-3 px-12 rounded-md bg-zinc-800 text-sm'>Connect Paypal Wallet</button>
      </div>

      <TableInventory/>
    </div>
      
    </div> */}
 
  </Userlayout>
  )
}
