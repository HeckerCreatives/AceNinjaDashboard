'use client'
import React, { useEffect, useState } from 'react'
import { useDailySpin, useGetMonthlylogin, useGetWeeklylogin } from '@/client_actions/superadmin/rewards'
import Weeklylogincard from '@/components/common/Weeklylogin'
import Monthlylogincard from '@/components/common/Monthlylogincard'

  

export default function Monthlylogin() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [open, setOpen] = useState(false)
    const {data} = useGetMonthlylogin()
    
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


function extractNumberFromString(str: any) {
  const match = str.match(/\d+/);
  return match ? Number(match[0]) : 0;
}



  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Rewards / Monthly Login</p>
            </div>

            <div className=' w-full -full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] p-6 gap-4'>
              {data?.data.slice(0, -1).map((item, index, array) => {
                  // Display day as "day25" for second-to-last item
                  const displayDay = index === array.length - 1 ? 25 : extractNumberFromString(item.day);

                  // Keep actual daytype for backend
                  const actualDaytype = item.day;

                  return (
                    <Monthlylogincard
                      key={item.id}
                      amount={item.amount}
                      type={item.type}
                      day={displayDay}            // Displayed on UI
                      daytype={actualDaytype}     // Actual key to update backend
                    />
                  );
                })}


                
            </div>

      
        
        </div>
            
        </div>

    

    </div>
  )
}
