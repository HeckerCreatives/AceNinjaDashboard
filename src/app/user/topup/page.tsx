import React from 'react'
import TableInventory from './Table'
import Userlayout from '@/components/layout/Userlayout'

export default function page() {
  return (
    <Userlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-6 h-auto'>
    <p className=' text-sm'>Topup History</p>

    <div className=' w-full grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className=' w-full h-auto bg-zinc-950 rounded-md flex flex-col gap-6 items-center justify-center py-12'>
        <img src="/paypal.png" alt="" width={250} height={250} />

        <button className=' py-3 px-12 rounded-md bg-zinc-800 text-sm'>Connect Paypal Wallet</button>
      </div>

      <TableInventory/>
    </div>
      
    </div>
 
  </Userlayout>
  )
}
