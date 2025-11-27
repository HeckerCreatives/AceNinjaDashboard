'use client'
import { MoveUp } from 'lucide-react'
import React, { useState } from 'react'
import DeleteStoreItems from '../forms/DeleteStoreItems'
import UpdateStoreItems from '../forms/UpdateStoreItem'
import { currencyImg } from '@/utils/findAsset'
import EditFreebieForm from '../forms/store/EditFreebieData'
import Image from 'next/image'
  

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
tab: string
editable: boolean,
deletable: boolean,
crystal?: number,
exp?: number,
coins?: number,
itemtype?: string
}

const rarutyFilter = [
  {name: 'All', value: 'all'},
  {name: 'Basic', value: 'basic'},
  {name: 'Fashion', value: 'common'},
  {name: 'Drip', value: 'rare'},
  {name: 'Epic', value: 'legendary'},
]

export default function StoreItems(data: Items) {

    const rarityColor = (data: string) => {
        if(data === 'Basic'){
          return 'text-yellow-300'
        } else  if(data === 'Fashion'){
          return 'text-blue-300'
        } else  if(data === 'Drip'){
          return 'text-violet-300'
        } else {
          return 'text-pink-300'
    
        }
      }


     let displayValue = data.itemprice;
      let currencyType = data.currency;

      if (displayValue === 0) {
        if (data.crystal) {
          displayValue = data.crystal;
          currencyType = 'crystal';
        } else if (data.exp) {
          displayValue = data.exp;
          currencyType = 'exp';
        } else if (data.coins) {
          displayValue = data.coins;
          currencyType = 'coins';
        }
      }



      const itemIcon = () => {
        if(data.itemtype === 'skins'){
          return '/store/skins.webp'
        } else  if(data.itemtype === 'skills'){
          return '/store/skills.webp'
        } else if(data.itemtype === 'chests'){
          return '/store/chest.webp'
        } else if(data.itemtype === 'freebie'){
          return '/store/freebie.webp'
        } else if(data.itemtype === 'crystalpacks'){
          return '/store/crystalpack.webp'
        } else if(data.itemtype === 'goldpacks'){
          return '/store/goldpacks.webp'
        }
      }



  return (
    <div className=' w-full h-auto flex flex-col'>
        <div className=' relative w-full h-[300px] bg-zinc-800 flex items-center justify-center overflow-hidden'
        // style={{backgroundImage: `url('${data.imgUrl}')`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
        >

            <Image src={itemIcon() || ''} alt="item" fill className=' object-cover w-full opacity-50' loading='lazy' />
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
                <p className=' text-[.7rem] text-zinc-100'>{data.description}</p>

            </div>
        </div>

        <div className=' w-full flex flex-col gap-1 py-2'>
            <div className=' flex '>
                <div className=' flex flex-col w-full gap-1'>
                    <p className=' text-[.8rem] whitespace-pre-wrap'>{data.itemname} <span className={` text-[.6rem] ${rarityColor(data.rarity)}`}>{data.rarity}</span></p>
                    {data.type !== 'freebie' && (
                      <p className=' text-sm font-semibold flex items-center gap-2'>{currencyImg(data.currency)}{displayValue.toLocaleString()}</p>
                    )}
                </div>
            
                <div className=' flex items-center gap-2'>
                  {data.deletable && (
                    <DeleteStoreItems id={data.itemid}/>
                  )}

                  {data.editable && (
                    <UpdateStoreItems imgUrl={data.imgUrl} damage={data.damage} defense={data.defense} speed={data.speed} itemid={data.itemid} itemname={data.itemname} itemprice={data.itemprice} rarity={data.rarity} description={data.description} gender={data.gender} currency={data.currency} type={data.type} tab={data.tab}/>
                  )}

                   {data.itemtype === 'freebie' && (
                    <EditFreebieForm itemid={data.itemid} description={data.description} amount={0} exp={data.exp || 0} coins={data.coins || 0} crystal={data.crystal || 0}/>
                  )}
                </div>

               

            </div>
        
        </div>
    
    </div>
  )
}


