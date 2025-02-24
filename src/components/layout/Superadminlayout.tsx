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

import { ArrowLeft, ChevronDown, CircleUser, Equal, Home, Menu, User, UserRound, Users } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { superadminRoutes } from '@/types/route';
import { Item } from '@radix-ui/react-dropdown-menu';
  

export default function Superadminlayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

const path = usePathname()
const params = useSearchParams()
const splitPath = path.split('/').filter(Boolean);

const transformedPath = splitPath.map(part => 
  part.charAt(0).toUpperCase() + part.slice(1)
);

const matchedRoutes = superadminRoutes
  .filter((item) => path.includes(item.name.toLowerCase()))
  .map((item) => item.name);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
        
      
    
        
        <div className=" w-screen relative h-screen flex flex-col overflow-y-auto">
          <header className=" sticky top-0 z-40 flex flex-col justify-between gap-4 bg-zinc-950 py-4 lg:py-6 lg:px-6">

            <div className='flex h-14 items-center justify-between gap-4 p-4  px-8'>
              <div className='flex items-center gap-4 lg:gap-8'>
                <img src="/logo.png" alt="" width={80} height={80} className=' ' />
                <p className=' lg:flex hidden text-xs text-zinc-400 gap-2'><a href="/superadmin/dashboard">Dashboard</a> <span>/</span> {transformedPath[1]} {transformedPath[2] ? <a href={path}> <span>/</span> {transformedPath[2]}</a> : ''} </p>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="shrink-0 lg:hidden bg-zinc-800 p-2 rounded-md"
                  >
                    <Equal size={15} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className=" flex flex-col bg-zinc-950 border-r-2 border-zinc-800">
                  <div className=' flex items-center justify-center gap-2 text-white p-4'>
                    <img src="/logo.png" alt="" width={100} height={100} />
                  
                  </div>
                  <nav className="grid gap-2 text-lg w-full">
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
                      <Accordion key={index} type="single" collapsible>
                      <AccordionItem value="item-1" className=' w-full'>
                        <div className={`  px-3 flex items-center w-full gap-2 ${path.includes(item.name.toLowerCase()) ? 'active-gradient' : 'text-zinc-100 hover:text-amber-300' }`}>
                          {item.icon}
                          <AccordionTrigger className=' w-40 text-sm'>{item.name}</AccordionTrigger>
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
                <DropdownMenuTrigger asChild className=' lg:flex border-none hidden '>
                  <div className=' flex flex-row items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full'>
                    <p className=' flex items-center justify-center gap-2 text-xs'>Superadmin</p>
                    <UserRound size={30} className=' bg-amber-400 p-2 rounded-full'/>

                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=' w-[150px]'>
                  <DropdownMenuLabel>Superadmin</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem ><a href="/">Logout</a></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
           


            <nav className=" hidden lg:flex items-center gap-2 px-2 text-sm font-medium lg:px-4">
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

                  <DropdownMenu key={index}>
                  <DropdownMenuTrigger className={`flex items-center justify-center gap-2 px-4 py-2 border-none ${path.includes(item.name.toLocaleLowerCase()) ? 'active-gradient' : 'text-zinc-100 hover:text-amber-300 '} `}>{item.icon}{item.name}<ChevronDown size={10}/></DropdownMenuTrigger>
                  <DropdownMenuContent className=' mt-6'>
                    {item.subitems?.map((item, index) => (
                         <Link
                         key={index}
                         href={item.route}
                         className={` ${path.includes(item.route) ? ' text-amber-300' : 'text-zinc-100 hover:text-amber-300'} text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                       >
                        
                         {item.name}
                       </Link>
                    ))}
                      
                   
                  </DropdownMenuContent>
                </DropdownMenu>

                  // <Accordion type="single" collapsible>
                  // <AccordionItem value="item-1">
                  //   <div className={`  px-3 flex items-center w-full gap-2 ${path.includes(item.name.toLowerCase()) ? 'active-gradient' : 'text-zinc-100 hover:text-amber-300' }`}>
                  //     {item.icon}
                  //     <AccordionTrigger className=' w-[200px] text-sm'>{item.name}</AccordionTrigger>
                  //   </div>
                    
                  //   <AccordionContent className=' pl-8'>

                  //     {item.subitems?.map((item, index) => (
                  //       <Link
                  //       key={index}
                  //       href={item.route}
                  //       className={` ${path.includes(item.route) ? ' text-amber-300' : 'text-zinc-100 hover:text-amber-300'} text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                  //     >
                        
                  //       {item.name}
                  //     </Link>
                  //     ))}
                      
                  //   </AccordionContent>
                  // </AccordionItem>
                  // </Accordion>
                )}
                
                </>
                
              ))}
            </nav>
          </header>
          <main className=" relative flex flex-1 flex-col items-center gap-4 bg-gradient lg:px-4 ">
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
