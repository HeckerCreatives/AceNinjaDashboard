"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { Check, Cog, LogOut, Menu, Settings } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { userRoutes } from "@/types/route";
import Loader from "@/app/loader";
import { useGetCharacters } from "@/client_actions/user/characters/characters";
import useCharacterStore from "@/hooks/character";
import toast from "react-hot-toast";
import useCharacterNameStore from "@/hooks/characterUsername";
import useDialogStore from "@/hooks/globals";
import ChangePasswordUser from "../forms/ChangePassword";
import usePlayerNameStore from "@/hooks/player";
import { useUserData } from "@/client_actions/user/dashboard/dashboard";
import Image from "next/image";
import usePasswordChangeStore from "@/hooks/change-password";
import { handleApiError } from "@/lib/errorHandler";
import axiosInstance from "@/lib/axiosInstance";


export default function Userlayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const {data,isLoading} = useGetCharacters()
  const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
  const { charactername, setCharactername} = useCharacterNameStore()
  const {isOpen} = usePasswordChangeStore()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { data: chardata } = useUserData(characterid)

  //charcter id persist
 useEffect(() => {
  if (data && data.length > 0) {
    setCharacterid(data[0].id);
    console.log('Data 0', data[0].id)
    setCharactername(data[0].username);
    console.log('Data 1', data[0].username)

  }

  setOpen(isOpen)
}, [data]);

 const logout = async () => {
  try {
    const response = await axiosInstance.get("/auth/logout");

    toast.success('Logging out...')
    router.replace('/auth/login')

   
  } catch (error) {
    handleApiError(error);
  } 
  };




  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-hidden">
      <div className="w-screen relative h-screen flex flex-col overflow-y-auto max-w-[1920px]">
        <header
          className="sticky flex flex-col gap-4 top-0 z-40 py-4 bg-zinc-950 px-8"
          style={{
            backgroundImage: "url('/dashboard/Header TAB.webp')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div className="flex h-14 items-center justify-between gap-4">
            <Image src="/dashboard/LOGO.webp" loading="lazy" alt="Logo" width={100} height={100} />

            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger className="lg:block hidden">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end text-amber-950">
                    <p className="text-sm font-bold">{chardata?.username}</p>
                    <p className="text-xs">Character</p>
                  </div>
                  <img src="/dashboard/small LOGO.png" alt="user" width={60} height={60} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className=" min-w-[170px]">
                {/* <DropdownMenuLabel className="text-sm">Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuLabel className="text-xs font-medium">Characters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {data?.map((item, index) => (
                   <DropdownMenuItem key={item.id} onClick={() => setCharacterid(item.id)} className="text-xs cursor-pointer">
                    {characterid === item.id ? (
                      <Check size={5} className=" text-green-400"/>
                    ): (
                      <>
                      <div className=" w-4"></div></>
                    )}
                   {/* <div className=" h-6 w-6 rounded-full bg-zinc-700"></div>  */}
                   {item.username}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs" onSelect={(e) => e.preventDefault()}>
                  <ChangePasswordUser/>
                </DropdownMenuItem>
                <DropdownMenuItem 
                onClick={logout}
                className="text-xs">
                  <LogOut size={10}/>Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <button className="shrink-0 lg:hidden bg-zinc-800 p-1 rounded-md">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col bg-zinc-950 border-r-2 border-zinc-900"
                style={{
                  backgroundImage: "url('/dashboard/Side Panel.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "right",
                }}
              >
                <div className="flex items-center gap-2 text-white p-4">
                  {/* <img src="/logo.webp" alt="" width={50} /> */}
                  <div className="flex flex-col">
                    <Image src="/logo.webp" alt="logo" height={80} width={80} loading="lazy" />
                  </div>
                </div>
                <nav className="grid gap-2 text-lg font-medium">
                  {userRoutes.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      className={`${
                        path.includes(item.path) ? "text-yellow-500" : "text-zinc-100"
                      } text-sm flex items-center gap-2 rounded-lg px-3 py-2 transition-all`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className=" w-full overflow-auto">
               <nav className="hidden gap-4 lg:flex text-sm font-medium bg-light w-fit rounded-lg px-6">
                {userRoutes.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className={`${
                      path.includes(item.path) ? "text-yellow-500" : "text-zinc-100"
                    } font-bold text-xs flex items-center gap-2 rounded-lg px-3 py-2 transition-all whitespace-nowrap`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              
              </nav>
          </div>

       
        </header>

        <main className="relative flex flex-1 flex-col items-center gap-4 bg-black">
          <div className="z-20 w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
