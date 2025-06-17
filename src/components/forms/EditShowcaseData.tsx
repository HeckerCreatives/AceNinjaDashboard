'use client'
import React, { useEffect, useState } from 'react'
import { Pen, AlignCenter } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateShowcaseItem, createShowcaseSchema } from '@/validation/schema'
import toast from 'react-hot-toast'
import { useGetItemRewards } from '@/client_actions/superadmin/itemrewards'
import { useEditShowcaseItem } from '@/client_actions/superadmin/news'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Loader from '../common/Loader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  id: string;
  title: string;
  itemtype: string; // 'outfit' | 'weapon'
  items: { itemid: string; itemtype: string }[];
}

export default function EditShowcaseForm({ id, title, itemtype, items }: Props) {
  const [open, setOpen] = useState(false)
  const [male, setMale] = useState('')
  const [female, setFemale] = useState('')
  const [weapon, setWeapon] = useState('')
  const [filter, setFilter] = useState(itemtype)

  const { mutate: editShowcaseItem, isPending } = useEditShowcaseItem()
  const { data: maleItems } = useGetItemRewards('outfit', 'male')
  const { data: femaleItems } = useGetItemRewards('outfit', 'female')
  const { data: weapons } = useGetItemRewards('weapon', 'unisex')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateShowcaseItem>({
    resolver: zodResolver(createShowcaseSchema),
  })

  useEffect(() => {
    if (open) {
      if (filter === 'outfit') {
        const [first, second] = items.filter(i => i.itemtype === 'outfit')
        setMale(first?.itemid || '')
        setFemale(second?.itemid || '')
      } else if (filter === 'weapon') {
        const weaponItem = items.find(i => i.itemtype === 'weapon')
        setWeapon(weaponItem?.itemid || '')
      }
      reset({ title })
    }
  }, [open, reset, title, filter, items])

  useEffect(() => {
    // Clear values when item type changes
    setMale('')
    setFemale('')
    setWeapon('')
  }, [filter])

  const onSubmit = (data: CreateShowcaseItem) => {
    let itemList: { itemid: string; itemtype: string }[] = []

    if (filter === 'weapon') {
      if (!weapon) {
        toast.error('Please select a weapon.')
        return
      }
      itemList = [{ itemid: weapon, itemtype: 'weapon' }]
    } else if (filter === 'outfit') {
      if (!male || !female) {
        toast.error('Please select both male and female outfits.')
        return
      }
      itemList = [
        { itemid: male, itemtype: 'outfit' },
        { itemid: female, itemtype: 'outfit' }
      ]
    }

    editShowcaseItem({
      id,
      title: data.title,
      itemtype: filter,
      items: itemList,
    }, {
      onSuccess: () => {
        toast.success('Showcase item updated successfully')
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-1 bg-yellow-600 p-1 rounded-sm text-xs">
        <Pen size={15} />
      </DialogTrigger>
      <DialogContent className='max-w-[600px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
        <DialogHeader className='w-full bg-light p-3'>
          <DialogTitle className='text-sm'>Edit Showcase Item</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='text-xs flex flex-col gap-2 p-6'>

          <div className='flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder='Title'
              className={`input ${errors.title && 'border-[1px] border-red-500'}`}
              {...register('title')}
            />
            {errors.title && <p className='text-[.6em] text-red-500'>{errors.title.message}</p>}
          </div>

          <div className='flex flex-col items-start gap-4 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <DropdownMenu>
              <DropdownMenuTrigger className='bg-amber-800 px-3 py-1 rounded-sm flex items-center gap-1'>
                <AlignCenter size={15} />Type : {filter}
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-amber-800'>
                <DropdownMenuLabel className='text-xs'>Select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={`text-xs cursor-pointer ${filter === 'outfit' && 'text-yellow-500'}`}
                  onClick={() => setFilter('outfit')}
                >
                  Outfit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-xs cursor-pointer ${filter === 'weapon' && 'text-yellow-500'}`}
                  onClick={() => setFilter('weapon')}
                >
                  Weapon
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {filter === 'weapon' ? (
              <div className='flex flex-col gap-2 w-full'>
                <label>Weapon</label>
                <Select value={weapon} onValueChange={setWeapon}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Weapon" />
                  </SelectTrigger>
                  <SelectContent>
                    {weapons?.data.items.map((item, index) => (
                      <SelectItem key={index} value={item.itemid}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className='flex items-center gap-4 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                  <label>Male</label>
                  <Select value={male} onValueChange={setMale}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Male Outfit" />
                    </SelectTrigger>
                    <SelectContent>
                      {maleItems?.data.items.map((item, index) => (
                        <SelectItem key={index} value={item.itemid}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                  <label>Female</label>
                  <Select value={female} onValueChange={setFemale}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Female Outfit" />
                    </SelectTrigger>
                    <SelectContent>
                      {femaleItems?.data.items.map((item, index) => (
                        <SelectItem key={index} value={item.itemid}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className='w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button
              type="submit"
              disabled={isPending}
              className="bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1"
            >
              {isPending && <Loader />}
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
