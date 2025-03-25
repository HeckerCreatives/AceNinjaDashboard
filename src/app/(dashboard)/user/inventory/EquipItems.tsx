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
import { useEquipItem } from '@/client_actions/user/inventory'
import useCharacterStore from '@/hooks/character'
import Loader from '@/components/common/Loader'

type Data = {
    itemid: string
}
export default function EquipItems(data: Data) {
    const {mutate: equipItem, isPending} = useEquipItem()
    const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
    const [itemid, setItemid] = useState('')

    const equipItems = () => {
      equipItem({ characterid: characterid, itemid: data.itemid },{
        onSuccess: () => {
          toast.success('Successfully equiped.');
        }
      })
    }
    
  return (
    <Dialog>
    <DialogTrigger>
        <Button>Equip</Button>

    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto p-6'>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure, you want to equip this item?</DialogTitle>
        <DialogDescription>
          {/* This action cannot be undone. This will permanently delete your account
          and remove your data from our servers. */}
        </DialogDescription>
      </DialogHeader>
      <div className=' w-full flex items-end justify-end'>
        <Button onClick={equipItems}>
            {isPending && <Loader/>}
            Continue</Button>
      </div>
    </DialogContent>
  </Dialog>

  )
}
