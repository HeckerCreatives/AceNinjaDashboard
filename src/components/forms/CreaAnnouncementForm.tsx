'use client'
import React, { useEffect, useState } from 'react'
import { ImageUp } from 'lucide-react'
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
import { createAnnouncement, CreateAnnouncement} from '@/schema/schema'

type Prop = {
    children: React.ReactNode
}

export default function CreateAnnouncementForm( prop: Prop) {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)

    //create announcement validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateAnnouncement>({
      resolver: zodResolver(createAnnouncement),
    });

    //create announcement
    const createWebsiteNews = async ( data: CreateAnnouncement) => {
      console.log(data)
     
    }

    //reset form value
    useEffect(() => {
        reset()
    },[open])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger>
      {prop.children}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Announcement</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createWebsiteNews)} className=' text-xs mt-4 flex flex-col'>
          <label htmlFor="">Title</label>
          <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
          {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}


          <label htmlFor="" className=' mt-4'>Description</label>
          <textarea placeholder='Title' className={` input h-[120px] ${errors.description && 'border-[1px] focus:outline-none border-red-500'}`} {...register('description')} />
          {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}


          <Tabs defaultValue="image" className="w-full mt-6">
            <TabsList className=' text-xs'>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
            </TabsList>
            <TabsContent value="image">
              <div className=' w-full h-[200px] bg-zinc-900 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-md'>
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
            </TabsContent>
            <TabsContent value="video">
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
            </TabsContent>
          </Tabs>



          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button className=' active-gradient px-6 py-2 rounded-md'>Save</button>
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
