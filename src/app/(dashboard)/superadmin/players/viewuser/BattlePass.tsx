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
import useCharacterStore from '@/hooks/character'
import { useGetBattlepass } from '@/client_actions/superadmin/battlepass'
import useUseridStore from '@/hooks/userid'

  

export default function BattlePass() {
  const { characterid} = useCharacterStore()
  const {userid, setUserid} = useUseridStore()
  const {data, isLoading} = useGetBattlepass(characterid, userid)

  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

      <div className=' w-full max-w-[365px]'>

      </div>
      {!data ? (
        <div className=' w-full h-[300px] flex items-center justify-center'>
          <p className=' text-sm text-zinc-400'>No battle pass active.</p>
        </div>
      ) : (
        <>
        <ViewCard name={'Current Level'} value={999} isAmount={false} icon={<ArrowUpRight size={20}/>} isLoading={true} bg={'bg-[#531414]'} border={true}/>

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
          {/* <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
        </>
      )}

     

    </div>
  )
}
