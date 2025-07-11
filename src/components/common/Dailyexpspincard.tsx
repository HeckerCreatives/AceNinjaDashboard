import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useUpdateDailyExpSpin, useUpdateDailySpin } from '@/client_actions/superadmin/rewards'
import toast from 'react-hot-toast'
import Loader from './Loader'

  type Props = {
    amount: number,
    type: string,
    slot: number,
    chance: number
  } 

export default function DailyExpSpincard(prop: Props) {
    const [type, setType] = useState('')
    const [amount, setAmount] = useState(0)
    const [chance, setChance] = useState(0)
    const {mutate: updateDailyExpSpin, isPending} = useUpdateDailyExpSpin()

    useEffect(() => {
        setType(prop.type)
        setAmount(prop.amount)
        setChance(prop.chance)
    },[prop])


      const updateData = async () => {
        updateDailyExpSpin(
              {
              slot: prop.slot,
              amount: amount,
              type: type,
              chance: chance
              },
              {
                onSuccess: async (response) => {
                  toast.success(`Daily spin slot data updated successfully`);
                },
              }
            );
          };

  return (
    <div className=' flex flex-col bg-amber-900 h-auto'>
              <div className=' p-2 bg-amber-950 w-full'>
                <p className=' ~text-xs/sm'>Slot {prop.slot}</p>
              </div>

              <form 
              onSubmit={(e) => {
                  e.preventDefault(); 
                  updateData(); 
                }}
              className=' w-full p-2 flex flex-col gap-1'>
               <p className=' text-[.6rem] text-zinc-300 mt-2'>Reward</p>
                <Select value={type} onValueChange={setType} >
                <SelectTrigger className="bg-zinc-950 border-none">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="exp">Exp</SelectItem>
                </SelectContent>
                </Select>

               <p className=' text-[.6rem] text-zinc-300 mt-4'>EXP Percentage (%)</p>
               <Input max={100} min={1} value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)} placeholder='Amount' type='number' className=' placeholder:text-xs'/>
               <p className=' text-[.6rem] text-zinc-300 mt-4'>Spin Chance (%)</p>
               <Input min={1} max={100} value={chance} onChange={(e) => setChance(e.target.valueAsNumber)} placeholder='Chance' type='number' className=' placeholder:text-xs'/>

              <Button type="submit" disabled={isPending} className='mt-4'>
                {isPending && <Loader />}
                Save
              </Button>

              </form>


              
             </div>
  )
}
