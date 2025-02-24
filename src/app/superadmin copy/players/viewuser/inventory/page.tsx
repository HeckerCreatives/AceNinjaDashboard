import React from 'react'
import TableInventory from './Table'
import Userlayout from '@/components/layout/Userlayout'
import Viewuserlayout from '@/components/layout/Viewuserlayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function page() {
  return (
    <Viewuserlayout>
    <div className='p-6 top-0 left-0 w-full flex flex-col gap-6 h-auto'>
     

       <Tabs defaultValue="hair" className=" w-full">
        <TabsList>
          <TabsTrigger value="hair">Hair</TabsTrigger>
          <TabsTrigger value="weapon">Weapon</TabsTrigger>
          <TabsTrigger value="outfit">Outfit</TabsTrigger>
          <TabsTrigger value="face">Face</TabsTrigger>
          <TabsTrigger value="eyes">Eyes</TabsTrigger>
        </TabsList>
        <TabsContent value="hair">
          <TableInventory/>
        </TabsContent>
        <TabsContent value="weapon">
          <TableInventory/>
        </TabsContent>
        <TabsContent value="outfit">
          <TableInventory/>
        </TabsContent>
        <TabsContent value="face">
          <TableInventory/>
        </TabsContent>
        <TabsContent value="eyes">
          <TableInventory/>
        </TabsContent>
       
      </Tabs>


       
      
    </div>
 
  </Viewuserlayout>
  )
}
