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

// const types = [
//   'weapon', 'outfit', 'hair', 'face', 'eyes'
// ]

const types = [
  'skins', 'skills', 'chests', 'freebie', 'crystal packs', 'gold packs'
]


const rarities = [
  'all','basic', 'common', 'rare', 'legendary'
]


export default function Purchase() {
  const { characterid} = useCharacterStore()
  const [currentPage, setCurrentpage] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [type, setType] = useState('skins')
  const [rarity, setRarity] = useState('all')
  const [search, setSearch] = useState('')
  const {data, isLoading} = useGetItems(characterid, type.replace(/\s+/g, ''),`${rarity !== 'all' ? rarity : ''}`,search,currentPage,10)

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


  return (
    <div className=' w-full flex flex-col gap-8 overflow-hidden p-8'>

    
      {/* <button className=' py-2 px-4 bg-yellow-500 text-black text-xs w-fit rounded-r-md flex items-center gap-2'>All <ChevronDown size={15}/></button> */}
      <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger className=' text-[.7rem] flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-sm'><ListFilter size={15}/>Type: {type}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className=' text-xs'>Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {types.map((item, index) => (
              <DropdownMenuItem onClick={() => setType(item)} key={index} className=' text-[.7rem] cursor-pointer'>{item === type && <Check size={10} className=' text-green-500'/>}{item}</DropdownMenuItem>
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

            {Object.values(data?.data || {}).map((item, index) => (
              <MarketItems key={item.itemId} imgUrl={`${process.env.NEXT_PUBLIC_API_URL}/${item.imageUrl}`} damage={item.stats.damage} defense={item.stats.defense} speed={item.stats.speed} itemid={item.itemId} itemname={item.name} itemprice={item.price} rarity={item.rarity} description={item.description} currency={item.currency}/>
        
              // <div className=' w-full h-auto flex flex-col'>
              //   <div className=' relative w-full h-[300px] bg-zinc-800'>
              //     <div className=' flex flex-col gap-1 absolute p-4'>
              //       {item.stats.damage > 0 && (
              //         <div className='flex items-center'>
              //           <p className='text-[.7rem] flex items-center gap-1'>
              //             <MoveUp size={12} className='text-green-500' /> {item.stats.damage} damage
              //           </p>
              //         </div>
              //       )}

              //       {item.stats.defense > 0 && (
              //         <div className='flex items-center'>
              //           <p className='text-[.7rem] flex items-center gap-1'>
              //             <MoveUp size={12} className='text-green-500' /> {item.stats.defense} defense
              //           </p>
              //         </div>
              //       )}

              //       {item.stats.speed > 0 && (
              //         <div className='flex items-center'>
              //           <p className='text-[.7rem] flex items-center gap-1'>
              //             <MoveUp size={12} className='text-green-500' /> {item.stats.speed} speed
              //           </p>
              //         </div>
              //       )}

              //     </div>
              //   </div>

              //   <div className=' w-full flex flex-col gap-1 py-2'>
              //     <p className=' text-[.8rem] whitespace-pre-wrap'>{item.name} <span className={` text-[.6rem] ${rarityColor(item.rarity)}`}>{item.rarity}</span></p>
              //     <p className=' text-sm font-semibold'>{item.price.toLocaleString()}</p>
              //   </div>
              
              // </div>
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

    

    {/* <Table className=' text-xs'>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Item Id</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Item Price</TableHead>
          <TableHead>Item Currency</TableHead>
          <TableHead>Buy Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(data?.data || {}).map((item, index) => (
          <TableRow>
          <TableCell className="">{item.name}</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        ))}
        
      </TableBody>
    </Table> */}

    </div>
  )
}
