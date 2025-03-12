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
import { Menu } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { userRoutes } from "@/types/route";
import Loader from "@/app/loader";

export default function Userlayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true); // <-- State to manage loading

  useEffect(() => {
    const sessionToken = Cookies.get("sessionToken");

    if (!sessionToken) {
      router.replace("/"); // Redirect if no session
    } else {
      setIsChecking(false); // Allow rendering after check
    }
  }, []);

  // 🔹 Show a loading screen while checking auth
  if (isChecking) {
    return <div className="flex items-center justify-center min-h-screen">
      <Loader/>
    </div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-hidden">
      <div className="w-screen relative h-screen flex flex-col overflow-y-auto max-w-[1920px]">
        <header
          className="sticky flex flex-col gap-4 top-0 z-40 py-4 bg-zinc-950 px-8"
          style={{
            backgroundImage: "url('/dashboard/Header TAB.png')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div className="flex h-14 items-center justify-between gap-4">
            <img src="/dashboard/LOGO.png" alt="Logo" width={100} />

            <DropdownMenu>
              <DropdownMenuTrigger className="lg:block hidden">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end text-amber-950">
                    <p className="text-sm font-bold">Name</p>
                    <p className="text-xs">User</p>
                  </div>
                  <img src="/dashboard/small LOGO.png" alt="user" width={60} height={60} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-sm">Username</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs">
                  <a href="/">Logout</a>
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
                  backgroundImage: "url('/dashboard/Side Panel.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "right",
                }}
              >
                <div className="flex items-center gap-2 text-white p-4">
                  <img src="/logo.webp" alt="" width={50} />
                  <div className="flex flex-col">
                    <img src="/logo.png" alt="" width={80} />
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

          <nav className="hidden gap-4 lg:flex text-sm font-medium bg-light w-fit rounded-lg px-6">
            {userRoutes.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`${
                  path.includes(item.path) ? "text-yellow-500" : "text-zinc-100"
                } font-bold text-xs flex items-center gap-2 rounded-lg px-3 py-2 transition-all`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </header>

        <main className="relative flex flex-1 flex-col items-center gap-4 bg-black">
          <div className="z-20 w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
