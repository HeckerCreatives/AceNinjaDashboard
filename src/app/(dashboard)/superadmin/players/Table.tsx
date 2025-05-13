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
import { Search } from 'lucide-react'
import PaginitionComponent from '@/components/common/Pagination'
import Viewuser from './Viewuser'
import { useGetUserList } from '@/client_actions/superadmin/manageplayer'
import Loader from '@/components/common/Loader'
import BanUnbanPlayer from '@/components/forms/BanUnbanPlayer'
import ChangePasswordUserAdmin from '@/components/forms/ChangePAsswordUserAdmin'


  

export default function Playertable() {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [search, setSearch] = useState('')
  const {data, isLoading} = useGetUserList(currentPage,10,'',search)
  

  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

 useEffect(() => {
  setTotalPage(data?.data.totalPages || 0)
 },[data])

 useEffect(() => {
  setCurrentPage(0)
 },[search])

  return (
    <div className=' flex flex-col gap-6 bg-zinc-950 w-full h-auto border-amber-500 border-[1px] rounded-md overflow-hidden'>
      <div className=' w-full flex flex-col gap-2 md:flex-row items-center justify-between text-sm bg-light p-3'>

        <div className=' relative flex items-center'>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search player' className=' h-[30px] p-2 bg-zinc-800 rounded-md' />
          <Search  size={15} className=' absolute right-4'/>
        </div>
      </div>
    <Table className=' text-xs'>
      {data?.data.playerListData.length === 0 && (
        <TableCaption>No data.</TableCaption>
      )}

      {isLoading && (
        <TableCaption>
          <Loader/>
        </TableCaption>
      )}
    <TableHeader>
        {/* <TableRow>
        <TableHead className="">Owner</TableHead>
        <TableHead>Character Name</TableHead>
        <TableHead>Coins</TableHead>
        <TableHead>Crystal</TableHead>
        <TableHead>Emerald</TableHead>
        <TableHead>Current level</TableHead>
        <TableHead className="">Status</TableHead>
        <TableHead className="">Action</TableHead>
        </TableRow> */}

        <TableRow>
          <TableHead className="">Player Name</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Action</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
    {/* {data?.data.playerListData.map((user, userIndex) => (
      user.character.map((character, charIndex) => (
        <TableRow key={`${user.id}-${charIndex}`}>
          <TableCell>{user.username}</TableCell>
          <TableCell>{character.username || "No Character"}</TableCell>
          <TableCell>{character.wallet[0]?.ammount.toLocaleString() || 0}</TableCell>
          <TableCell>{character.wallet[1]?.ammount.toLocaleString() || 0}</TableCell>
          <TableCell>{character.wallet[2]?.ammount.toLocaleString() || 0}</TableCell>
          <TableCell className="">{character.level || 0}</TableCell>
          <TableCell className={` ${user.status === 'active' ? 'text-green-200' : 'text-red-500'}`}>{user.status}</TableCell>
          <TableCell className="flex items-center gap-2">
            <ChangePasswordUserAdmin userid={user.id} name={user.username}/>
            <Viewuser userid={user.id} characterid={character.id} />
            <BanUnbanPlayer userid={user.id}/>
          </TableCell>
        </TableRow>
      ))
    ))} */}

    {data?.data.playerListData.map((user, userIndex) => (
          <TableRow key={`${user.id}-${userIndex}`}>
            <TableCell>{user.username}</TableCell>
            {/* <TableCell>{character.username || "No Character"}</TableCell>
            <TableCell>{character.wallet[0]?.ammount.toLocaleString() || 0}</TableCell>
            <TableCell>{character.wallet[1]?.ammount.toLocaleString() || 0}</TableCell>
            <TableCell>{character.wallet[2]?.ammount.toLocaleString() || 0}</TableCell>
            <TableCell className="">{character.level || 0}</TableCell> */}
            <TableCell className={` ${user.status === 'active' ? 'text-green-200' : 'text-red-500'}`}>{user.status}</TableCell>
            <TableCell className="flex items-center gap-2">
              <ChangePasswordUserAdmin userid={user.id} name={user.username}/>
              <Viewuser userid={user.id} characterid={user.character[0].id} characters={user.character} name={user.username} />
              <BanUnbanPlayer userid={user.id}/>
            </TableCell>
          </TableRow>
      ))}

       
    </TableBody>
    </Table>

    
    {data?.data.playerListData.length !== 0 && (
      <div className=' w-full flex items-center justify-center mb-4'>
      <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

      </div>

      )}


    </div>
  )
}
