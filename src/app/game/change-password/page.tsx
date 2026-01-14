"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GameChangePassword() {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem("redirect", "change_password")
    router.replace("/auth/login")
  }, [])

  return null
}
