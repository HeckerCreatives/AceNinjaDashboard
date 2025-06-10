'use client'
import React, { useState } from 'react'
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
import useCharacterStore from '@/hooks/character'
import { useGetBattlepass, useGetUserBattlepass } from '@/client_actions/superadmin/battlepass'
import useUseridStore from '@/hooks/userid'
import TopupHistory from './history/TopupHistory'

  

export default function TransactionHsitory() {
  const { characterid} = useCharacterStore()
  const [tab, setTab] = useState('Topup')


  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

        <Select value={tab} onValueChange={setTab}>
        <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Topup">Topup History</SelectItem>
            <SelectItem value="Buy Item History">Buy Item History</SelectItem>
            <SelectItem value="Buy Skill History">Buy Skill History</SelectItem>
            <SelectItem value="Level Up Skill History">Buy History</SelectItem>
            <SelectItem value="Companion History">Buy History</SelectItem>
            <SelectItem value="Battle Pass Buy History">Buy History</SelectItem>
            <SelectItem value="Battle Pass Buy History">Claim Rewards History</SelectItem>
        </SelectContent>
        </Select>

        {tab === 'Topup' && (
          <TopupHistory/>
        )}

      

    </div>
  )
}
