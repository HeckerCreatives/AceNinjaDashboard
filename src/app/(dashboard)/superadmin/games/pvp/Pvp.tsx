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
import { ChevronDown, Plus, Search } from 'lucide-react'
import CreateNewsForm from '@/components/forms/CreateNewsForm'
import { useGetPvpHistory, useGetPvpRankings } from '@/client_actions/superadmin/pvp'
import Pagination from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import { getSeasonLeaderboard, useGetSeasonLeaderboard } from '@/client_actions/superadmin/season'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  

export default function Pvp() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const {data, isLoading} = useGetPvpRankings(currentPage, 10,filter, search)
    const {data: season} = useGetSeasonLeaderboard()

    //paginition
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
          if(data){
              setTotalPage(data.pagination.totalPages)
              
          }
      },[data])

      console.log(data)

  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>PVP (Ranking)</p>
            </div>

            <div className=' flex flex-col gap-4 p-8'>

                <div className=' w-full flex flex-wrap gap-4 items-center justify-between'>
                    {/* <button className=' py-2 px-4 bg-yellow-500 text-black text-xs w-fit rounded-r-md flex items-center gap-2'>Season Filter <ChevronDown size={15}/></button> */}
                    <Select value={filter} onValueChange={setFilter} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Season" />
                    </SelectTrigger>
                    <SelectContent>
                        {season?.data.map((item,index) => (
                        <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>

                        ))}
                    </SelectContent>
                    </Select>


                    <div className=' relative flex items-center'>
                        <Search size={15} className=' absolute left-2'/>

                        <input value={(search)} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search player' className=' pl-6 text-xs h-[30px] p-2 bg-zinc-800 rounded-md' />
                    </div>

                </div>

                
                <Table className=' text-xs'>
                  {data?.data.length === 0 && (
                   <TableCaption>No data.</TableCaption>
                   )}
                   
                   {isLoading && (
                   <TableCaption>
                       <Loader/>
                   </TableCaption>
                   )}
                <TableHeader>
                    <TableRow>
                    <TableHead className=""></TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>MMR</TableHead>
                    <TableHead>Rank</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.rank}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.mmr}</TableCell>
                            <TableCell className=' text-green-500'>
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.icon}`} alt="icon" width={50} />
                            </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
                </Table>

                {data?.data.length !==0 && (
                    <Pagination currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>
                                
                )}

            </div>

            
           
        </div>
            
        </div>

    

    </div>
  )
}
