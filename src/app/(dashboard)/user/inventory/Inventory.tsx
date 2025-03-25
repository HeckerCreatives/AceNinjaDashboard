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
    const {mutate: equipItem, isPending} = useEquipItem()
    const [itemid, setItemid] = useState('')

    const selectedCategory = data?.data 
  ? Object.values(data.data).find((category) => category.type === type) 
  : undefined;

  const allTypes = data?.data 
  ? Array.from(new Set(Object.values(data.data).map((category) => category.type)))
  : [];




    
    //paginition
    const handlePageChange = (page: number) => {
      setCurrentpage(page)
    }


    useEffect(() => {
      setTab(data?.data[0]?.type || '')
      setTotalpage(data?.pagination.pages || 0)
    },[data])


  return (
    <div className=' w-full flex flex-col p-8 '>
        {/* <div className=' flex items-center whitespace-nowrap overflow-x-auto gap-[1px]'>
            {data?.data.map((item, index) => (
            <button onClick={() => setTab(item.type)} key={index} className={` transition-all duration-300 min-w-[90px] py-2 rounded-t-lg  text-xs ${item.type === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item.type}</button>

            ))}
        </div> */}

        <div className=' w-full flex items-center justify-between'>
        <div className=' flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger className=' text-[.7rem] flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-sm'><ListFilter size={15}/>Type: {type}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className=' text-xs'>Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allTypes.map((item, index) => (
              <DropdownMenuItem onClick={() => setType(item)} key={index} className=' text-[.7rem] cursor-pointer'>{item === type && <Check size={10} className=' text-green-500'/>}{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <DropdownMenu>
            <DropdownMenuTrigger className=' text-[.7rem] flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-sm'><ListFilter size={15}/>Rarity: {rarity}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className=' text-xs'>Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {rarities.map((item, index) => (
              <DropdownMenuItem onClick={() => setRarity(item)} key={index} className=' text-[.7rem] cursor-pointer'>{item === rarity && <Check size={10} className=' text-green-500'/>}{item}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

        </div>
        <div className=''>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search items' className=' text-xs bg-zinc-800 placeholder:text-xs'/>
        </div>
        </div>

         {isLoading ? (
                <div className=' w-full h-[300px] flex items-center justify-center'>
                  <div className='loader'></div>
                </div>
        
              ):(
                <>
                <div className=' w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mt-6'>
        
                    {/* {Object.values(selectedCategory?.item || {}).map((item, index) => (
                      <InventoryItems imgUrl={''} damage={0} defense={0} speed={0} itemid={''} itemname={''} itemprice={0} rarity={''} description={''} />
                    ))} */}

                    {selectedCategory?.item && (
                        <InventoryItems 
                          imgUrl={''} 
                          damage={selectedCategory.item.details.stats.damage} 
                          defense={selectedCategory.item.details.stats.defense} 
                          speed={selectedCategory.item.details.stats.speed} 
                          itemid={selectedCategory.item.id} 
                          itemname={selectedCategory.item.details.name} 
                          itemprice={selectedCategory.item.details.price} 
                          rarity={selectedCategory.item.details.rarity} 
                          description={selectedCategory.item.details.description} 
                        />
                      )}
                </div>
                </>
              )}
        
            {Object.values(selectedCategory?.item || {}).length === 0 && (
             <div className=' w-full h-[200px] flex items-center justify-center'>
              <p className=' text-xs text-zinc-400'>No items.</p>
            </div>
            )}
        
              
             
              
        
            {Object.values(selectedCategory?.item || {}).length !== 0 && (
              <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>
            )}

        {/* <Table className=' text-xs mt-4'>
          {selectedCategory?.items.length === 0 && (
            <TableCaption className=' text-xs'>No data</TableCaption>
          )}

          {isLoading && (
            <TableCaption className=' text-xs'>
               <div className="loader"></div>
            </TableCaption>
          )}

        <TableHeader>
            <TableRow>
            <TableHead className="">Item Id</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Is Equipped</TableHead>
            <TableHead className="">Quantity</TableHead>
            <TableHead className="">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {selectedCategory?.items.map((item, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium">{item._id}</TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell>{item.isEquipped ? 'Yes' : 'No'}</TableCell>
            <TableCell className="">{item.quantity}</TableCell>
            <TableCell className=" flex items-center gap-2">
              <SellItems itemid={item._id}/>
              <EquipItems itemid={item._id}/>

            </TableCell>
            </TableRow>
          ))}
            
        </TableBody>
        </Table> */}

    </div>
  )
}
