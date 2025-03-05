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
import { createNews, CreateNews } from '@/schema/schema'


const tabs = [
  'Image',
  'Video',
]

export default function CreateNewsForm() {
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
    <DialogContent className=' max-w-[800px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create News</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createWebsiteNews)} className=' text-xs flex flex-col p-6'>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Title</label>
          <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
          {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
        </div>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px] mt-4'>
          <label htmlFor="" className=''>Description</label>
          <textarea placeholder='Title' className={` input h-[120px] ${errors.description && 'border-[1px] focus:outline-none border-red-500'}`} {...register('description')} />
          {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
        </div>

        <div className=' flex items-center gap-[1px] mt-4 mb-1'>
            {tabs.map((item, index) => (
            <p onClick={() => setTab(item)} key={index} className={` cursor-pointer transition-all duration-300  text-center w-[110px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</p>

            ))}
        </div>

        {tab === 'Image' ? (

          <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden'>
            <div className=' w-full h-[200px] bg-zinc-900 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-md '>
              <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                <div className=' w-full h-full flex flex-col items-center justify-center gap-2 text-xs'>
                  <ImageUp size={25}/>
                  <p>Click to upload</p>
                  <p>SPNG or JPG (MAX. 5mb)</p>

                  <p className=' text-zinc-400 mt-4'>{image}</p>
                </div>

                
                <input value={image} type="file" id='dropzone-file'  className=' hidden'/>
              </label>
            </div>
          </div>
          
        ):(

          <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden'>
            <div className=' w-full h-[200px] bg-zinc-900 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-md'>
            <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

              <div className=' w-full h-full flex flex-col items-center justify-center gap-2 text-xs'>
                <ImageUp size={25}/>
                <p>Click to upload</p>
                <p>MP4 (MAX. 20mb)</p>

                <p className=' text-zinc-400 mt-4'>{image}</p>
              </div>

              
              <input value={image} onChange={(e) => setImage(e.target.value)} type="file" id='dropzone-file'  className=' hidden'/>
            </label>
          </div>
          </div>
          
        )}
          

      


          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md'>Save</button>
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
