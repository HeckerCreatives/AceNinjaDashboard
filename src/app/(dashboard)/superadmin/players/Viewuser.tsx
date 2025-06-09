import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Boxes, Check, Eye, List, Menu, Navigation, ShoppingBag, Ticket, Users } from 'lucide-react'
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
import { useGetCharacters } from '@/client_actions/superadmin/dashboard';
import useCharacterNameStore from '@/hooks/characterUsername';
import TransactionHsitory from './viewuser/TransactionHsitory';
  

const viewnavigation = [
    {name: 'Dashboard', path: 'dashboard' , icon: <GiWhirlpoolShuriken size={20}/>},
    {name: 'Inventory', path: 'inventory' , icon: <Boxes size={20}/>},
    {name: 'PVP', path: 'pvp' , icon: <TbSwords size={20}/>},
    {name: 'Path', path: 'path' , icon: <PiPath size={20}/>},
    {name: 'Skills', path: 'skills' , icon: <GiWhirlpoolShuriken size={20}/>},
    {name: 'Battle Pass', path: 'bp' , icon: <Ticket size={20}/>},
    {name: 'Friends', path: 'friends' , icon: <Users size={20}/>},
    {name: 'Transaction History', path: 'history' , icon: <List size={20}/>},
]

type Characters = {
    username: string, 
    id: string
}

type Props = {
    userid: string
    characterid: string
    characters: Characters[]
    name: string
}

export default function Viewuser( data: Props) {
    const {data: characters,isLoading} = useGetCharacters(data.userid)
    const [tab, setTab] = useState('dashboard')
    const [open, setOpen] = useState(false);
    const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
    const { charactername, setCharactername} = useCharacterNameStore()
    

    useEffect(() => {
        if (characters && characters.length > 0) {
          setCharacterid(characters[0].id);
          setCharactername(characters[0].username)
        }
    }, [data, setCharacterid]); 

    console.log(characters)


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

                    <DropdownMenu>
                    <DropdownMenuTrigger className=" bg-white px-2 rounded-md">
                        <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end text-amber-950">
                            <p className="text-sm font-bold">{data.name}</p>
                            <p className="text-xs">Player</p>
                        </div>
                        <img src="/dashboard/small LOGO.png" alt="user" width={60} height={60} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className=" min-w-[170px]">
                    
                        <DropdownMenuLabel className="text-xs font-medium">Characters</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {data.characters?.map((item, index) => (
                        <DropdownMenuItem key={item.id} onClick={() => setCharacterid(item.id)} className="text-xs cursor-pointer">
                            {characterid === item.id ? (
                            <Check size={5} className=" text-green-400"/>
                            ): (
                            <>
                            <div className=" w-4"></div></>
                            )}
                        {item.username}
                        </DropdownMenuItem>
                        ))}
                    
                    
                    </DropdownMenuContent>
                    </DropdownMenu>
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

                <DropdownMenu>
                    <DropdownMenuTrigger className=" bg-white px-2 rounded-md">
                        <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end text-amber-950">
                            <p className="text-sm font-bold">{data.name}</p>
                            <p className="text-xs">Player</p>
                        </div>
                        <img src="/dashboard/small LOGO.png" alt="user" width={60} height={60} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className=" min-w-[170px]">
                    
                        <DropdownMenuLabel className="text-xs font-medium">Characters</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {data.characters?.map((item, index) => (
                        <DropdownMenuItem key={item.id} onClick={() => setCharacterid(item.id)} className="text-xs cursor-pointer">
                            {characterid === item.id ? (
                            <Check size={5} className=" text-green-400"/>
                            ): (
                            <>
                            <div className=" w-4"></div></>
                            )}
                        {item.username}
                        </DropdownMenuItem>
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

                 {tab === 'history' && (
                    <TransactionHsitory/>
                )}

               
            </div>

           

          </DialogContent>
        </Dialog>
  )
}
