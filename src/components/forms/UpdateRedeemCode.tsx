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
import { createCode, CreateCode } from '@/validation/schema'
import { useAddRedeemCode, useUpdateRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'



const tabs = [
  'Image',
  'Video',
]

type Props ={
    code: string
    emerald: number
    coins: number
    crystal: number
    expiration: string
    id: string
}

export default function UpdateRedeemCode( prop: Props) {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')
    const {mutate: updateRedeemCode, isPending} = useUpdateRedeemCode()
    const [coins, setCoins] = useState(0)
    const [emerald, setEmerald] = useState(0)
    const [crystal, setCrystal] = useState(0)

    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateCode>({
      resolver: zodResolver(createCode),
      defaultValues:({
        code: prop.code,
        expiration: prop.expiration.split('T')[0]
      })
    });

    //create news
    const createRedeemcodes = async ( data: CreateCode) => {
        updateRedeemCode({id: prop.id, code: data.code, status: 'active', expiry: data.expiration, rewards:{coins: coins, exp: emerald, crystal: crystal}},{
        onSuccess: () => {
          toast.success(`Redeem code updated successfully.`);
          setOpen(false)

        },
      })
     
    }

    //reset form value
    useEffect(() => {
        reset()
    },[open])

    useEffect(() => {
        setCoins(prop.coins)
        setEmerald(prop.emerald)
        setCrystal(prop.crystal)
    },[])

    console.log(prop,prop.expiration.split('T')[0])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black p-2 rounded-md flex items-center h-fit w-fit text-xs font-semibold'>
    <Pen size={15}/>
    </DialogTrigger>
    <DialogContent className=' max-w-[800px] h-auto border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Update Code</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createRedeemcodes)} className=' text-xs flex flex-col gap-2 p-6'>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Code</label>
            <input type="text" placeholder='Code' className={` input ${errors.code && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('code')} />
            {errors.code && <p className=' text-[.6em] text-red-500'>{errors.code.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="" className=' text-sm'>Rewards</label>

            <label htmlFor="" className=''>Coins</label>
              <input value={coins} onChange={(e) => setCoins(e.target.valueAsNumber)} type="number" placeholder='Coins' className={` input  text-xs `}  />

              <label htmlFor="" className=''>Exp</label>
              <input value={emerald} onChange={(e) => setEmerald(e.target.valueAsNumber)} type="number" placeholder='Emerald' className={` input text-xs `} />

              <label htmlFor="" className=''>Crystal</label>
              <input value={crystal} onChange={(e) => setCrystal(e.target.valueAsNumber)} type="number" placeholder='Crystal' className={` input  text-xs `}  />
            </div>


            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Expiration</label>
            <input type="date" placeholder='Expiration' className={` input ${errors.expiration && 'border-[1px] focus:outline-none border-red-500'} `} {...register('expiration')} />
            {errors.expiration && <p className=' text-[.6em] text-red-500'>{errors.expiration.message}</p>}
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
