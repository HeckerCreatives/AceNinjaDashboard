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
import { useCreateNews, useEditNews } from '@/client_actions/superadmin/website'
import { createNewsData, CreateNewsData, editNewsdata, EditNewsData } from '@/validation/schema'
import toast from 'react-hot-toast'
import { Input } from '../ui/input'
import { url } from 'inspector'
import { useEditAnnouncement } from '@/client_actions/superadmin/announcement'


const tabs = [
  'image',
  'video',
]

type Props = {
    title: string
    content: string
    type: string
    url: string
    id: string
}

export default function EditAnnoucement(prop: Props) {
    const [image, setImage] = useState('')
       const [preview, setPreview] = useState(
            prop.url ? `${process.env.NEXT_PUBLIC_API_URL}/${prop.url}` : null
          );
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('')
    const {mutate: editAnnouncement, isPending} = useEditAnnouncement()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null
    
        setValue("file", file, { shouldValidate: true })
    
        setPreview(file ? URL.createObjectURL(file) : null)
      }

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<EditNewsData>({
      resolver: zodResolver(editNewsdata),
      defaultValues: ({
        title: prop.title,
        description: prop.content,
        file: prop.url || undefined
      
      })
    });

    //create news
    const editNewsDatas = async ( data: EditNewsData) => {
      editAnnouncement({id:prop.id,title: data.title, content: data.description, contentType: tab.toLowerCase(), url: data.file ?? ''},{
        onSuccess: () => {
          toast.success(`Announcement updated successfully`);
          setOpen(false)
        },
      })
     
    }  


    useEffect(() => {
        reset({
          title: prop.title,
          description: prop.content,
          file:  prop.url || undefined , 
        });
    
      }, [tab, prop, reset]);

    useEffect(() => {
        setTab(prop.type)

    },[])
      
   
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-white p-1 rounded-sm flex items-center w-fit text-xs font-semibold'>
    <Pen size={15}/>
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Edit Announcement</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(editNewsDatas)} className=' text-xs flex flex-col p-6'>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Title</label>
          <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
          {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
        </div>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px] mt-4'>
          <label htmlFor="" className=''>Description</label>
          <textarea placeholder='Title' className={` input h-[80px] ${errors.description && 'border-[1px] focus:outline-none border-red-500'}`} {...register('description')} />
          {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
        </div>

        <div className=' flex items-center gap-[1px] mt-4 mb-1'>
            {tabs.map((item, index) => (
            <p onClick={() => setTab(item)} key={index} className={` uppercase cursor-pointer transition-all duration-300  text-center w-[110px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</p>

            ))}
        </div>

        {tab === 'image' ? (

          <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden'>
            <div className=' w-full aspect-video overflow-hidden bg-zinc-900 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-md '>
              <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                <div className=' w-full h-full flex flex-col items-center justify-center gap-2 text-xs'>
                 {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                    <>
                        <ImageUp size={25} />
                        <p>Click to upload</p>
                        <p>PNG or JPG (MAX. 5MB)</p>
                    </>
                    )}
                </div>
                <input
                    type="file"
                    id="dropzone-file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    {...register("file")}
                    onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
        ):(

          <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden'>
            <div className=' w-fullh-auto bg-zinc-900 flex items-center justify-center border-zinc-700 rounded-md'>
           <Input placeholder='Video url' className=' text-xs placeholder:text-xs' {...register('file')}/>
          </div>
          </div>
          
        )}
          {errors.file && <p className=' text-[.6em] text-red-500'>{errors.file.message}</p>}

          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md'>Save</button>
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
