import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Pen, Plus, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

  

export default function Playertable() {
  return (
    <div className=' flex flex-col gap-6 bg-zinc-950 p-4 w-full h-[600px]'>
      <div className=' w-full flex items-center justify-between text-sm'>
       
        <Dialog>
        <DialogTrigger>
          <button className=' active-gradient px-4 py-2 text-sm flex items-center gap-1'><Plus size={15}/>Create News</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create News</DialogTitle>
            <DialogDescription>
             <form action="" className=' text-sm mt-4 flex flex-col'>
              <label htmlFor="">Title</label>
              <input type="text" placeholder='Title' className=' input' />

              <label htmlFor="" className=' mt-4'>Description</label>
              <textarea placeholder='Title' className=' input h-[150px]' />

              <Tabs defaultValue="image" className="w-full mt-6">
                <TabsList>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
                <TabsContent value="image">
                  <div className=' w-full py-8 bg-zinc-900 flex items-center justify-center'>
                    <input type="file"  className=' text-xs file:bg-zinc-800 file:text-white file:px-4 file:py-2 file:rounded-md'/>
                  </div>
                </TabsContent>
                <TabsContent value="video">
                  <div className=' w-full py-8 bg-zinc-900 flex items-center justify-center'>
                    <input type="file"  className=' text-xs file:bg-zinc-800 file:text-white file:px-4 file:py-2 file:rounded-md'/>

                  </div>
                </TabsContent>
              </Tabs>

              <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
                <button className=' bg-zinc-800 px-6 py-2 rounded-md'>Cancel</button>
                <button className=' active-gradient px-6 py-2 rounded-md'>Save</button>

              </div>


             </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      </div>
    <Table>
    <TableCaption>A list of your items</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="">News Id</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
      
        <TableHead className="">Action</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="">00011</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Description</TableCell>
        <TableCell className=" flex items-center gap-4">
          <button className=' btn-primary'><Trash2 size={15} className=' text-red-500'/> Delete</button>

          <Dialog>
            <DialogTrigger>
            <button className=' btn-primary'><Pen size={15} className=' text-amber-300'/> Edit</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit News</DialogTitle>
                <DialogDescription>
                <form action="" className=' text-sm mt-4 flex flex-col'>
                  <label htmlFor="">Title</label>
                  <input type="text" placeholder='Title' className=' input' />

                  <label htmlFor="" className=' mt-4'>Description</label>
                  <textarea placeholder='Title' className=' input h-[150px]' />

                  <Tabs defaultValue="image" className="w-full mt-6">
                    <TabsList>
                      <TabsTrigger value="image">Image</TabsTrigger>
                      <TabsTrigger value="video">Video</TabsTrigger>
                    </TabsList>
                    <TabsContent value="image">
                      <div className=' w-full py-8 bg-zinc-900 flex items-center justify-center'>
                        <input type="file"  className=' text-xs file:bg-zinc-800 file:text-white file:px-4 file:py-2 file:rounded-md'/>
                      </div>
                    </TabsContent>
                    <TabsContent value="video">
                      <div className=' w-full py-8 bg-zinc-900 flex items-center justify-center'>
                        <input type="file"  className=' text-xs file:bg-zinc-800 file:text-white file:px-4 file:py-2 file:rounded-md'/>

                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
                    <button className=' bg-zinc-800 px-6 py-2 rounded-md'>Cancel</button>
                    <button className=' active-gradient px-6 py-2 rounded-md'>Save</button>

                  </div>


                </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TableCell>
        </TableRow>
    </TableBody>
    </Table>

    </div>
  )
}
