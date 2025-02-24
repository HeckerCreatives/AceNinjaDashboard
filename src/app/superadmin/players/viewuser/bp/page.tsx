import React from 'react'
import TableInventory from './Table'
import Userlayout from '@/components/layout/Userlayout'
import Viewuserlayout from '@/components/layout/Viewuserlayout'
import Card from '@/components/cards/Card'
import { ArrowUpRight } from 'lucide-react'

export default function page() {
  return (
    <Viewuserlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-6 h-auto'>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          <Card name={'Current Level'} value={99} isAmount={false} icon={<ArrowUpRight size={20} />} isLoading={true}/>
        </div>
       <TableInventory/>
      
    </div>
 
  </Viewuserlayout>
  )
}
