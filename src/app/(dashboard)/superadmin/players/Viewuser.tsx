import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Boxes, Eye, Menu, Navigation, ShoppingBag, Ticket, Users } from 'lucide-react'
import { GiWhirlpoolShuriken } from "react-icons/gi";
import { TbSwords } from "react-icons/tb";
import { PiPath } from "react-icons/pi";
import Dashboard from './viewuser/Dashboard';
import Inventory from './viewuser/Inventory';
import Pvp from './viewuser/Pvp';
import Path from './viewuser/Path';
import Skills from './viewuser/Skills';
import BattlePass from './viewuser/BattlePass';
import Friends from './viewuser/Friends';
import Purchase from './viewuser/Purchase';
import { IoClose } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import useCharacterStore from '@/hooks/character';
  

const viewnavigation = [
    {name: 'Dashboard', path: 'dashboard' , icon: <GiWhirlpoolShuriken size={20}/>},
    {name: 'Inventory', path: 'inventory' , icon: <Boxes size={20}/>},
    {name: 'PVP', path: 'pvp' , icon: <TbSwords size={20}/>},
    {name: 'Path', path: 'path' , icon: <PiPath size={20}/>},
    {name: 'Skills', path: 'skills' , icon: <GiWhirlpoolShuriken size={20}/>},
    {name: 'Battle Pass', path: 'bp' , icon: <Ticket size={20}/>},
    {name: 'Friends', path: 'friends' , icon: <Users size={20}/>},
    // {name: 'Purchase', path: 'purchase' , icon: <ShoppingBag size={20}/>},
]

type Props = {
    userid: string
    characterid: string
}

export default function Viewuser( data: Props) {
    const [tab, setTab] = useState('dashboard')
    const [open, setOpen] = useState(false);
    const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();


  return (
    <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger onClick={() => setCharacterid(data.characterid)} className=''>
          <p className=' bg-blue-500 flex items-center gap-1 px-3 py-1 text-xs rounded-md'><Eye size={15}/> View user</p>
         
          </DialogTrigger>
          <DialogContent className=' flex flex-col items-center min-h-[90%] w-[90%] border-[1px] border-amber-500 overflow-y-auto'>
            <nav className="sticky hidden top-0 w-full bg-light lg:flex items-center justify-between gap-4 px-4 py-2 z-10">
                <div className='flex items-center gap-4'>
                    {viewnavigation.map((item, index) => (
                    <React.Fragment key={index}>
                    {index > 0 && (
                        <div className="flex h-10">
                        <div className="border-l-2 border-zinc-950"></div>
                        <div className="border-r-2 border-red-900"></div>
                        </div>
                    )}
                    <p onClick={() => setTab(item.path)} className={` cursor-pointer font-semibold text-sm flex items-center gap-1 px-2 ${tab === item.path && 'text-yellow-500'}`}>
                        {item.icon} {item.name}
                    </p>
                    </React.Fragment>
                ))}
                </div>

                <button onClick={() => setOpen(!open)} className=''>
                <IoClose size={30} className=' text-yellow-500'/>
                </button>
            
            </nav>

            <nav className="sticky lg:hidden top-0 w-full bg-light flex items-center justify-between gap-4 px-4 py-2 z-10">
                <div className='flex items-center gap-4'>
                <DropdownMenu>
                <DropdownMenuTrigger className=' bg-amber-900 p-1 rounded-md'>
                    <Menu size={15}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=' translate-x-8'>
                    <DropdownMenuLabel className=' text-sm'>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {viewnavigation.map((item, index) => (
                    <DropdownMenuItem onClick={() => setTab(item.path)} className={`text-xs ${item.path === tab && ' text-yellow-500'}`}>{item.icon}{item.name}</DropdownMenuItem>
                    ))}
                   
                </DropdownMenuContent>
                </DropdownMenu>

                </div>

                <button onClick={() => setOpen(!open)} className=''>
                <IoClose size={30} className=' text-yellow-500'/>
                </button>
            
            </nav>
        

            <div className=' w-full flex items-center justify-center h-auto'>
                {tab === 'dashboard' && (
                    <Dashboard/>
                )}

                {tab === 'inventory' && (
                    <Inventory/>
                )}

                {tab === 'pvp' && (
                    <Pvp/>
                )}

                {tab === 'path' && (
                    <Path/>
                )}

                {tab === 'skills' && (
                    <Skills/>
                )}

                {tab === 'bp' && (
                    <BattlePass/>
                )}

                {tab === 'friends' && (
                    <Friends/>
                )}

                {tab === 'purchase' && (
                    <Purchase/>
                )}
            </div>

          </DialogContent>
        </Dialog>
  )
}
