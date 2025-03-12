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
import { createNews, CreateNews } from '@/validation/schema'


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
    } = useForm<CreateNews>({
      resolver: zodResolver(createNews),
    });

    //create news
    const createWebsiteNews = async ( data: CreateNews) => {
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
            <label htmlFor="">Quest Name</label>
            <input type="text" placeholder='Quest Name' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Enemy Id</label>
            <input type="text" placeholder='Enemy Id' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

         
        </div>

        <div className=' w-full flex items-center gap-4'>
            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Quest Type</label>
            <input type="text" placeholder='Quest Type' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Reward Type</label>
            <input type="text" placeholder='Reward Type' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

         
        </div>

        <div className=' w-full flex items-center gap-4'>
            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Goal</label>
            <input type="text" placeholder='Goal' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Reward Quantity</label>
            <input type="text" placeholder='Reward Quantity' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
            {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
            </div>

         
        </div>

    

        <div className=' flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px] mt-2'>
          <label htmlFor="" className=''>Description</label>
          <textarea placeholder='Title' className={` input h-[120px] ${errors.description && 'border-[1px] focus:outline-none border-red-500'}`} {...register('description')} />
          {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
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
