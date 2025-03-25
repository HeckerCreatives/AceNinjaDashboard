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
import { createCode, CreateCode } from '@/validation/schema'
import { useAddRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'



const tabs = [
  'Image',
  'Video',
]

export default function CreateQuestForm() {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')
    const {mutate: addRedeemCode, isPending} = useAddRedeemCode()

    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateCode>({
      resolver: zodResolver(createCode),
    });

    //create news
    const createRedeemcodes = async ( data: CreateCode) => {
      addRedeemCode({code: data.code, description: data.description, status: 'active', expiry: data.expiration, rewards: data.rewards},{
        onSuccess: () => {
          toast.success(`Redeem code created successfully.`);
        },
      })
     
    }

    //reset form value
    useEffect(() => {
        reset()
    },[open])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Create
    </DialogTrigger>
    <DialogContent className=' max-w-[800px] h-auto border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Codes</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createRedeemcodes)} className=' text-xs flex flex-col gap-2 p-6'>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Code</label>
            <input type="text" placeholder='Code' className={` input ${errors.code && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('code')} />
            {errors.code && <p className=' text-[.6em] text-red-500'>{errors.code.message}</p>}
            </div>

            {/* <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Title</label>
            <textarea placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div> */}

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Description</label>
            <textarea placeholder='Description' className={` input ${errors.description && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('description')} />
            {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Rewards</label>
            <input type="text" placeholder='Rewards' className={` input ${errors.rewards && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('rewards')} />
            {errors.rewards && <p className=' text-[.6em] text-red-500'>{errors.rewards.message}</p>}
            </div>


            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Expiration</label>
            <input type="date" placeholder='Expiration' className={` input ${errors.expiration && 'border-[1px] focus:outline-none border-red-500'} `} {...register('expiration')} />
            {errors.expiration && <p className=' text-[.6em] text-red-500'>{errors.expiration.message}</p>}
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
