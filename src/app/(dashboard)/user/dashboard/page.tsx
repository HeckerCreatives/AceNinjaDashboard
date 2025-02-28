"use client"
import Userlayout from '@/components/layout/Userlayout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Profile } from '@/types/User'

export default function page() {
  const [profile, setProfile] = useState<Profile>()

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`,{
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })
      } catch (error) {
        
      }
    }
    getData()
  },[])


  return (
    <Userlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col items-center h-auto'>

        <div className=' flex flex-col gap-6 w-full lg:w-[60%] bg-zinc-950 rounded-md h-auto p-8'>
            <p className=' text-sm font-semibold'>Profile</p>

            <div className=' w-full grid grid-cols-2 text-sm'>
                <div className=' w-full flex flex-col gap-4'>
                    <p className=' text-zinc-400'>Username: <span className=' text-white'>Test</span></p>
                    <p className=' text-zinc-400'>Level: <span className=' text-white'>100</span></p>
                    <p className=' text-zinc-400'>Xp: <span className=' text-white'>100</span></p>
                    <p className=' text-zinc-400'>Rank: <span className=' text-white'>1</span></p>
                    <p className=' text-zinc-400'>Coins: <span className=' text-white'>999999</span></p>

                </div>

                <div className=' w-full flex flex-col gap-4'>
                    <p className=' text-zinc-400'>Crystal: <span className=' text-white'>99999</span></p>
                    <p className=' text-zinc-400'>Title: <span className=' text-white'>Test</span></p>
                    <p className=' text-zinc-400'>Satus: <span className=' text-white'>Active</span></p>
                    <p className=' text-zinc-400'>Story: <span className=' text-white'>Test</span></p>
                    

                </div>

            </div>
        </div>
      
    </div>
 
  </Userlayout>
  )
}
