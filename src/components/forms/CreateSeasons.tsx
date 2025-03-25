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
import Loader from '../common/Loader'
import { createSeasonsSchema, CreateSeasonsSchema } from '@/validation/schema'
import { useCreateSeason } from '@/client_actions/superadmin/season'


export default function CreateSeasons() {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')
    const {mutate: createSeason, isPending} = useCreateSeason()

    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateSeasonsSchema>({
      resolver: zodResolver(createSeasonsSchema),
    });

    //create news
    const createSeasonData = async ( data: CreateSeasonsSchema) => {
      createSeason({title: data.title, duration: data.duration},{
        onSuccess: () => {
          toast.success(`Season created successfully.`);
          setOpen(false)
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
    <DialogContent className=' max-w-[600px] h-auto border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Season</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createSeasonData)} className=' text-xs flex flex-col gap-2 p-6'>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Title</label>
            <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

     
            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Duration</label>
            <input type="number" placeholder='Duration' className={` input ${errors.duration && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('duration',{valueAsNumber: true})} />
            {errors.duration && <p className=' text-[.6em] text-red-500'>{errors.duration.message}</p>}
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
