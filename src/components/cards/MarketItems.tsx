'use client'
import { MoveUp } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useBuyItem } from '@/client_actions/user/marketplace'
import useCharacterStore from '@/hooks/character'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { currencyImg, itemIcon} from '@/utils/findAsset'
  

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
currency: string
type: string
}
export default function MarketItems(data: Items) {
    const [open, setOpen] = useState(false)
    const { characterid} = useCharacterStore()
    const { mutate: buyItem, error, isSuccess, isPending } = useBuyItem();

    const rarityColor = (data: string) => {
        if(data === 'basic'){
          return 'text-yellow-300'
        } else  if(data === 'common'){
          return 'text-blue-300'
        } else  if(data === 'rare'){
          return 'text-violet-300'
        } else {
          return 'text-pink-300'
    
        }
      }

      const purchaseItem = () => {
        buyItem({ characterid: characterid, itemid: data.itemid },
            {  onSuccess: () => {
                toast.success('Successfully purchased.');
                setOpen(false)
              },})
      }



  return (
    <div className=' w-full h-auto flex flex-col'>
        <div className=' relative w-full h-[300px] bg-zinc-800'>
            {/* <img src={data.imgUrl} alt="item" className=' object-cover w-full h-full opacity-70' /> */}
            <img src={itemIcon(data.type)} alt="item" className=' w-full opacity-50' />
            
            <div className=' flex flex-col gap-1 top-2 left-2 absolute p-4'>
                {data.damage > 0 && (
                <div className='flex items-center'>
                    <p className='text-[.7rem] flex items-center gap-1'>
                    <MoveUp size={12} className='text-green-500' /> {data.damage} damage
                    </p>
                </div>
                )}

                {data.defense > 0 && (
                <div className='flex items-center'>
                    <p className='text-[.7rem] flex items-center gap-1'>
                    <MoveUp size={12} className='text-green-500' /> {data.defense} defense
                    </p>
                </div>
                )}

                {data.speed > 0 && (
                <div className='flex items-center'>
                    <p className='text-[.7rem] flex items-center gap-1'>
                    <MoveUp size={12} className='text-green-500' /> {data.speed} speed
                    </p>
                </div>
                )}

            </div>

            <div className=' w-full absolute bottom-0 p-4'>
                <p className=' text-[.7rem] text-zinc-300'>{data.description}</p>

            </div>
        </div>

        <div className=' w-full flex flex-col gap-1 py-2 mt-4'>
            <div className=' flex '>
                <div className=' flex flex-col w-full gap-1'>
                    <p className=' text-[.8rem] whitespace-pre-wrap'>{data.itemname} <span className={` text-[.6rem] ${rarityColor(data.rarity)}`}>{data.rarity}</span></p>
                    <p className=' text-sm font-semibold flex items-center gap-2'>{currencyImg(data.currency)}{data.itemprice.toLocaleString()}</p>
                </div>
                {/* <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className=' text-[.7rem] font-semibold px-3 py-2 rounded-sm h-fit bg-yellow-500 text-amber-950 w-[100px]'>
                    Buy now
                </DialogTrigger>
                <DialogContent className=' max-h-[500px] h-fit max-w-[700px] p-6'>
                    <DialogHeader>
                    <DialogTitle>Are you absolutely sure, you want to buy? <span className=' text-yellow-500'>{data.itemname}</span></DialogTitle>
                    <DialogDescription>
                       
                    </DialogDescription>
                    </DialogHeader>

                    <div className=' flex flex-col gap-2 text-sm'>
                        <p>Name: {data.itemname}</p>
                        <p>Price: {data.itemprice.toLocaleString()}</p>
                        <p>Rarity: <span className={`${rarityColor(data.rarity)}`}>{data.rarity}</span></p>
                    </div>

                    <div className=' flex items-end justify-end w-full gap-2'>
                        <Button onClick={() => setOpen(!open)} variant={'outline'} className=' text-xs'>Cancel</Button>
                        <Button onClick={purchaseItem}>
                            {isPending && (
                                <Loader/>
                            )}
                            Buy</Button>

                    </div>
                </DialogContent>
                </Dialog> */}

            </div>
        
        </div>
    
    </div>
  )
}


