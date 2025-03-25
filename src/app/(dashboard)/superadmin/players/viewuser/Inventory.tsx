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
import InventoryItems from '@/components/cards/InventoryItems'
import PaginitionComponent from '@/components/common/Pagination'
import useCharacterStore from '@/hooks/character'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { ListFilter, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGetInventory } from '@/client_actions/superadmin/inventory'
  

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
    setTotalpage(data?.pagination.pages || 0)
  },[data])


return (
  <div className=' w-full h-full flex flex-col p-8  overflow-y-auto'>
      {/* <div className=' flex items-center whitespace-nowrap overflow-x-auto gap-[1px]'>
          {data?.data.map((item, index) => (
          <button onClick={() => setTab(item.type)} key={index} className={` transition-all duration-300 min-w-[90px] py-2 rounded-t-lg  text-xs ${item.type === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item.type}</button>

          ))}
      </div> */}

      

       {isLoading ? (
              <div className=' w-full h-[300px] flex items-center justify-center'>
                <div className='loader'></div>
              </div>
      
            ):(
              <>
              <div className=' w-full h-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 mt-6'>
      
              {Object.values(data?.data || {}).map((entry) => (
                  <InventoryItems 
                    key={entry.item?.id} 
                    imgUrl={""} 
                    damage={entry.item?.details.stats.damage || 0} 
                    defense={entry.item?.details.stats.defense || 0} 
                    speed={entry.item?.details.stats.speed || 0} 
                    itemid={entry.item?.id || ''} 
                    itemname={entry.item?.details.name || ''} 
                    itemprice={entry.item?.details.price || 0} 
                    rarity={entry.item?.details.rarity || ''} 
                    description={entry.item?.details.description || ''} 
                  />
                ))}

              </div>
              </>
            )}

{/* <InventoryItems 
            key={index}
            imgUrl={''} 
            damage={selectedCategory.item.details.stats.damage} 
            defense={selectedCategory.item.details.stats.defense} 
            speed={selectedCategory.item.details.stats.speed} 
            itemid={selectedCategory.item.id} 
            itemname={selectedCategory.item.details.name} 
            itemprice={selectedCategory.item.details.price} 
            rarity={selectedCategory.item.details.rarity} 
            description={selectedCategory.item.details.description} 
          /> */}
      
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
