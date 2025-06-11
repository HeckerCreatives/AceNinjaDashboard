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
import { useCreateNews } from '@/client_actions/superadmin/website'
import { createNewsData, CreateNewsData, CreateShowcaseItem, createShowcaseSchema } from '@/validation/schema'
import toast from 'react-hot-toast'
import { Input } from '../ui/input'
import { useGetAllItems, useGetItemsAdmin } from '@/client_actions/superadmin/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreateShowcaseItem, useEditShowcaseItem } from '@/client_actions/superadmin/news'
import { string } from 'zod'
import { title } from 'process'


const tabs = [
  'Image',
  'Video',
]

interface Props {
    itemid: string,
    itemtype: string,
    title: string,
    id: string
}

export default function EditShowcaseForm( prop: Props) {
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')
    const {mutate: editShowcaseItem, isPending} = useEditShowcaseItem()
    const {data, isLoading} = useGetAllItems(['skills'])


  
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateShowcaseItem>({
      resolver: zodResolver(createShowcaseSchema),
    });

    const editShowcaseData = async ( data: CreateShowcaseItem) => {
      editShowcaseItem({id: prop.id ,title: data.title, itemid: data.itemid, itemtype: data.itemtype},{
        onSuccess: () => {
          toast.success(`Showcase item updated successfully`);
          setOpen(false)
        },
      })
     
    }

    //reset form value
    useEffect(() => {
        reset()
    },[open])

    useEffect(() => {
        if(prop){
            reset({
                itemid: prop.itemid,
                title: prop.title,
                itemtype: prop.itemtype
            })
        } 
    }, [prop])

    console.log(errors)

 
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center gap-1 bg-yellow-600 p-1 rounded-sm text-xs">
        <Pen size={15} />
      </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Edit Showcase Item</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(editShowcaseData)} className=' text-xs flex flex-col gap-2 p-6'>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Title</label>
          <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
          {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
        </div>

         <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Item</label>
          <Select defaultValue={prop.itemid} onValueChange={(value) => setValue("itemid", value, { shouldValidate: true })}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Item" />
            </SelectTrigger>
            <SelectContent>
                {data?.data.items.map((item, index) => (
                <SelectItem value={item.itemid}>{item.name}</SelectItem>
                ))}
                
            </SelectContent>
            </Select>
          {errors.itemid && <p className=' text-[.6em] text-red-500'>{errors.itemid.message}</p>}
        </div>

         <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Item Type</label>
          <Select  defaultValue={prop.itemtype} onValueChange={(value) => setValue("itemtype", value, { shouldValidate: true })}>
            <SelectTrigger className="w-full bg-zinc-900 border-none">
                <SelectValue placeholder="Select Item Type" />
            </SelectTrigger>
            <SelectContent>
           
                <SelectItem value="skins">Skin</SelectItem>
                <SelectItem value="skills">Skill</SelectItem>
                <SelectItem value="goldpacks">Gold Pack</SelectItem>
                <SelectItem value="crystalpacks">Crystal Pack</SelectItem>
                <SelectItem value="chests">Chest</SelectItem>
                <SelectItem value="freebie">Freebie</SelectItem>
            </SelectContent>
            </Select>
          {errors.itemtype && <p className=' text-[.6em] text-red-500'>{errors.itemtype.message}</p>}
        </div>

        <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
          <button className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md'>Save</button>
        </div>


        </form>
    </DialogContent>
    </Dialog>
  )
}
