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
import { useUpdateDailySpin } from '@/client_actions/superadmin/rewards'
import toast from 'react-hot-toast'
import Loader from './Loader'

type Props = {
  amount: number,
  type: string,
  slot: number,
  chance: number
}

export default function DailySpincard(prop: Props) {
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [chance, setChance] = useState('')
  const { mutate: updateDailySpin, isPending } = useUpdateDailySpin()

  useEffect(() => {
    setType(prop.type)
    setAmount(formatNumberWithCommas(prop.amount))
    setChance(formatNumberWithCommas(prop.chance))
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

  const handleChanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value

  const cleaned = rawValue.replace(/[^0-9.]/g, '')

  const parts = cleaned.split('.')
  let sanitized = parts[0]
  if (parts.length > 1) {
    sanitized += '.' + parts[1].slice(0, 2)
  }

  setChance(rawValue)
}

  const updateData = async () => {
    const numericAmount = parseInt(amount.replace(/,/g, '')) || 0
  

    updateDailySpin(
      {
        slot: prop.slot,
        amount: numericAmount,
        type: type,
        chance: Number(chance),
      },
      {
        onSuccess: () => {
          toast.success(`Daily spin slot data updated successfully`)
        },
      }
    )
  }

  return (
    <div className='flex flex-col bg-amber-900 h-auto'>
      <div className='p-2 bg-amber-950 w-full'>
        <p className='~text-xs/sm'>Slot {prop.slot}</p>
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
          </SelectContent>
        </Select>

        <p className='text-[.6rem] text-zinc-300 mt-4'>Amount</p>
        <Input
          value={amount}
          onChange={handleAmountChange}
          placeholder='Amount'
          type='text'
          inputMode='numeric'
          className='placeholder:text-xs'
        />

        <p className='text-[.6rem] text-zinc-300 mt-4'>Spin Chance (%)</p>
        <Input
          value={chance}
          onChange={handleChanceChange}
          placeholder='Chance'
          type='text'
          inputMode='numeric'
          className='placeholder:text-xs'
        />

        <Button disabled={isPending} onClick={updateData} className='mt-4'>
          {isPending && <Loader />}
          Save
        </Button>
      </div>
    </div>
  )
}
