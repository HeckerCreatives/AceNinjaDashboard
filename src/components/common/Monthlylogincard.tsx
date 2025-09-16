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
import { useUpdateMonthlylogin } from '@/client_actions/superadmin/rewards'
import toast from 'react-hot-toast'
import Loader from './Loader'
import { useGetChestRewards } from '@/client_actions/superadmin/chest'

type Props = {
  amount: number,
  type: string,
  day: number,
  daytype: string
}

export default function Monthlylogincard(prop: Props) {
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('') 
  const [chest, setChest] = useState('') 
  const { mutate: updateMonthlylogin, isPending } = useUpdateMonthlylogin()
  const { data: chests } = useGetChestRewards()
  

  useEffect(() => {
    setType(prop.type)
    if(prop.type !== 'chest'){
      setAmount(formatNumberWithCommas(prop.amount))
    } else {
      setChest(prop.amount as any)
    }

  }, [prop])

  const formatNumberWithCommas = (value: number | string) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value
    if (isNaN(num)) return ''
    return new Intl.NumberFormat().format(num)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '').replace(/[^\d]/g, '')
    if (raw === '') {
      setAmount('')
      return
    }
    setAmount(formatNumberWithCommas(raw))
  }

  const updateData = async () => {
    const numericAmount = parseInt(amount?.replace(/,/g, '')) || 0
    const finalPayload = {
       day: prop.daytype,
      amount: type !== 'chest' ? numericAmount : chest,
      type: type,
    }
    updateMonthlylogin(finalPayload,
      {
        onSuccess: () => {
          toast.success(`Monthly login data updated successfully`)
        },
      }
    )
  }


  return (
    <div className='flex flex-col bg-amber-900 h-auto'>
      <div className='p-2 bg-amber-950 w-full'>
        <p className='~text-xs/sm'>Day {prop.day}</p>
      </div>

      <div className='w-full p-2 flex flex-col'>
         <p className='text-[.6rem] text-zinc-300 mt-2'>Reward</p>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-zinc-950 border-none">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coins">Coins</SelectItem>
                    <SelectItem value="crystal">Crystals</SelectItem>
                    <SelectItem value="exp">Exp</SelectItem>
                    <SelectItem value="chest">Chest</SelectItem>
                  </SelectContent>
                </Select>
        
                
        
                {type === 'chest' ? (
                 <div className=' space-y-1'>
                  <p className='text-[.6rem] text-zinc-300 mt-4'>Chest</p>
        
                  <Select value={chest} onValueChange={setChest}>
                  <SelectTrigger className="bg-zinc-950 border-none">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {chests?.data.map((item, index) => (
                    <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                    ))}
                  
                  </SelectContent>
                </Select>
        
                
                 </div>
                ) : (
                 <div className=' space-y-1'>
                  <p className='text-[.6rem] text-zinc-300 mt-4'>Amount</p>
                  <Input
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder='Amount'
                    type='text'
                    inputMode="numeric"
                    className='placeholder:text-xs'
                  />
                 </div>
                )}

        <Button disabled={isPending} onClick={updateData} className='mt-4'>
          {isPending && <Loader />}
          Save
        </Button>
      </div>
    </div>
  )
}
