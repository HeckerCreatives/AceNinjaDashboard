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
import { useDeleteNewsletter, useGetNewsletter } from '@/client_actions/superadmin/newsletter'
import Loader from '@/components/common/Loader'
import { tierImg } from '@/utils/findAsset'
import { useGetChestRewards } from '@/client_actions/superadmin/chest'
import EditChestRewards from './EditChestRewards'
import EditChest from './EditChest'

  

export default function Chestlist() {
    const [open, setOpen] = useState(false)
    const {data, isLoading} = useGetChestRewards()



  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Chests</p>
            </div>

            <div className=' flex flex-col gap-4 p-4'>
                <Table className=' text-xs h-auto'>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rewards</TableHead>
                    <TableHead>Actiion</TableHead>
                 
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={item.id}>
                           
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.currency}</TableCell>
                            <TableCell>{item.amount.toLocaleString()}</TableCell>
                            <TableCell>
                                <EditChestRewards chestid={item.id} rewards={item.rewards} chest={item}/>
                            </TableCell>
                            <TableCell>
                                <EditChest chestid={item.id} data={item}/>
                            </TableCell>
                          
                        </TableRow>
                    ))}
                
                </TableBody>
                </Table>

            </div>
        
        </div>
            
        </div>

    

    </div>
  )
}
