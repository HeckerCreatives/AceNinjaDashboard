'use client'
import React, { useEffect, useState } from 'react'
import { ImageUp, Pen, Plus} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import { createSeasonsSchema, CreateSeasonsSchema, CreateSkinsItems, storeItemSchema, StoreSchema, storeSkinsSchema } from '@/validation/schema'
import { useCreateSeason } from '@/client_actions/superadmin/season'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCreateSkinsItem, useCreateStoreItem } from '@/client_actions/superadmin/store'
import Loader from '@/components/common/Loader'
import { useUpdateFreebie } from '@/client_actions/superadmin/freebie'
  
interface Props {
    itemid: string
    description: string
    amount: number
    exp: number
    coins: number
    crystal: number
}

export default function EditFreebieForm(prop: Props) {
  const [open, setOpen] = useState(false)
  const {mutate: updateFreebie, isPending} = useUpdateFreebie()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)


  const updateFrebieDetails = async () => {
    updateFreebie({
     itemid: prop.itemid,
     description: description,
     amount: amount
    },{
       onSuccess: () => {
         toast.success(`Frebbie updated successfully.`);
         setOpen(false)
       },
     })
   
  }

  useEffect(() => {
    setDescription(prop.description)
    if (prop.exp !== 0) {
      setAmount(prop.exp)
    } else if (prop.coins !== 0) {
      setAmount(prop.coins);
    } else if (prop.crystal !== 0) {
      setAmount(prop.crystal);
    } else {
      setAmount(0);
    }
  },[prop])

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black p-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Pen size={15}/>
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto border-amber-500/80 border-[1px] overflow-y-auto max-h-[80%]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Edit Freebie</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <div  className=' text-xs flex flex-col gap-2 p-6 '>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
                <label htmlFor="">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className={` input text-xs `}/>
            </div>

             <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
                <label htmlFor="">Reward Amount</label>
                <input value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)}   placeholder='Amount' type='number' className={` input text-xs `}/>
            </div>

            <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
                <button onClick={updateFrebieDetails} disabled={isPending} className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1'>
                {isPending && <Loader/>}
                Save</button>
                {/* <button className=' bg-red-500 text-black text-xs px-8 py-2 rounded-md'>Cancel</button> */}
            </div>


         </div>
    </DialogContent>
    </Dialog>
  )
}
