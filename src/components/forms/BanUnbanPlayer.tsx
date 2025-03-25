import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { LoaderCircle, OctagonAlert } from 'lucide-react';
import { StatusDot } from '../common/SelectStatus';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useBanUnbanPlayer } from '@/client_actions/superadmin/manageplayer';
import Loader from '../common/Loader';

type Data = {
    userid: string
}
export default function BanUnbanPlayer(data: Data) {
    const [status, setStatus] = useState('')
    const {mutate: banunbanPlayer, isPending} = useBanUnbanPlayer()
      const [open, setOpen] = useState(false)
    


      const banUnban = () => {
        if(status){
            banunbanPlayer({userid: data.userid, status: status} , {
                onSuccess: () => {
                  toast.success(`Account ${status === 'active' ? "unbanned" : 'banned'} successfully.`);
                    setStatus('')
                    setOpen(false)
                },
              })
        } else {
            toast.error(`Please select status to proceed.`);
        }
       
       }
      
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger>
      <button className="bg-zinc-500 flex items-center gap-1 px-3 py-1 text-xs rounded-md">
        <OctagonAlert size={15} className="text-red-500" /> Ban / Unban
      </button>
    </DialogTrigger>
    <DialogContent className="w-full h-auto p-6 max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Are you absolutely sure you want to ban this user?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <Label htmlFor="select-32">Status select</Label>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger
          id="select-32"
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-[200px]"
        >
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectItem value="active">
            <span className="flex items-center gap-2">
              <StatusDot className="text-green-600" />
              <span className="truncate">Unban</span>
            </span>
          </SelectItem>

          <SelectItem value="banned">
            <span className="flex items-center gap-2">
              <StatusDot className="text-red-500" />
              <span className="truncate">Ban</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
      <Button disabled={isPending} onClick={() => banUnban()} className="w-fit">
        {/* <LoaderCircle className="-ms-1 me-2 animate-spin" size={16} strokeWidth={2} aria-hidden="true" /> */}
        {isPending && <Loader/>}
        Continue
      </Button>
    </DialogContent>
  </Dialog>
  )
}
