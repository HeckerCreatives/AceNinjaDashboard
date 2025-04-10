'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEquipItem, useGetInventory } from '@/client_actions/user/inventory'
import useCharacterStore from '@/hooks/character'
import PaginitionComponent from '@/components/common/Pagination'
import InventoryItems from '@/components/cards/InventoryItems'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import { ListFilter, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import toast from 'react-hot-toast'
import EquipItems from './EquipItems'
import SellItems from './SellItem'



const types = [
  'weapon', 'outfit', 'hair', 'face', 'eyes'
]

const rarities = [
  'all','basic', 'common', 'rare', 'legendary'
]

export default function Inventory() {
  const [tab, setTab] = useState('')
  const [currentPage, setCurrentpage] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [type, setType] = useState('weapon')
  const [rarity, setRarity] = useState('all')
  const [search, setSearch] = useState('')
  const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
  const {data, isLoading} = useGetInventory(characterid, currentPage, 10)



  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }


  useEffect(() => {
    setTab(data?.data[0]?.type || '')
    setTotalpage(data?.pagination?.pages || 0)
  },[data])


return (
  <div className=' w-full h-full flex flex-col p-8  overflow-y-auto'>
      {/* <div className=' flex items-center whitespace-nowrap overflow-x-auto gap-[1px]'>
          {data?.data.map((item, index) => (
          <button onClick={() => setTab(item.type)} key={index} className={` transition-all duration-300 min-w-[90px] py-2 rounded-t-lg  text-xs ${item.type === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item.type}</button>

          ))}
      </div> */}

      

    {isLoading ? (
      <div className='w-full h-[300px] flex items-center justify-center'>
        <div className='loader'></div>
      </div>
    ) : (
      <>
        {Object.keys(data?.data || {}).length === 0 ? (
          <div className='w-full h-[200px] flex items-center justify-center'>
            <p className='text-xs text-zinc-400'>No items yet.</p>
          </div>
        ) : (
          <>
            <div className='w-full h-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mt-6'>
              {Object.values(data?.data || {}).map((entry) => (
                <InventoryItems 
                  key={entry.item?.id}
                  imgUrl={entry.item?.details?.imageUrl || ''}
                  damage={entry.item?.details?.stats.damage || 0}
                  defense={entry.item?.details?.stats.defense || 0}
                  speed={entry.item?.details?.stats.speed || 0}
                  itemid={entry.item?.id || ''}
                  itemname={entry.item?.details?.name || ''}
                  itemprice={entry.item?.details?.price || 0}
                  rarity={entry.item?.details?.rarity || ''}
                  description={entry.item?.details?.description || ''} currency={entry.item?.details.currency || ''}                />
              ))}
            </div>

            <PaginitionComponent
              currentPage={currentPage}
              total={totalpage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </>
    )}


   
  </div>
  )
}