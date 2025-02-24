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
  
  
import { ArrowLeft, CircleUser, Gem, Globe, Home, LogOut, Menu, ShoppingBag, ShoppingBasket, Sword, Swords, User } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { userRoutes } from '@/types/route';
  

export default function Superadminlayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

const path = usePathname()
const params = useSearchParams()

console.log(path)


  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-hidden ">
        
    
        <div className=" w-screen relative h-screen flex flex-col overflow-y-auto max-w-[1920px]">
          <header className="sticky top-0 z-40 py-2 bg-zinc-950">

            <div className=' flex h-14 items-center justify-between gap-4 p-4  px-8'>
              <img src="/logo.png" alt="" width={80} />

              <div className=' hidden lg:flex items-center gap-4'>
                <a href="" className='bg-zinc-800 px-4 py-2 text-sm flex items-center gap-1'><Globe size={15}/>Ace Website</a>
                <a href="/" className='text-sm flex items-center gap-2'>Log Out</a>

              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="shrink-0 lg:hidden bg-zinc-800"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col bg-zinc-950 border-r-2 border-zinc-900">
                  <div className=' flex items-center gap-2 text-white p-4'>
                    <img src="/logo.webp" alt="" width={50} />
                    <div className=' flex flex-col'>
                      <img src="/logo.png" alt="" width={80} />
                      
                    </div>
                  </div>
                  <nav className="grid gap-2 text-lg font-medium">

                  {userRoutes.map((item, index) => (
                    <Link
                    key={index}
                    href={item.route}
                    className={` ${path.includes(item.route) ? 'active-gradient ' : 'text-zinc-100'} text-sm flex items-center gap-2 rounded-lg px-3  py-2 transition-all`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  ))}
                  
                  </nav>
                
                </SheetContent>
              </Sheet>
            </div>

            <nav className=" hidden lg:flex px-2 text-sm font-medium lg:px-8 py-2">
              {userRoutes.map((item, index) => (
                <Link
                key={index}
                href={item.route}
                className={` ${path.includes(item.route) ? 'active-gradient ' : 'text-zinc-100'} text-sm flex items-center gap-2 rounded-lg px-3  py-2 transition-all`}
              >
                {item.icon}
                {item.name}
              </Link>
              ))}
                
            </nav>
          </header>

         
          <main className=" relative flex flex-1 flex-col items-center gap-4 bg-gradient ">
            <div className=' w-full h-full bg-zinc-950/70 absolute z-0'>

            </div>
            <div className=' z-20 w-full' >
            {children}
            </div>
          </main>
        </div>
      </div>
  )
}
