'use client'
import React, { useEffect, useState } from 'react'
import { Pen, AlignCenter } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCode, CreateCode } from '@/validation/schema'
import { useUpdateRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useGetItemRewards } from '@/client_actions/superadmin/itemrewards'

type ItemRewards = { _id: string; name: string }
type Props = {
   code: string
  emerald: number
  coins: number
  crystal: number
  expiration: string
  id: string
  itemreward: ItemRewards[]
  type: string
}

export default function UpdateRedeemCode(prop: Props) {
  const [open, setOpen] = useState(false)
  const [exp, setExp] = useState(0)

  const [coins, setCoins] = useState(prop.coins)
  const [crystal, setCrystal] = useState(prop.crystal)
  const [itemList, setItemList] = useState<string[]>(prop.itemreward.map(i => i._id))
  const [filter, setFilter] = useState<Props['type']>(prop.type)
  const actualFilter = filter !== 'outfit' ? filter : '';


  const {data: others} = useGetItemRewards(actualFilter, filter !== 'item' ? 'unisex' : '')
  const {data: maleitems} = useGetItemRewards('outfit', 'male')
  const {data: femaleitems} = useGetItemRewards('outfit', 'female')
  const { mutate: updateCode, isPending } = useUpdateRedeemCode()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateCode>({
    resolver: zodResolver(createCode),
    defaultValues: {
      code: prop.code,
      expiration: prop.expiration.split('T')[0],
    }
  })

 useEffect(() => {
  reset({ code: prop.code, expiration: prop.expiration.split('T')[0] })
  setCoins(prop.coins)
  setCrystal(prop.crystal)
  setExp(prop.emerald) // assuming `emerald` is actually EXP in this context
  setFilter(prop.type)
  setItemList(prop.itemreward.map(i => i._id))
  if(!prop.type){
    setFilter('weapon')
  }
}, [prop, reset])


  const handleItemChange = (value: string, position?: 'male' | 'female') => {
    if (filter === 'outfit') {
      // ensure two slots
      const [first, second] = itemList
      if (position === 'male') setItemList([value, second || ''])
      else setItemList([first || '', value])
    } else {
      setItemList([value])
    }
  }

  const onSubmit = (data: CreateCode) => {
    // if (filter === 'outfit') {
    //   if (!itemList[0] || !itemList[1]) return toast.error('Please select both male and female outfit.')
    // } else {
    //   if (!itemList[0]) return toast.error('Please select an item.')
    // }

    updateCode({
      id: prop.id,
      code: data.code,
      expiry: data.expiration,
      rewards: { coins, crystal, exp },
      itemrewards: filter === 'skills' ? [] : itemList,
      skillrewards: filter === 'skills' ? itemList : [],
      status: ''
    }, {
      onSuccess: () => {
        toast.success('Code updated successfully.')
        setOpen(false)
      }
    })
  }

  console.log(prop.type)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-yellow-500 text-black p-2 rounded-md text-xs flex items-center">
        <Pen size={15} />
      </DialogTrigger>
      <DialogContent className="max-w-[800px] border-amber-500/80 border-[1px]">
        <DialogHeader className="bg-light p-3">
          <DialogTitle>Update Code</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-xs flex flex-col gap-4">
          <div className="flex flex-col gap-1 bg-light border border-amber-800 p-4 rounded-md">
            <label>Code</label>
            <input {...register('code')} className={`input ${errors.code && 'border-red-500'}`} />
            {errors.code && <p className="text-red-500 text-[.6em]">{errors.code.message}</p>}
          </div>

          <div className="flex flex-col gap-1 bg-light border border-amber-800 p-4 rounded-md">
            <label>Rewards</label>

            <label>Coins</label>
            <input type="number" value={coins} onChange={e => setCoins(e.target.valueAsNumber)} className="input" />

            <label>Crystal</label>
            <input type="number" value={crystal} onChange={e => setCrystal(e.target.valueAsNumber)} className="input" />

            <label>EXP</label>
            <input type="number" value={exp} onChange={e => setExp(e.target.valueAsNumber)} className="input" />
          </div>


          <div className="bg-light border border-amber-800 p-4 flex flex-col gap-2 rounded-md">
            <label>Select Item</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-amber-800 text-xs px-3 py-1 rounded-sm flex items-center gap-1 w-fit">
                <AlignCenter size={15} /> Type : {filter}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-amber-800">
                <DropdownMenuLabel className='text-xs'>Select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['outfit','weapon','skills','item'].map(t => (
                  <DropdownMenuItem key={t} className={`text-xs ${filter===t?'text-yellow-500':''}`} onClick={() => setFilter(t as any)}>
                    {t.charAt(0).toUpperCase()+t.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {filter === 'outfit' ? (
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label>Male</label>
                  <Select value={itemList[0]} onValueChange={v => handleItemChange(v, 'male')}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>{maleitems?.data.items.map(i => <SelectItem key={i.itemid} value={i.itemid}>{i.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label>Female</label>
                  <Select value={itemList[1]} onValueChange={v => handleItemChange(v, 'female')}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>{femaleitems?.data.items.map(i => <SelectItem key={i.itemid} value={i.itemid}>{i.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <label>{filter?.charAt(0).toUpperCase() + filter?.slice(1)}</label>
                <Select value={itemList[0]} onValueChange={v => handleItemChange(v)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{others?.data.items.map(i => <SelectItem key={i.itemid} value={i.itemid}>{i.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 bg-light border border-amber-800 p-4 rounded-md">
            <label>Expiration</label>
            <input type="date" {...register('expiration')} className={`input ${errors.expiration && 'border-red-500'}`} />
            {errors.expiration && <p className="text-red-500 text-[.6em]">{errors.expiration.message}</p>}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="submit" disabled={isPending} className="bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center">
              {isPending && <Loader />} Save
            </button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}
