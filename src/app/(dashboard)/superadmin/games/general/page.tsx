import Superadminlayoutcopy from '@/components/layout/Superadminlayout'
import React from 'react'
import GameVersionComponent from './game-version'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Seasons from './Seasons'

export default function page() {
  return (
    <Superadminlayoutcopy>
      <div className=' w-full p-6'>
        <Tabs defaultValue="app" className="w-full">
        <TabsList className=' bg-amber-800'>
          <TabsTrigger value="app">App Version</TabsTrigger>
          <TabsTrigger value="season">Season</TabsTrigger>
        </TabsList>
        <TabsContent value="app" className=' py-6'>
          <div className=' w-full'>
          <GameVersionComponent/>
          </div>
        </TabsContent>
        <TabsContent value="season">
          <Seasons/>
        </TabsContent>
      </Tabs>
      </div>
      
      
    </Superadminlayoutcopy>
  )
}
