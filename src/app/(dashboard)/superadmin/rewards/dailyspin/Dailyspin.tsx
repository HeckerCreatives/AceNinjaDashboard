'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useDeleteNewsletter, useGetNewsletter } from '@/client_actions/superadmin/newsletter'
import Loader from '@/components/common/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import toast from 'react-hot-toast'
import CreateRankTier from '@/components/forms/CreateRankTier'
import { useDeleteRankTier, useGetTierlist } from '@/client_actions/superadmin/ranktier'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EditRankTier from '@/components/forms/EditrankTier'
import { tierImg } from '@/utils/findAsset'
import { Input } from '@/components/ui/input'
import { useDailySpin } from '@/client_actions/superadmin/rewards'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DailySpincard from '@/components/common/DailySpincard'

  

export default function DailyspinRewards() {
    const {data, error} = useDailySpin()

    if (error) return <p className="text-red-500 p-4">Failed to load daily spin rewards.</p>;
    



  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Rewards / Daily Spin</p>
            </div>

            <div className=' w-full -full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] p-6 gap-4'>
             {Array.isArray(data?.data) && data.data.map((item, index) => (
              <DailySpincard
                key={item.id || index}
                amount={item.amount}
                type={item.type}
                slot={item.slot}
                chance={item.chance}
              />
            ))}

                
                
            </div>

      
        
        </div>
            
        </div>

    

    </div>
  )
}
