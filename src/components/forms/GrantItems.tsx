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
    'Weapon',
    'Outfit',
    'Hair',
    'Face',
    'Eyes',
    'Skin Color',
    'Skins',
    'Coins/Emerald',
  ]
export default function GrantItems() {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Weapon')

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
    <Plus size={15}/>Gramt
    </DialogTrigger>
    <DialogContent className=' max-w-[80%] h-auto border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>
            <div className=' flex items-center gap-[1px] mt-4 mb-1'>
                    {tabs.map((item, index) => (
                    <p onClick={() => setTab(item)} key={index} className={` cursor-pointer transition-all duration-300  text-center w-[100px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</p>

                    ))}
                </div>
        </DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <div className=' h-[400px]'>

      </div>
    </DialogContent>
    </Dialog>
  )
}
