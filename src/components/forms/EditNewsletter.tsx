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
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {  createNewsLetter, CreateNewsLetter } from '@/validation/schema'
import { useCreateNewsletter, useEditNewsletter } from '@/client_actions/superadmin/newsletter'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'

type Props = {
    title: string
    description: string
    id: string
    banner: string
}

export default function EditNewsletterForm( prop: Props) {
    const [preview, setPreview] = useState(
        prop.banner ? `${process.env.NEXT_PUBLIC_API_URL}/${prop.banner}` : null
      );
    const [open, setOpen] = useState(false)
    const {mutate: editNewsletter, isPending} = useEditNewsletter()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setValue("file", file);
          setPreview(URL.createObjectURL(file));
        }
      };

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateNewsLetter>({
      resolver: zodResolver(createNewsLetter),
      defaultValues:({
        title: prop.title,
        description: prop.description
      })
    });

    const editNewsletterdata = async ( data: CreateNewsLetter) => {
      editNewsletter({newsletterid: prop.id,title: data.title, description: data.description, bannerimg: data.file}, {
        onSuccess: () => {
            toast.success(`News letter created successfully`);
              setOpen(false)
              setPreview(null)
              reset()
          },
      })
     
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className='  flex items-center gap-1 bg-yellow-600 p-1 rounded-sm text-xs'>
    <Pen size={13}/>
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Edit Newsletter</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(editNewsletterdata)} className=' text-xs flex flex-col p-4'>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Title</label>
          <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
          {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
        </div>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px] mt-2'>
          <label htmlFor="" className=''>Description</label>
          <textarea placeholder='Description' className={` whitespace-pre-wrap input h-[80px] ${errors.description && 'border-[1px] focus:outline-none border-red-500'}`} {...register('description')} />
          {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
        </div>

      
          <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden mt-2'>
            <label htmlFor="" className=''>Banner</label>

            <div className=' w-full aspect-video bg-zinc-900 flex items-center justify-center mt-2 border-2 border-dashed border-zinc-700 rounded-md '>
              <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                <div className=' w-full aspect-video flex flex-col items-center justify-center gap-2 text-xs cursor-pointer overflow-hidden'>
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

          {errors.file && <p className=' text-[.6em] text-red-500'>{errors.file.message}</p>}

          </div>
     

          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button disabled={isPending} className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1'>
                {isPending && <Loader/>}
                Save</button>
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
