'use client'
import React from 'react'
import MaintenanceCard from '@/components/cards/Maintenancecards'
import { useGetMaintenance } from '@/client_actions/superadmin/maintenance'
  

export default function Maintenance() {
    const {data} = useGetMaintenance()

    console.log(data)
  return (
    <div className=' w-full ~p-2/8 max-w-[1625px]'
    >

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Maintenance</p>
            </div>

            <div className=' w-full h-auto flex flex-col gap-4 p-8'>

                <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
                    <MaintenanceCard name={'Full Game'} img={'/maintenance/Full Game TAB.png'} value={false} type={'fullgame'}/>
                </div>

                <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
                    <MaintenanceCard name={'Store'} img={'/maintenance/Store TAB.png'} value={false} type={'store'}/>
                    <MaintenanceCard name={'Market'} img={'/maintenance/Market TAB.png'} value={false} type={'market'}/>
                    <MaintenanceCard name={'Battle Pass'} img={'/maintenance/Battle Pass TAB.png'} value={false} type={'battlepass'}/>
                    <MaintenanceCard name={'Quest'} img={'/maintenance/Quest TAB.png'} value={false} type={'quest'}/>
                </div>

                <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
                    <MaintenanceCard name={'Daily Spin'} img={'/maintenance/Daily Spin TAB.png'} value={false} type={'dailyspin'}/>
                    <MaintenanceCard name={'Daily Exp Spin'} img={'/maintenance/Daily EXP Spin.png'} value={false} type={'dailyxpspin'}/>
                    <MaintenanceCard name={'Weekly Login'} img={'/maintenance/Weekly Login TAB.png'} value={false} type={'weeklylogin'}/>
                    <MaintenanceCard name={'Monthly Login'} img={'/maintenance/Monthly Login TAB.png'} value={false} type={'monthlylogin'}/>
                    <MaintenanceCard name={'Chest'} img={'/maintenance/Chest TAB.png'} value={false} type={'chest'}/>
                </div>

                <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
                    <MaintenanceCard name={'PVP'} img={'/maintenance/PVP TAB.png'} value={false} type={'pvp'}/>
                    <MaintenanceCard name={'Clan'} img={'/maintenance/Clan TAB.png'} value={false} type={'clan'}/>
                    <MaintenanceCard name={'Raid Boss'} img={'/maintenance/Raid Boss TAB.png'} value={false} type={'raidboss'}/>
                </div>

            </div>

           
           
        </div>
            
        </div>

    

    </div>
  )
}
