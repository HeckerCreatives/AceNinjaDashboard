import React from 'react'
import { Undo2 } from 'lucide-react'

export default function Notfound() {
  return (
    <div className=' flex flex-col items-center justify-center gap-4 w-full h-screen bg-zinc-950'>
        <h2 className=' text-5xl font-bold text-amber-300'>404</h2>
        <p className=' text-sm text-zinc-300'>Page not found!</p>
        <a href="/">
            <button className=' px-6 py-2 bg-zinc-900 text-zinc-100 mt-6 flex items-center gap-2 text-xs rounded-full'>Main Page <Undo2 size={15}/></button>
        </a>
        
    </div>
  )
}
