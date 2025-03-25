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
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {  createNewsLetter, CreateNewsLetter, createTier, CreateTier } from '@/validation/schema'
import { useCreateNewsletter } from '@/client_actions/superadmin/newsletter'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import emailjs from "@emailjs/browser";
import { useGetSubscriber } from '@/client_actions/superadmin/subscribers'
import { useGetSocialMedia } from '@/client_actions/superadmin/socialmedia'
import { Item } from '@radix-ui/react-dropdown-menu'
import { useCreateRanktier } from '@/client_actions/superadmin/ranktier'
import { number } from 'zod'


export default function CreateRankTier() {
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const {mutate: createRanktier, isPending} = useCreateRanktier()
    const {data: socials} = useGetSocialMedia()


    const findLink = (type: string) => {
        const find = socials?.data.find((item) => item.title === type)?.link

        return find
    }
    
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setValue("file", file); // Update React Hook Form value
          setPreview(URL.createObjectURL(file)); // Show image preview
        }
      };



    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateTier>({
      resolver: zodResolver(createTier),
    });

    //create news
    const createRankTierData = async (data: CreateTier) => {
        createRanktier(
          {
            name: data.name,
            requiredmmr: data.requiredmmr,
            icon: data.file,
          },
          {
            onSuccess: async (response) => {
              toast.success(`Rank tier created successfully`);
    
              setOpen(false);
              setPreview(null);
              reset();
            },
          }
        );
      };

    //reset form value
    useEffect(() => {
        reset()
        setPreview(null)
    },[open])

    console.log(errors)
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Create
    </DialogTrigger>
    <DialogContent className=' max-w-[450px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Rank Tier</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createRankTierData)} className=' text-xs flex flex-col p-4'>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Title' className={` input ${errors.name && 'border-[1px] focus:outline-none border-red-500'} `} {...register('name')} />
          {errors.name && <p className=' text-[.6em] text-red-500'>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px] mt-2">
        <label htmlFor="requiredmmr">Required MMR</label>
        <input
            type="number"
            placeholder="Enter Required MMR"
            className={`input ${errors.requiredmmr && 'border-[1px] focus:outline-none border-red-500'}`}
            {...register("requiredmmr", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)), // Convert input to number
            })}
        />
        {errors.requiredmmr && <p className="text-[.6em] text-red-500">{errors.requiredmmr.message}</p>}
        </div>


      
          <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden mt-2'>
            <label htmlFor="" className=''>Icon</label>

            <div className=' w-full aspect-square bg-zinc-900 flex items-center justify-center mt-2 border-2 border-dashed border-zinc-700 rounded-md '>
              <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                <div className=' w-full aspect-square flex flex-col items-center justify-center gap-2 text-xs cursor-pointer overflow-hidden'>
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
