import Superadminlayoutcopy from '@/components/layout/Superadminlayout'
import React from 'react'
import GameVersionComponent from './game-version'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Seasons from './Seasons'
import Resetables from './Reset'

export default function page() {
  return (
    <Superadminlayoutcopy>
      <div className=' w-full p-6'>
        <Tabs defaultValue="app" className="w-full">
        <TabsList className=' bg-amber-800 text-white'>
          <TabsTrigger value="app">App Version</TabsTrigger>
          <TabsTrigger value="season">Season</TabsTrigger>
          <TabsTrigger value="reset">Reset</TabsTrigger>
        </TabsList>
        <TabsContent value="app" className=' py-6'>
          <div className=' w-full'>
          <GameVersionComponent/>
          </div>
        </TabsContent>
        <TabsContent value="season">
          <Seasons/>
        </TabsContent>
        <TabsContent value="reset">
          <Resetables/>
        </TabsContent>
      </Tabs>
      </div>
      
      
    </Superadminlayoutcopy>
  )
}
