'use client'
import { MoveUp } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import SellItems from '@/app/(dashboard)/user/inventory/SellItem'
import EquipItems from '@/app/(dashboard)/user/inventory/EquipItems'
import { itemIcon } from '@/utils/findAsset'

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
type: string

}


export default function ViewInventoryItems(data: Items) {

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



  return (
    <div className=' w-full h-auto flex flex-col'>
        <div className=' relative w-full h-[300px] bg-zinc-800'>
            <img src={itemIcon(data.type)} alt="item" className=' object-cover h-full opacity-50' />
        
            <div className=' flex flex-col gap-1 absolute p-4 top-2 left-2'>
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

        <div className=' w-full flex flex-col gap-1 py-2'>
            <div className=' flex gap-2'>
                <div className=' flex flex-col w-full gap-1'>
                    <p className=' text-[.8rem] whitespace-pre-wrap'>{data.itemname} <span className={` text-[.6rem] ${rarityColor(data.rarity)}`}>{data.rarity}</span></p>
                    <p className=' text-sm font-semibold'>{data.itemprice.toLocaleString()}</p>
                </div>
                {/* <SellItems itemid={data.itemid}/>
                <EquipItems itemid={data.itemid}/> */}
                
            </div>
        
        </div>
    
    </div>
  )
}


