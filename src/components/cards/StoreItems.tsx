'use client'
import { MoveUp } from 'lucide-react'
import React, { useState } from 'react'
import DeleteStoreItems from '../forms/DeleteStoreItems'
import UpdateStoreItems from '../forms/UpdateStoreItem'
  

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
gender: string
type: string
}
export default function StoreItems(data: Items) {

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
        <div className=' relative w-full h-[300px] bg-zinc-800 flex items-center justify-center'
        // style={{backgroundImage: `url('${data.imgUrl}')`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
        >

            <img src={data.imgUrl} alt="item" className=' object-cover w-full h-full opacity-70' />
            <div className=' flex flex-col gap-1 absolute left-2 top-2 p-4'>
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
            <div className=' flex '>
                <div className=' flex flex-col w-full gap-1'>
                    <p className=' text-[.8rem] whitespace-pre-wrap'>{data.itemname} <span className={` text-[.6rem] ${rarityColor(data.rarity)}`}>{data.rarity}</span></p>
                    <p className=' text-sm font-semibold'>{data.itemprice.toLocaleString()}</p>
                </div>
            
                <div className=' flex items-center gap-2'>
                <DeleteStoreItems id={data.itemid}/>
                <UpdateStoreItems imgUrl={data.imgUrl} damage={data.damage} defense={data.defense} speed={data.speed} itemid={data.itemid} itemname={data.itemname} itemprice={data.itemprice} rarity={data.rarity} description={data.description} gender={data.gender} currency={data.currency} type={data.type}/>
                </div>

               

            </div>
        
        </div>
    
    </div>
  )
}


