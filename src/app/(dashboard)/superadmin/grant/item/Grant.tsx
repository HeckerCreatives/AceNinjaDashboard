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
import ViewCard from '@/components/viewuser/ViewCard'
import { ArrowUpRight, Check, ChevronDown, ChevronUp, ListFilter, MoveUp, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useCharacterStore from '@/hooks/character'
import { useGetItems } from '@/client_actions/user/marketplace'
import PaginitionComponent from '@/components/common/Pagination'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { table } from 'console'
import MarketItems from '@/components/cards/MarketItems'
import { useGetItemsAdmin } from '@/client_actions/superadmin/store'
import StoreItems from '@/components/cards/StoreItems'
import CreateStoreItems from '@/components/forms/CreateStoreItems'
import { Button } from '@/components/ui/button'
import GrantCard from '@/components/cards/GrantCard'
import { useGrantItem } from '@/client_actions/superadmin/grant'
import toast from 'react-hot-toast'
import Loader from '@/components/common/Loader'

const types = [
  'skins', 'skills', 'chests', 'freebie'
]


const rarities = [
  'all', 'basic', 'common', 'rare', 'legendary'
]

export default function Grant() {
  const [currentPage, setCurrentpage] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [type, setType] = useState('skins')
  const [rarity, setRarity] = useState('all')
  const [search, setSearch] = useState('')
  const {mutate: grantItem, isPending} = useGrantItem()
  const [selectedItems, setSelectedItems] = useState<{ itemId: string; itemname: string }[]>([]);
  const [username, setUsername] = useState('')

  const {data, isLoading} = useGetItemsAdmin(type.replace(/\s+/g, ''), `${rarity !== 'all' ? rarity : ''}`, search, currentPage, 10)

  // Pagination
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

  useEffect(() => {
    setTotalpage(data?.pagination.pages || 0)
  }, [data])

  const rarityColor = (data: string) => {
    if (data === 'basic') {
      return 'text-yellow-300'
    } else if (data === 'common') {
      return 'text-blue-300'
    } else if (data === 'rare') {
      return 'text-violet-300'
    } else {
      return 'text-pink-300'
    }
  }

  const toggleItemSelection = (item: any) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.itemId === item.itemId); // Check if item is selected
    if (isSelected) {
      // Remove item from selectedItems if already selected
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.itemId !== item.itemId)
      );
    } else {
      // Add item to selectedItems if not already selected
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        { itemId: item.itemId, itemname: item.name }, // Store both itemId and itemname
      ]);
    }
  };


  const sendItems = async () => {
    const itemIds = selectedItems.map(item => item.itemId);
        grantItem({username: username, items: itemIds},{
          onSuccess: () => {
            toast.success(`Granted successfully.`);
            setUsername('')
            setSelectedItems([])
          },
        })
       
      }

  return (
    <div className='w-full flex flex-col gap-8 overflow-hidden p-8'>
      <div className='flex flex-col gap-1 p-6 bg-amber-950 w-full max-w-[400px] rounded-sm'>
        <label htmlFor="" className='text-xs'>Username</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />

        <label htmlFor="" className='text-xs mt-2'>Selected Items</label>

        <div className="text-xs text-yellow-400 mt-2 flex flex-wrap gap-2">
          {selectedItems.length > 0 ? (
            selectedItems.map(item => <p key={item.itemId} className=' px-3 py-1 rounded-full bg-zinc-900 w-fit'>{item.itemname}</p>) // Display selected item names
          ) : (
            <p className=' text-zinc-400'>No items selected</p>
          )}
        </div>

        <Button disabled={isPending} onClick={sendItems} className='mt-6'>
            {isPending && <Loader/>}
            Grant</Button>
        <p className='text-xs text-zinc-400 mt-4'>Select items below</p>
      </div>

      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger className='text-[.7rem] flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-sm'>
              <ListFilter size={15} /> Type: {type}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className='text-xs'>Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {types.map((item, index) => (
                <DropdownMenuItem onClick={() => setType(item)} key={index} className='text-[.7rem] cursor-pointer'>
                  {item === type && <Check size={10} className='text-green-500' />} {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

           {(type === 'skins' || type === 'skills' || type === 'chests') && (
                       <DropdownMenu>
                        <DropdownMenuTrigger className=' text-[.7rem] flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-sm'><ListFilter size={15}/>Rarity: {rarity}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel className=' text-xs'>Rarity</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {rarities.map((item, index) => (
                          <DropdownMenuItem onClick={() => setRarity(item)} key={index} className=' text-[.7rem] cursor-pointer'>{item === rarity && <Check size={10} className=' text-green-500'/>}{item}</DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
  

        </div>
        <div className=''>
          <div className='relative'>
            <Search size={20} className='absolute left-2 top-[10px]' />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search items' className='pl-10 text-xs bg-zinc-800 placeholder:text-xs' />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className='w-full h-[300px] flex items-center justify-center'>
          <div className='loader'></div>
        </div>
      ) : (
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6'>
          {Object.values(data?.data || {}).map((item, index) => (
            <div
              key={index}
              onClick={() => toggleItemSelection(item)}
              className={`transition-all p-2 ${selectedItems.some(selectedItem => selectedItem.itemId === item.itemId) ? 'border-2 border-yellow-500 rounded-sm' : ''}`}
            >
              <GrantCard
                key={item.itemId}
                imgUrl={`${process.env.NEXT_PUBLIC_API_URL}/${item.imageUrl}`}
                damage={item.stats.damage}
                defense={item.stats.defense}
                speed={item.stats.speed}
                itemid={item.itemId}
                itemname={item.name}
                itemprice={item.price}
                rarity={item.rarity}
                description={item.description}
                currency={item.currency}
                gender={item.gender}
                type={item.type}
              />
            </div>
          ))}
        </div>
      )}

      {Object.values(data?.data || {}).length === 0 && (
        <div className='w-full h-[200px] flex items-center justify-center'>
          <p className='text-xs text-zinc-400'>No items.</p>
        </div>
      )}

      {Object.values(data?.data || {}).length !== 0 && (
        <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange} />
      )}
    </div>
  )
}
