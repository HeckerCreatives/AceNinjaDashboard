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
import CreateSkinsItemsForm from '@/components/forms/store/CreateSkins'
import CreateSkillsItemsForm from '@/components/forms/store/CreateSkills'
import CreateChestsItemsForm from '@/components/forms/store/CreateChests'
import CreateCrystalPacksItemsForm from '@/components/forms/store/CreateCrystalPacks'
import CreateGoldPacksItemsForm from '@/components/forms/store/CreateGoldPacks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const types = [
  'weapon', 'outfit', 'hair', 'face', 'eyes'
]

const rarities = [
  'all','basic', 'common', 'rare', 'legendary'
]


const stores = [
  {name: 'Skins', data: "skins"},
  {name: 'Skills', data: "skills"},
  {name: 'Chests', data: "chests"},
  {name: 'Freebie', data: "freebie"},
  {name: 'Crystal Packs', data: "crystalpacks"},
  {name: 'Gold Packs', data: "goldpacks"},
]


export default function Store() {
  const [tab, setTab] = useState('skins')
  const [currentPage, setCurrentpage] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [rarity, setRarity] = useState('all')
  const [search, setSearch] = useState('')
  const {data, isLoading} = useGetItemsAdmin( tab,`${rarity !== 'all' ? rarity : ''}`,search,currentPage,10, 'store')
  const [itemtype, setItemtype] = useState('store')

 const filteredData = data
  ? Object.values(data.data).filter(item => item.currency === 'coins')
  : [];
  

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }

   useEffect(() => {
      setTotalpage(data?.pagination.pages || 0)
    },[data])

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

  useEffect(() => {
    setCurrentpage(0)
  },[tab, rarity])

  const editState = (data: string) => {
    if(data === 'skins'){
      return true
    } else {
      return false
    }
  }

  const deleteState = (data: string) => {
    if(data === 'skins'){
      return true
    } else {
      return false
    }
  }


  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

      <p className=' text-xl font-semibold'>Market</p>

      <div className=' flex items-center whitespace-nowrap overflow-x-auto gap-[1px]'>
          {stores.map((item, index) => (
          <button onClick={() => setTab(item.data)} key={index} className={` transition-all duration-300 min-w-[110px] py-2 rounded-t-lg  text-xs ${item.data === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item.name}</button>

          ))}
      </div>

     

    
      {/* <button className=' py-2 px-4 bg-yellow-500 text-black text-xs w-fit rounded-r-md flex items-center gap-2'>All <ChevronDown size={15}/></button> */}
      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>

          {/* {tab === 'skins' && (
            <CreateSkinsItemsForm/>
          )}

          {tab === 'skills' && (
            <CreateSkillsItemsForm/>
          )}

          {tab === 'chests' && (
            <CreateChestsItemsForm/>
          )}

          {tab === 'crystalpacks' && (
            <CreateCrystalPacksItemsForm/>
          )}

          {tab === 'goldpacks' && (
            <CreateGoldPacksItemsForm/>
          )} */}

          {(tab === 'skins' || tab === 'skills' || tab === 'chests') && (
            <>
          

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
            </>
          )}
          

        </div>
        <div className=''>
          <div className=' relative'>
              <Search size={20} className=' absolute left-2 top-[10px]'/>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search items' className=' pl-10 text-xs bg-zinc-800 placeholder:text-xs'/>
          </div>
        </div>
      </div>
    
      {isLoading ? (
        <div className=' w-full h-[300px] flex items-center justify-center'>
          <div className='loader'></div>
        </div>

      ):(
        <>
        <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6'>

            {Object.values(filteredData).map((item, index) => (
              <StoreItems key={item.itemId} imgUrl={`${process.env.NEXT_PUBLIC_API_URL}/${item.imageUrl}`} damage={item.stats.damage} defense={item.stats.defense} speed={item.stats.speed} itemid={item.itemId} itemname={item.name} itemprice={item.price} rarity={item.rarity} description={item.description} currency={item.currency} gender={item.gender} type={item.type} tab={tab} editable={false} deletable={false}/>
            ))}
        </div>
        </>
      )}

    {Object.values(data?.data || {}).length === 0 && (
     <div className=' w-full h-[200px] flex items-center justify-center'>
      <p className=' text-xs text-zinc-400'>No items.</p>
    </div>
    )}

      
     
      

    {Object.values(data?.data || {}).length !== 0 && (
      <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
    )}
    </div>
  )
}
