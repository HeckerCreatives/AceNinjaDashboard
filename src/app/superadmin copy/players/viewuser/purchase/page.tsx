import React from 'react'
import TableInventory from './Table'
import Userlayout from '@/components/layout/Userlayout'
import Viewuserlayout from '@/components/layout/Viewuserlayout'

export default function page() {
  return (
    <Viewuserlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-6 h-auto'>

        <p className=' text-sm'>Purchase History</p>
       <TableInventory/>
      
    </div>
 
  </Viewuserlayout>
  )
}
