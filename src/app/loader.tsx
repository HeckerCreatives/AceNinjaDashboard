import React from 'react'

export default function Loader() {
  return (
    <div className=' w-full h-screen flex items-center justify-center gap-4'>
        <img src="/logo.png" alt="" width={100}height={100} className=' animate-pulse' />
        {/* <div className=' loader'></div> */}

    </div>
  )
}
