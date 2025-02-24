'use client'
import React, { useEffect, useState } from 'react'
import { Plus} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCode, CreateCode } from '@/schema/schema'


export default function CreateCodesFrom() {
    const [open, setOpen] = useState(false)

    //validation
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
    
      // create codes
      const createRedeemcode = async ( data: CreateCode) => {
        console.log(data)
       
      }
    
      console.log(errors)

      //reset form
      useEffect(() => {
        reset()
      },[open])


  return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <button className=' active-gradient px-4 py-2 text-xs flex items-center gap-1'><Plus size={15}/>Create Codes</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Code</DialogTitle>
                <DialogDescription>
                
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(createRedeemcode)} className=' text-xs mt-4 flex flex-col'>
                  <label htmlFor="">Code</label>
                  <input type="text" placeholder='Code' className={` input ${errors.code && 'border-[1px] focus:outline-none border-red-500'} `} {...register('code')} />
                  {errors.code && <p className=' text-[.6em] text-red-500'>{errors.code.message}</p>}


                  <label htmlFor="" className=' mt-4'>Rewards</label>
                  <input type="text" placeholder='Rewards' className={` input ${errors.rewards && 'border-[1px] focus:outline-none border-red-500'} `} {...register('rewards')} />
                  {errors.rewards && <p className=' text-[.6em] text-red-500'>{errors.rewards.message}</p>}


                  <label htmlFor="" className=' mt-4'>Expiration</label>
                  <input type="date"  className={` input ${errors.rewards && 'border-[1px] focus:outline-none border-red-500'} `} {...register('expiration')} />
                  {errors.expiration && <p className=' text-[.6em] text-red-500'>{errors.expiration.message}</p>}

                  

                  <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
                    {/* <button className=' bg-zinc-800 px-6 py-2 rounded-md'>Cancel</button> */}
                    <button className=' active-gradient px-6 py-2 rounded-md'>Save</button>

                  </div>


                </form>
            </DialogContent>
    </Dialog>
  )
}
