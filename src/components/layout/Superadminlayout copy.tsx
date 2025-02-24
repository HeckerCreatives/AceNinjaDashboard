'use client'
import Link from 'next/link';
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
  
  
import { ArrowLeft, CircleUser, Home, Menu, User, Users } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { superadminRoutes } from '@/types/route';
import { Item } from '@radix-ui/react-dropdown-menu';
  

export default function Superadminlayoutcopy({
    children,
  }: {
    children: React.ReactNode;
  }) {

const path = usePathname()
const params = useSearchParams()

const matchedRoutes = superadminRoutes
  .filter((item) => path.includes(item.name.toLowerCase()))
  .map((item) => item.name);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
        
        <div 
      
        className={`hidden md:block w-[280px] relative`}>
            {/* <button className=' z-50 absolute bg-zinc-800 rounded-full p-3 right-0 top-6 translate-x-4'>
                <ArrowLeft size={15}/>
            </button> */}
          <div className="flex h-full max-h-screen flex-col gap-2 bg-zinc-950 border-r-[1px] border-zinc-800">
             <div className=' flex items-center justify-center h-auto py-4'>
                <img src="/logo.png" alt="" width={100} />
             </div>
            <div className="flex-1 overflow-y-auto">
              <nav className=" flex flex-col gap-2 px-2 text-sm font-medium lg:px-4">

                {superadminRoutes.map((item, index) => (
                  <>
                  {item.subitems?.length === 0 ? (
                    <Link
                    key={index}
                    href={item.route}
                    className={` ${path.includes(item.route) ? 'active-gradient' : 'text-zinc-100 hover:text-amber-300 '}   text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  ): (
                    <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <div className={`  px-3 flex items-center w-full gap-2 ${path.includes(item.name.toLowerCase()) ? 'active-gradient' : 'text-zinc-100 hover:text-amber-300' }`}>
                        {item.icon}
                        <AccordionTrigger className=' w-[200px] text-sm'>{item.name}</AccordionTrigger>
                      </div>
                      
                      <AccordionContent className=' pl-8'>

                        {item.subitems?.map((item, index) => (
                           <Link
                           key={index}
                           href={item.route}
                           className={` ${path.includes(item.route) ? ' text-amber-300' : 'text-zinc-100 hover:text-amber-300'} text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                         >
                           
                           {item.name}
                         </Link>
                        ))}
                        
                      </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                  )}
                  
                  </>
                  
                ))}
              
               
              </nav>
            </div>
            
          </div>
        </div>
    
        
        <div className=" w-screen relative h-screen flex flex-col overflow-y-auto">
          <header className=" sticky top-0 z-40 flex items-center justify-between gap-4 bg-zinc-950 p-4 py-4 lg:py-6 lg:px-6">
            <div className=' flex items-center gap-4'>
              <img src="/logo.png" alt="" width={50} height={50} className=' lg:hidden block' />
              <p className=' text-xs text-zinc-400'>Dashboard / {matchedRoutes} </p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="shrink-0 lg:hidden bg-zinc-800"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-zinc-950 border-r-2 border-zinc-800">
                <div className=' flex items-center justify-center gap-2 text-white p-4'>
                  <img src="/logo.png" alt="" width={100} height={100} />
                 
                </div>
                <nav className="grid gap-2 text-lg">
                {superadminRoutes.map((item, index) => (
                  <>
                  {item.subitems?.length === 0 ? (
                    <Link
                    key={index}
                    href={item.route}
                    className={` ${path.includes(item.route) ? 'active-gradient' : 'text-zinc-100 hover:text-amber-300 '}   text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  ): (
                    <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <div className={`  px-3 flex items-center w-full gap-2 ${path.includes(item.name.toLowerCase()) ? 'active-gradient' : 'text-zinc-100 hover:text-amber-300' }`}>
                        {item.icon}
                        <AccordionTrigger className=' w-[200px] text-sm'>{item.name}</AccordionTrigger>
                      </div>
                      
                      <AccordionContent className=' pl-8'>

                        {item.subitems?.map((item, index) => (
                           <Link
                           key={index}
                           href={item.route}
                           className={` ${path.includes(item.route) ? ' text-amber-300' : 'text-zinc-100 hover:text-amber-300'} text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                         >
                           
                           {item.name}
                         </Link>
                        ))}
                        
                      </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                  )}
                  
                  </>
                  
                ))}
                
                </nav>
               
              </SheetContent>
            </Sheet>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild className=' lg:block hidden '>
                <button  className="rounded-full bg-zinc-800 p-2">
                  <CircleUser className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Superadmin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem ><a href="/">Logout</a></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className=" relative flex flex-1 flex-col items-center gap-4 bg-zinc-900  ">
              {children}
          </main>
        </div>
      </div>
  )
}
