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
import { useAddRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { createSeasonsSchema, CreateSeasonsSchema, storeItemSchema, StoreSchema, updateItemSchema, UpdateStoreSchema } from '@/validation/schema'
import { useCreateSeason } from '@/client_actions/superadmin/season'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCreateStoreItem, useUpdateStoreItem } from '@/client_actions/superadmin/store'


type Items = {
    imgUrl: string
    damage: number
    defense: number
    speed: number
    itemid: string
    itemname: string
    itemprice: number
    rarity: string
    description: string
    gender: string
    currency: string
    type: string
}


export default function UpdateStoreItems( prop: Items) {
     const [preview, setPreview] = useState(
       prop.imgUrl ? prop.imgUrl : null
     );
    const [open, setOpen] = useState(false)
    const {mutate: updateStoreItem, isPending} = useUpdateStoreItem()
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
    } = useForm<UpdateStoreSchema>({
      resolver: zodResolver(updateItemSchema),
      defaultValues:({
        name: prop.itemname,
        type: prop.type,
        rarity: prop.rarity,
        currency: prop.currency,
        gender: prop.gender,
        description: prop.description,
        price: prop.itemprice,
        imageUrl: null
      })
    });

    const updateDataItem = async ( data: UpdateStoreSchema) => {
        updateStoreItem({
            itemId: prop.itemid,name: data.name, price: data.price, currency: data.currency, gender: data.gender, rarity: data.rarity, imageUrl: data.imageUrl || null, description: data.description, stats: { damage: dmg, defense: def, speed: spd },
            type: data.type
        },{
         onSuccess: () => {
           toast.success(`Item updated successfully.`);
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

    useEffect(() => {
     setDmg(prop.damage)
     setDef(prop.defense)
     setSpd(prop.speed)
     },[])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black p-2 w-fit h-fit rounded-md flex items-center text-xs font-semibold'>
    <Pen size={15}/>
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto border-amber-500/80 border-[1px] overflow-y-auto max-h-[80%]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Update Store Item</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(updateDataItem)} className=' text-xs flex flex-col gap-2 p-6 '>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Title' className={` input ${errors.name && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('name')} />
            {errors.name && <p className=' text-[.6em] text-red-500'>{errors.name.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Type</label>
            <Select defaultValue={prop.type} onValueChange={(value) => setValue("type", value, { shouldValidate: true })}>
            <SelectTrigger className="bg-zinc-950 border-none">
                <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="weapon">Weapon</SelectItem>
                <SelectItem value="outfit">Outfit</SelectItem>
                <SelectItem value="hair">Hair</SelectItem>
                <SelectItem value="face">Face</SelectItem>
                <SelectItem value="eyes">Eyes</SelectItem>
            </SelectContent>
            </Select>

            {errors.type && <p className=' text-[.6em] text-red-500'>{errors.type.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Rarity</label>
            <Select defaultValue={prop.rarity} onValueChange={(value) => setValue("rarity", value, { shouldValidate: true })}>
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
            <Select defaultValue={prop.currency} onValueChange={(value) => setValue("currency", value, { shouldValidate: true })}>
            <SelectTrigger className="bg-zinc-950 border-none">
                <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="coins">Coins</SelectItem>
                <SelectItem value="emerald">Emerald</SelectItem>
                <SelectItem value="crystal">Crystal</SelectItem>
            </SelectContent>
            </Select>
            {errors.currency && <p className=' text-[.6em] text-red-500'>{errors.currency.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Gender</label>
            <Select defaultValue={prop.gender} onValueChange={(value) => setValue("gender", value, { shouldValidate: true })}>
            <SelectTrigger className="bg-zinc-950 border-none">
                <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
            </SelectContent>
            </Select>
            {errors.gender && <p className=' text-[.6em] text-red-500'>{errors.gender.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Description</label>
            <textarea placeholder='Description' className={` input ${errors.description && 'border-[1px] h-[150px] focus:outline-none border-red-500'} text-xs `} {...register('description')} />
            {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}
            </div>

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
            </div>

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
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
