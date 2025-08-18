'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useUserData } from '@/client_actions/user/dashboard/dashboard';
import useCharacterStore from '@/hooks/character';
  

export default function EquipedItems() {
  const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
  const { data, isLoading } = useUserData(characterid)


  return (
    <div className=' w-full bg-light h-[380px] border-amber-900 border-[1px] rounded-md '>
        <div className=' w-full bg-dark px-4 py-2'>
            <p className=' text-sm font-semibold text-zinc-500'>Equiped Items</p>

        </div>

        <div className=' w-full h-[330px] p-4 overflow-y-auto  '>
            <Table className=' bg-dark h-full text-xs'>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow className=' border-collapse '>
                {/* <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Id</TableHead> */}
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Item Name</TableHead>
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Item Equiped</TableHead>
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Date Equiped</TableHead>
                <TableHead className=" border-r-2 border-b-2 border-amber-950/80">Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {data?.inventory
              .filter((category) => category.items.length > 0)
              .map((category) =>
                category.items.map((item) => ( 
                  <TableRow key={item._id}>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item.isEquipped ? "Yes" : "No"}</TableCell>
                    <TableCell>{new Date(item.acquiredAt).toLocaleDateString()}</TableCell>
                    <TableCell>{category.type}</TableCell> {/* ✅ Display category type */}
                  </TableRow>
                ))
              )}
                
            </TableBody>
            </Table>
        </div>

        


    </div>
  )
}
