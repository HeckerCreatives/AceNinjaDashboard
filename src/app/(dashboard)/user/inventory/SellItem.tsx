'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useEquipItem, useSellItem } from '@/client_actions/user/inventory'
import useCharacterStore from '@/hooks/character'
import Loader from '@/components/common/Loader'

type Data = {
    itemid: string
}
export default function SellItems(data: Data) {
    const {mutate: sellItem, isPending} = useSellItem()
    const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
    const [itemid, setItemid] = useState('')

    const sellItems = () => {
        sellItem({ characterid: characterid, itemid: data.itemid, quantity: 1 },{
        onSuccess: () => {
          toast.success('Successfully sell.');
        }
      })
    }
    
  return (
    <Dialog>
    <DialogTrigger>
        <Button>Sell</Button>

    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto p-6'>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure, you want to sell this item?</DialogTitle>
        <DialogDescription>
          {/* This action cannot be undone. This will permanently delete your account
          and remove your data from our servers. */}
        </DialogDescription>
      </DialogHeader>
      <div className=' w-full flex items-end justify-end'>
        <Button onClick={sellItems}>
             {isPending && <Loader/>}
            Continue</Button>
      </div>
    </DialogContent>
  </Dialog>

  )
}
