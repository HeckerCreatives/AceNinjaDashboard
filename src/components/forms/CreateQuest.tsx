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
import { createNewsData, CreateNewsData } from '@/validation/schema'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const tabs = [
  'Image',
  'Video',
]

export default function CreateQuestForm() {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')

    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateNewsData>({
      resolver: zodResolver(createNewsData),
    });

    //create news
    const createWebsiteNews = async ( data: CreateNewsData) => {
      console.log(data)
     
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
        <DialogTitle className=' text-sm'>Create Quest</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createWebsiteNews)} className=' text-xs flex flex-col gap-2 ~p-2/6'>

        <div className=' w-full flex items-center gap-4'>
            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Quest Title</label>
            <input type="text" placeholder='Quest Name' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500 '} text-xs `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

           
        </div>

        <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Quest Description</label>
            <textarea placeholder='Description' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} text-xs h-[100px] `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

        <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Enemy (optional)</label>
            {/* <input type="text" placeholder='Select' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} /> */}
            <Select onValueChange={(value) => setValue("title", value, { shouldValidate: true })}>
              <SelectTrigger className="bg-zinc-950 border-none">
                  <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="boss">Boss</SelectItem>
                  <SelectItem value="player">Player</SelectItem>
              </SelectContent>
              </Select>
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
        </div>

        <div className=' w-full flex items-center gap-4'>
            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Quest Type</label>
            {/* <input type="text" placeholder='Quest Type' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} /> */}
             <Select onValueChange={(value) => setValue("title", value, { shouldValidate: true })}>
              <SelectTrigger className="bg-zinc-950 border-none">
                  <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="mainquest">Main Quest</SelectItem>
                  <SelectItem value="sidequest">Side Quest</SelectItem>
                  <SelectItem value="pvpquest">Pvp Quest</SelectItem>
                  
              </SelectContent>
              </Select>
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Reward Type</label>
            {/* <input type="text" placeholder='Reward Type' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} /> */}
            <Select onValueChange={(value) => setValue("title", value, { shouldValidate: true })}>
              <SelectTrigger className="bg-zinc-950 border-none">
                  <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="xp">XP</SelectItem>
                  <SelectItem value="coin">Coins</SelectItem>
                  <SelectItem value="crystal">Crystal</SelectItem>
                  
              </SelectContent>
              </Select>
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

         
        </div>

        <div className=' w-full flex items-center gap-4'>
            {/* <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Select Currency Type</label>
            <input type="text" placeholder='Select' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div> */}

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Reward Amount</label>
            <input type="text" placeholder='Amount' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

         
        </div>

    
          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md'>Save</button>
            <button className=' bg-red-500 text-black text-xs px-8 py-2 rounded-md'>Cancel</button>
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
