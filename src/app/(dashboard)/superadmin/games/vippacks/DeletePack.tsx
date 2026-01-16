import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDeleteStoreItem } from '@/client_actions/superadmin/store'
import { Button } from '@/components/ui/button'
import Loader from '@/components/common/Loader'
import { useDeleteVipPack } from '@/client_actions/superadmin/vip-packs'

interface Props {
    id: string
}

export default function DeletePack({id}: Props) {
    const [open, setOpen] = useState(false)
    const {mutate: deleteVipPack, isPending} = useDeleteVipPack()
    
    
    
  const deleteItem = () => {
    deleteVipPack({ packid: id},
        {  onSuccess: () => {
            toast.success('Successfully deleted.');
            setOpen(false)
          },})
  }
  return (
    <Dialog>
    <DialogTrigger className=' bg-red-600 w-fit h-fit p-2 rounded-md flex items-center text-xs font-semibold text-white'><Trash size={15}/></DialogTrigger>
    <DialogContent className=' h-auto max-w-[500px] p-6'>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure, you want to delete this item?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently item data in database.
        </DialogDescription>
      </DialogHeader>

      <div className=' w-full flex items-end justify-end'>
        <Button variant={'destructive'} disabled={isPending} onClick={deleteItem} className=' w-fit'>
            {isPending && (<Loader/>)}
            Continue</Button>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}
