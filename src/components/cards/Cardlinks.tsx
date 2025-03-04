import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type Links = {
    image: React.ReactNode
    link: string
}

export default function Cardlinks( data: Links) {
  return (
    <div className=' flex flex-col gap-2 items-center justify-center max-w-[350px] w-full'>

       {data.image}

        <div className=' w-full flex flex-col gap-1 bg-light p-2 border-[1px] border-amber-800 rounded-sm'>
            <p className=' text-xs'>Link</p>
            <Input className=' w-full'/>

        </div>

        <div className=' w-full flex items-end justify-end'>
            <Button>Save</Button>

        </div>
    </div>
  )
}
