import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CircleAlert, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDeleteStoreItem } from '@/client_actions/superadmin/store'
import { Button } from '@/components/ui/button'
import Loader from '@/components/common/Loader'
import { FileItem, useDeletePatchFile } from '@/client_actions/gamepatch/patch'
  

interface Props {
    id: string
    data: FileItem
}

export default function DeletePatchFile(prop: Props) {
    const [open, setOpen] = useState(false)
    const {mutate: deletePatchFile, isPending} = useDeletePatchFile()
    
    
    
  const deleteItem = () => {
    deletePatchFile({ fileId: prop.id},
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
        <DialogTitle>Are you absolutely sure, you want to delete this file?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently file in database.
        </DialogDescription>
      </DialogHeader>

      <div className=' flex items-start gap-2 p-4 text-red-500'>
        <CircleAlert size={20}/>
        <p>{prop.data.filename}.{prop.data.extension}</p>
      </div>


      <div className=' w-full flex items-end justify-end'>
        <Button disabled={isPending} onClick={deleteItem} className=' w-fit'>
            {isPending && (<Loader/>)}
            Continue</Button>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}
