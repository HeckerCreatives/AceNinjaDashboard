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
import { useCreateNews } from '@/client_actions/superadmin/website'
import { CreateAnnouncementData, createAnnouncementDataSchema, createNewsData, CreateNewsData } from '@/validation/schema'
import toast from 'react-hot-toast'
import { Input } from '../ui/input'
import { useCreateAnnouncement } from '@/client_actions/superadmin/announcement'


const tabs = [
  'Image',
  'Video',
]

type Props = {
  type: string
}
export default function CreateAnnoucement(prop: Props) {
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')
    const {mutate: createAnnouncement, isPending} = useCreateAnnouncement()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
    
      if (!file) return;
    
      const img = new Image();
      const reader = new FileReader();
    
      reader.onload = (e) => {
        if (!e.target?.result) return;
    
        img.src = e.target.result as string;
    
        img.onload = () => {
          const { width, height } = img;
          const is16By9 = Math.abs(width / height - 16 / 9) < 0.01; // small margin for float errors
          const isHD = width >= 1280 && height >= 720;
    
          if (!isHD || !is16By9) {
            toast.error("Image must be at least HD (1280x720) and in 16:9 aspect ratio");
            return;
          }
    
          setPreview(URL.createObjectURL(file));
          setValue("file", file);
          trigger("file");
        };
      };
    
      reader.readAsDataURL(file);
    };
    

    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateAnnouncementData>({
      resolver: zodResolver(createAnnouncementDataSchema),
    });

    //create news
    const createAnnouncementData = async ( data: CreateAnnouncementData) => {
      createAnnouncement({title: data.title, content: data.description, contentType: tab.toLowerCase(), url: data.file ?? '', announcementtype: prop.type},{
        onSuccess: () => {
          toast.success(`Announcement created successfully`);
          setOpen(false)
          setPreview(null)
        },
      })
     
    }

    //reset form value
    useEffect(() => {
        reset()
    },[open])

    useEffect(() => {
      reset({
        file: ''
      })
    },[tab])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Create
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Announcement</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createAnnouncementData)} className=' text-xs flex flex-col p-6'>

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
            <p onClick={() => setTab(item)} key={index} className={` cursor-pointer transition-all duration-300  text-center w-[110px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</p>

            ))}
        </div>

        {tab === 'Image' ? (

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
