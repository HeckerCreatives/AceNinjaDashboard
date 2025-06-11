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
  
import { ArrowLeft, ChevronRight, CircleUser, Home, Menu, User, Users } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { superadminRoutes } from '@/types/route';


interface SuperadminRoute {
  route: string;
  name: string;
  icon: JSX.Element | null;
  subitems: SuperadminRoute[];
}


export default function Superadminlayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

const path = usePathname()
const params = useSearchParams()



const matchedRoute = superadminRoutes
  .filter((item) => path.startsWith(item.route))
  .sort((a, b) => b.route.length - a.route.length)[0];

const matchedSubitem = matchedRoute?.subitems
  .filter((subitem) => path.startsWith(subitem.route))
  .sort((a, b) => b.route.length - a.route.length)[0];



console.log('Text',path, matchedRoute?.route, matchedSubitem?.subitems)

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
        
        <div 
        className={`hidden md:block w-[250px] relative`}>

          <div className="flex h-full max-h-screen flex-col gap-2 bg-zinc-950 border-r-[1px] border-zinc-800"
          style={{backgroundImage:"url('/dashboard/Side Panel.png')", backgroundSize:'cover', backgroundPosition:'right'}}
          >
             <div className=' flex items-center justify-center h-auto py-4'>
                <img src="/dashboard/LOGO.png" alt="" width={130} height={130} />
             </div>
            <div className="flex-1 overflow-y-auto">
              <nav className=" flex flex-col gap-2 px-2 text-sm font-medium lg:px-4">

                {superadminRoutes.map((item, index) => (
                  <>
                  {item.subitems?.length === 0 ? (
                    <Link
                    key={index}
                    href={item.route}
                    className={` ${path.includes(item.route) ? ' text-yellow-400' : 'text-white hover:text-amber-300 '}   text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  ): (
                    <Accordion key={index} type="single" collapsible>
                    <AccordionItem value="item-1">
                      <div className={`  px-3 flex items-center w-full gap-2 ${path.includes(item.name.toLowerCase()) ? 'text-yellow-400' : 'text-zinc-100 hover:text-amber-300' }`}>
                       
                        <AccordionTrigger className=' w-[160px] text-sm'> 
                          <div className=' flex items-center gap-2'>
                          {item.icon}{item.name}
                          </div>
                          </AccordionTrigger>
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
          <header className=" sticky top-0 z-40 flex items-center justify-between gap-4 bg-zinc-950 p-4 py-3"
          style={{backgroundImage:"url('/dashboard/Header TAB.png')", backgroundSize:'cover', backgroundPosition:'bottom'}}
          
          >
            <div className=' w-8 bg-gradient-to-r from-red-950 to-red-950/0 absolute left-0 h-full'>

            </div>

            <div className=' flex items-center gap-4 ml-4'>
              <img src="/logo.png" alt="" width={50} height={50} className=' lg:hidden block' />
              <div className=' flex flex-wrap items-center text-amber-950'>
                  <a
                    href='/superadmin/dashboard'
                    className=' font-bold text-[.7rem] md:text-sm'
                  >
                    Dashboard
                  </a>

                 {matchedRoute && (
                    <>
                      <ChevronRight size={20} />
                      {matchedRoute.subitems && matchedRoute.subitems.length > 0 ? (
                        <span className=' font-bold text-[.7rem] md:text-sm'>
                          {matchedRoute.name}
                        </span>
                      ) : (
                        <a
                          href={matchedRoute.route}
                          className=' font-bold text-[.7rem] md:text-sm'
                        >
                          {matchedRoute.name}
                        </a>
                      )}
                    </>
                  )}


                  {matchedSubitem && (
                    <>
                      <ChevronRight size={20} />
                      <a
                        href={matchedSubitem.route}
                        className=' font-bold text-[.7rem] md:text-sm'
                      >
                        {matchedSubitem.name}
                      </a>
                    </>
                  )}
                </div>

            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="shrink-0 lg:hidden bg-amber-950 p-1 rounded-md"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col bg-zinc-950 border-r-2 border-zinc-800 "
            style={{backgroundImage:"url('/dashboard/Side Panel.png')", backgroundSize:'cover', backgroundPosition:'right'}}
              
              >
                <div className=' flex items-center justify-center gap-2 text-white p-4'>
                  <img src="/logo.png" alt="" width={100} height={100} />
                 
                </div>
                <nav className=" flex flex-col gap-2 px-2 text-sm font-medium lg:px-4">
                  {superadminRoutes.map((item, index) => (
                    <>
                    {item.subitems?.length === 0 ? (
                      <Link
                      key={index}
                      href={item.route}
                      className={` ${path.includes(item.route) ? ' text-yellow-400' : 'text-white hover:text-amber-300 '}   text-sm flex items-center gap-3 rounded-lg px-3  py-2 transition-all`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                    ): (
                      <Accordion key={index} type="single" collapsible>
                      <AccordionItem value="item-1">
                        <div className={`  px-3 flex items-center w-full gap-2 ${path.includes(item.name.toLowerCase()) ? 'text-yellow-400' : 'text-zinc-100 hover:text-amber-300' }`}>
                        
                          <AccordionTrigger className=' w-[160px] text-sm'> 
                            <div className=' flex items-center gap-2'>
                            {item.icon}{item.name}
                            </div>
                            </AccordionTrigger>
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
              <DropdownMenuTrigger className=' lg:block hidden '>
                <div className=" flex items-center gap-2">
                  <div className=' flex flex-col items-end text-amber-950'>
                    <p className=' text-sm font-bold'>Name</p>
                    <p className=' text-xs'>Superadmin</p>

                  </div>
                  <img src="/dashboard/small LOGO.png" alt="user" width={60} height={60} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className=' text-sm'>Superadmin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=' text-xs' ><a href="/">Logout</a></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className=" w-full relative flex flex-1 flex-col items-center gap-4 bg-zinc-900">
              {children}
          </main>
        </div>
      </div>
  )
}
