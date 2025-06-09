import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import News from './News'
import Showcase from './Showcase'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function page() {
  return (
    <Superadminlayout>
      <Tabs defaultValue="news" className=" w-full p-4 mt-4">
        <TabsList className=' bg-zinc-700'>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="showcase">Showcase</TabsTrigger>
        </TabsList>
        <TabsContent value="news"> <News/></TabsContent>
        <TabsContent value="showcase"> <Showcase/></TabsContent>
      </Tabs>
       
       
    </Superadminlayout>
  )
}
