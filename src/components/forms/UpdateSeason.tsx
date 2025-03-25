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
import Loader from '../common/Loader'
import { createSeasonsSchema, CreateSeasonsSchema } from '@/validation/schema'
import { useCreateSeason, useUpdateSeason } from '@/client_actions/superadmin/season'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

type Props = {
    id: string
    title: string
    duration: number
    status: string
}

export default function UpdateSeasons( prop: Props) {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')
    const {mutate: updateSeason, isPending} = useUpdateSeason()
    const [status, setStatus] = useState('')


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
      defaultValues:({
        title: prop.title,
        duration: prop.duration
      })
    });

    //create news
    const updateSeasonData = async ( data: CreateSeasonsSchema) => {
        updateSeason({id: prop.id ,title: data.title, duration: data.duration, isActive: status},{
        onSuccess: () => {
          toast.success(`Season updated successfully.`);
          setOpen(false)
        },
      })
     
    }

    //reset form value
    useEffect(() => {
        reset({
            title: prop.title,
            duration: prop.duration
        })
        setStatus(prop.status)
    },[prop])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-white p-1 rounded-sm flex items-center w-fit text-xs font-semibold'>
    <Pen size={15}/>
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Edit Season</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(updateSeasonData)} className=' text-xs flex flex-col gap-2 p-6'>

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

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Status</label>
            <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
            </Select>
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
