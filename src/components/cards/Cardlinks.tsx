'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAddSocials, useGetSocialMedia, useUpdateSocials } from '@/client_actions/superadmin/socialmedia'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'

type Links = {
    image: React.ReactNode
    title: string
    type: string
    
}

export default function Cardlinks( prop: Links) {
  const [link, setLink] = useState('')
   const {data} = useGetSocialMedia()
   const {mutate: addSocials, isPending} = useAddSocials()
   const {mutate: updateSocials, isPending: updatePending} = useUpdateSocials()

   const findSocials = data?.data.find((item) => item.title === prop.title)



   const handleSocials = () => {
    if (!link.startsWith("https://")) {
      toast.error("The link must start with https://");
      return;
    }
  
    if (!findSocials) {
      addSocials(
        { title: prop.title, link: link, type: prop.type },
        {
          onSuccess: () => {
            toast.success(`${prop.title} added successfully.`);
          },
        }
      );
    } else {
      updateSocials(
        { id: findSocials._id, title: prop.title, link: link, type: prop.type },
        {
          onSuccess: () => {
            toast.success(`${prop.title} updated successfully.`);
          },
        }
      );
    }
  };

  useEffect(() => {
    setLink(findSocials?.link || '')
  },[data])
  


  return (
    <div className=' flex flex-col gap-2 items-center justify-center w-full'>

       {prop.image}

        <div className=' w-full flex flex-col gap-1 bg-light p-2 border-[1px] border-amber-800 rounded-sm'>
            <p className=' text-xs'>Link</p>
            <Input value={link} onChange={(e) => setLink(e.target.value)} className=' w-full'/>
        </div>

        <div className=' w-full flex items-end justify-end'>
            <Button onClick={handleSocials}>
              {updatePending && <Loader/>}
              Save</Button>

        </div>
    </div>
  )
}
