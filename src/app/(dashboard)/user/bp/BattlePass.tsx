'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import ViewCard from '@/components/viewuser/ViewCard'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetUserBattlepass } from '@/client_actions/user/battlepass'
import useCharacterStore from '@/hooks/character'
import Image from 'next/image'

  

export default function BattlePass() {
  const { characterid} = useCharacterStore()
  const {data, isLoading} = useGetUserBattlepass(characterid)

  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

      {data?.data.hasPremium ? (
         <div className=' w-fit bg-amber-500 border-4 border-amber-900 p-3 rounded-sm'>
          <div className=' flex flex-col md:flex-row items-start md:items-center justify-center gap-6 bg-yellow-300 p-8 rounded-sm'>
            <Image src="/manage/Icon.webp" alt="battlepass" width={180} height={180} loading='lazy' />
            <h2 className=' text-[3.2rem] w-[200px] leading-none bp-shadow font-black font-sans '>Pass Active</h2>
          </div>
        </div>
      ) : (
        <div className=' w-fit bg-amber-500 border-4 border-amber-900 p-3 rounded-sm'>
          <div className=' flex flex-col md:flex-row items-start md:items-center justify-center gap-6 bg-yellow-300 p-8 rounded-sm'>
            <Image src="/manage/Icon.webp" alt="battlepass" width={180} height={180} loading='lazy' />
            <h2 className=' text-[3.2rem] w-[200px] leading-none bp-shadow font-black font-sans '>Pass Not Active</h2>
          </div>
        </div>
      )}
    
    </div>
  )
}
