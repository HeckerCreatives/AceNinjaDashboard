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
import { useAddRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import { createSeasonsSchema, CreateSeasonsSchema, CreateSkinsItems, storeItemSchema, StoreSchema, storeSkinsSchema } from '@/validation/schema'
import { useCreateSeason } from '@/client_actions/superadmin/season'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCreateSkillsItem, useCreateSkinsItem, useCreateStoreItem } from '@/client_actions/superadmin/store'
import Loader from '@/components/common/Loader'
  


export default function CreateSkillsItemsForm() {
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const {mutate: createSkillsItem, isPending} = useCreateSkillsItem()
    const [dmg, setDmg] = useState(0)
    const [def, setDef] = useState(0)
    const [spd, setSpd] = useState(0)

    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateSkinsItems>({
      resolver: zodResolver(storeSkinsSchema),
    });

    //create news
    const createItem = async ( data: CreateSkinsItems) => {
        createSkillsItem({
            name: data.name, price: data.price, currency: data.currency, imageUrl: data.imageUrl, description: data.description, rarity: data.rarity, itemtype: 'skills'
        },{
         onSuccess: () => {
           toast.success(`Item created successfully.`);
           setOpen(false)
         },
       })
     
    }

    //reset form value
    useEffect(() => {
        reset()
    },[open])


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
         if (file) {
           setValue("imageUrl", file); // Update React Hook Form value
           setPreview(URL.createObjectURL(file)); // Show image preview
         }
       };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Create
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto border-amber-500/80 border-[1px] overflow-y-auto max-h-[80%]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Skills Items</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createItem)} className=' text-xs flex flex-col gap-2 p-6 '>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Title' className={` input ${errors.name && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('name')} />
            {errors.name && <p className=' text-[.6em] text-red-500'>{errors.name.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Rarity</label>
            <Select onValueChange={(value) => setValue("rarity", value, { shouldValidate: true })}>
            <SelectTrigger className="bg-zinc-950 border-none">
                <SelectValue placeholder="Rarity" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
            </Select>
            {errors.rarity && <p className=' text-[.6em] text-red-500'>{errors.rarity.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Price</label>
            <input type="number" placeholder='Title' className={` input ${errors.price && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('price', {valueAsNumber: true})} />
            {errors.price && <p className=' text-[.6em] text-red-500'>{errors.price.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Currency</label>
            <Select onValueChange={(value) => setValue("currency", value, { shouldValidate: true })}>
            <SelectTrigger className="bg-zinc-950 border-none">
                <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="coins">Coins</SelectItem>
                <SelectItem value="emerald">Emerald</SelectItem>
                {/* <SelectItem value="crystal">Crystal</SelectItem> */}
            </SelectContent>
            </Select>
            {errors.currency && <p className=' text-[.6em] text-red-500'>{errors.currency.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Description</label>
            <textarea placeholder='Description' className={` input ${errors.description && 'border-[1px] h-[150px] focus:outline-none border-red-500'} text-xs `} {...register('description')} />
            {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
            </div>
{/* 
            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Damage</label>
            <input value={dmg} onChange={(e) => setDmg(e.target.valueAsNumber)} type="number" placeholder='Damage' className={` input text-xs `}/>
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Defense</label>
            <input value={def} onChange={(e) => setDef(e.target.valueAsNumber)} type="number" placeholder='Defense' className={` input text-xs `}/>
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Speed</label>
            <input value={spd} onChange={(e) => setSpd(e.target.valueAsNumber)} type="number" placeholder='Speed' className={` input text-xs `}/>
            </div> */}

            <div className=' w-full p-4 bg-light border-amber-800 border-[1px] rounded-md overflow-hidden mt-2'>
                        <label htmlFor="" className=''>Image</label>
            
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
                                {...register("imageUrl")}
                                onChange={handleFileChange}
                            />
                          </label>
                        </div>
            
                      {errors.imageUrl && <p className=' text-[.6em] text-red-500'>{errors.imageUrl.message}</p>}
            
            </div>

     
         


          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button disabled={isPending} className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1'>
              {isPending && <Loader/>}
              Save</button>
            {/* <button className=' bg-red-500 text-black text-xs px-8 py-2 rounded-md'>Cancel</button> */}
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
