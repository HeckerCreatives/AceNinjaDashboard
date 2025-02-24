import MaintenanceCard from '@/components/cards/Maintenancecards'
import { BookmarkCheck, Gamepad2, Gem, Shield, ShoppingBag, Skull, Swords } from 'lucide-react'
import React from 'react'

export default function Cards() {
  return (
    <div className=' w-full grid grid-cols-4 gap-6'>
       <MaintenanceCard name={'PVP'} value={false} icon={<Swords size={40} className=' text-yellow-400'/>}/>
        <MaintenanceCard name={'Fullgame'} value={false} icon={<Gamepad2 size={40} className=' text-yellow-400'/>}/>
        <MaintenanceCard name={'Raid Boss'} value={false} icon={<Skull size={40} className=' text-yellow-400'/>}/>
        <MaintenanceCard name={'Store'} value={false} icon={<ShoppingBag size={40} className=' text-yellow-400'/>}/>
        <MaintenanceCard name={'Clan War'} value={false} icon={<Shield size={40} className=' text-yellow-400'/>}/>
        <MaintenanceCard name={'Daily Quest'} value={false} icon={<BookmarkCheck size={40} className=' text-yellow-400'/>}/>
        <MaintenanceCard name={'Rewards'} value={false} icon={<Gem size={40} className=' text-yellow-400'/>}/>


    </div>
  )
}
