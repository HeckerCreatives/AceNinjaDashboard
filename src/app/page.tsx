'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./loader";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true); 

  useEffect(() => {
    const sessionToken = Cookies.get("sessionToken");

    if (!sessionToken) {
      router.replace("/auth/login");
    } else {
      setIsChecking(false); 
      router.replace("/auth/login");

    }
  }, []);

  
  if (isChecking) {
    return <div className="flex items-center justify-center min-h-screen">
      <Loader/>
    </div>;
  }
}
