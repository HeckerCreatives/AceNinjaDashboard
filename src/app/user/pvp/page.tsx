import React from 'react'
import TableInventory from './Table'
import Userlayout from '@/components/layout/Userlayout'

export default function page() {
  return (
    <Userlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-6 h-auto'>
    <p className=' text-sm'>PVP History</p>

       <TableInventory/>
      
    </div>
 
  </Userlayout>
  )
}
