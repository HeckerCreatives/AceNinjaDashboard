'use client'
import React, { useEffect, useState } from 'react'
import { ImageUp, Plus} from 'lucide-react'
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
import { AddStoreItem, addStoreItemSchema, createSeasonsSchema, CreateSeasonsSchema, CreateSkinsItems, storeItemSchema, StoreSchema, storeSkinsSchema } from '@/validation/schema'
import { useCreateSeason } from '@/client_actions/superadmin/season'
import { useAddStoreItemList, useCreateSkinsItem, useCreateStoreItem, useGetStoreItems } from '@/client_actions/superadmin/store'
import Loader from '@/components/common/Loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
  


export default function AddStoreItemData() {
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const {mutate: addStoreItemList, isPending} = useAddStoreItemList()
    const [dmg, setDmg] = useState(0)
    const [def, setDef] = useState(0)
    const [spd, setSpd] = useState(0)
    const {data} = useGetStoreItems()

    

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<AddStoreItem>({
      resolver: zodResolver(addStoreItemSchema),
    });

    const addItem = async ( data: AddStoreItem) => {
       addStoreItemList({itemid: data.item, price: data.amount
       }
       ,{
          onSuccess: () => {
            toast.success(`Item added successfully.`);
            setOpen(false)
          },
        })
     
    }

    useEffect(() => {
        reset()
    },[open])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Add Item
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto border-amber-500/80 border-[1px] overflow-y-auto max-h-[80%]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Add Item</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(addItem)} className=' text-xs flex flex-col gap-2 p-6 '>

        

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
              <label htmlFor="">Item</label>
              {/* <input type="number" placeholder='Price' className={` input ${errors.price && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('price', {valueAsNumber: true})} /> */}
              <Select onValueChange={(value) => setValue("item", value, { shouldValidate: true })}>
                <SelectTrigger className=" w-full bg-zinc-900 border-none">
                  <SelectValue placeholder="Select Item" />
                </SelectTrigger>
                <SelectContent>
                    {data?.data.map((item, index) => (
                        <SelectItem value={item.itemid}>{item.name}</SelectItem>
                    ))}
                 
                </SelectContent>
              </Select>
              {errors.item && <p className=' text-[.6em] text-red-500'>{errors.item.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
              <label htmlFor="">Price</label>
              <input type="number" placeholder='Price' className={` input ${errors.amount && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('amount', {valueAsNumber: true})} />
              {errors.amount && <p className=' text-[.6em] text-red-500'>{errors.amount.message}</p>}
            </div>

          

            

          
         


          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button disabled={isPending} className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1'>
              {isPending && <Loader/>}
              Save</button>
            {/* <button className=' bg-red-500 text-black text-xs px-8 py-2 rounded-md'>Cancel</button> */}
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
