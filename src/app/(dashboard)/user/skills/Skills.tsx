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
import { useGetPath } from '@/client_actions/user/path'
import useCharacterStore from '@/hooks/character'
import { useGetSkills } from '@/client_actions/user/skills'
import PaginitionComponent from '@/components/common/Pagination'
  

const tabs = [
    'Basic',
    'Secret',
    'Special',
    'Clan',
    'Deals',
    'Raid',
    'Path',
   
]
export default function Skills() {
    const [tab, setTab] = useState('Basic')
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
    const { characterid } = useCharacterStore();
    const {data, isLoading} = useGetSkills(characterid,tab, currentPage, 10)

    //paginition
       const handlePageChange = (page: number) => {
        setCurrentpage(page)
      }
    
      useEffect(() => {
        setTotalpage(data?.pagination.pages || 0)
      },[data])
    
      useEffect(() => {
        setCurrentpage(0)
      },[tab])

  return (
    <div className=' w-full flex flex-col p-8 '>
        <div className=' flex items-center whitespace-nowrap gap-[1px] overflow-x-auto'>
            {tabs.map((item, index) => (
            <button onClick={() => setTab(item)} key={index} className={` transition-all duration-300 min-w-[110px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</button>

            ))}
        </div>

        <Table className=' text-xs mt-4'>
         {Object.values(data?.data || {}).length === 0 && (
          <TableCaption className=' text-xs'>No Data</TableCaption>
          )}
          {isLoading && (
          <TableCaption className=' text-xs'><div className=' loader'></div></TableCaption>

          )}
        <TableHeader>
            <TableRow>
            <TableHead className="">Skill Name</TableHead>
            <TableHead>Skill Description</TableHead>
            <TableHead>Skill Level</TableHead>
            <TableHead>Skill Max Level</TableHead>
            <TableHead>Skill Level Required</TableHead>
            <TableHead>Skill Category</TableHead>
            <TableHead>Aquired</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {Object.values(data?.data || {}).map((item, index) => (
              <TableRow key={item._id}>
              <TableCell className=" min-w-[100px] max-w-[100px]">{item.name}</TableCell>
              <TableCell className=" min-w-[150px] max-w-[150px]">{item.description}</TableCell>
              <TableCell>{item.currentLevel}</TableCell>
              <TableCell>{item.maxLevel}</TableCell>
              <TableCell>{item.levelRequirement}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className={ `${item.acquired ? ' text-green-500' : 'text-red-500'}`}>{item.acquired ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        </Table>

        {Object.values(data?.data || {}).length !== 0 && (
          <PaginitionComponent currentPage={currentPage} total={totalpage} onPageChange={handlePageChange }/>

          )}

        

    </div>
  )
}
