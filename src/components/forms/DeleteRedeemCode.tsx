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
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { useDeleteRedeemCode } from '@/client_actions/superadmin/redeemcodes'
  

interface Props {
    id: string
}

export default function DeleteRedemCode(prop: Props) {
    const [open, setOpen] = useState(false)
    const {mutate: deleteRedeemCode, isPending} = useDeleteRedeemCode()
    
    
    
  const deleteItem = () => {
    deleteRedeemCode({ id: prop.id},
        {  onSuccess: () => {
            toast.success('Successfully deleted.');
            setOpen(false)
          },})
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-red-600 w-fit h-fit p-2 rounded-md flex items-center text-xs font-semibold text-white'><Trash size={15}/></DialogTrigger>
    <DialogContent className=' h-auto max-w-[500px] p-6'>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure, you want to delete this redeem code?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently redeem code data in database.
        </DialogDescription>
      </DialogHeader>

      <div className=' w-full flex items-end justify-end'>
        <Button disabled={isPending} onClick={deleteItem} className=' w-fit'>
            {isPending && (<Loader/>)}
            Continue</Button>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}
