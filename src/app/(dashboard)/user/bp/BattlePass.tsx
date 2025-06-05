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

  

export default function BattlePass() {
  const { characterid} = useCharacterStore()
  const {data, isLoading} = useGetUserBattlepass(characterid)

  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

      {data?.data.isActive ? (
         <div className=' w-fit  bg-amber-500 border-4 border-amber-900 p-3 rounded-sm'>
          <div className=' flex items-center justify-center gap-6 bg-yellow-300 p-8 rounded-sm'>
            <img src="/manage/icon.png" alt="battlepass" width={180} />
            <h2 className=' text-[3.2rem] w-[200px] leading-none bp-shadow font-black font-sans '>Pass Active</h2>
          </div>
        </div>
      ) : (
        <div className=' w-fit  bg-amber-500 border-4 border-amber-900 p-3 rounded-sm'>
          <div className=' flex items-center justify-center gap-6 bg-yellow-300 p-8 rounded-sm'>
            <img src="/manage/icon.png" alt="battlepass" width={180} />
            <h2 className=' text-[3.2rem] w-[250px] leading-none bp-shadow font-black font-sans '>Pass Not Active</h2>
          </div>
        </div>
      )}
      {/* {!data ? (
        <div className=' w-full h-[300px] flex items-center justify-center'>
          <p className=' text-sm text-zinc-400'>No battle pass active.</p>
        </div>
      ) : (
        <>

        <div className=' grid grid-cols-4 w-full'>
        <ViewCard name={'Current Level'} value={0} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>

        </div>

        <button className=' py-2 px-4 bg-yellow-500 text-black text-xs w-fit rounded-r-md flex items-center gap-2'>Season Filter <ChevronDown size={15}/></button>


        <Table className=' text-xs'>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Level</TableHead>
            <TableHead>Rewards</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        </>
      )} */}
    </div>
  )
}
