'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ImageUp, Pen, Plus, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAnnouncement, CreateAnnouncement } from '@/schema/schema'
import CreateAnnouncementForm from '@/components/forms/CreaAnnouncementForm'
import PaginitionComponent from '@/components/common/Pagination'
import axios from 'axios'
import Loader from '@/components/common/Loader'

  

export default function Playertable() {
  const [image, setImage] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])

  
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CreateAnnouncement>({
    resolver: zodResolver(createAnnouncement),
  });

  const createGameAnnouncement = async ( data: CreateAnnouncement) => {
    console.log(data)
   
  }

  console.log(errors)

   //get list
   useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`,{
          withCredentials: true,
          headers:{
            'Content-Type': 'application/json'
          }
        })

      setLoading(false)
      } catch (error) {
      setLoading(false)

        
      }
    }
    getData()
  },[])


  
  return (
    <div className=' flex flex-col gap-6 bg-zinc-950 p-4 w-full h-[600px]'>
      <div className=' w-full flex items-center justify-between text-sm'>
       
        {/* <Dialog>
            <DialogTrigger>
              <button className=' active-gradient px-4 py-2 text-sm flex items-center gap-1'><Plus size={15}/>Create Announcement</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>
               
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(createGameAnnouncement)} className=' text-sm mt-4 flex flex-col'>
                  <label htmlFor="">Title</label>
                  <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-300'} `} {...register('title')} />
                  {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}


                  <label htmlFor="" className=' mt-4'>Description</label>
                  <textarea placeholder='Title' className={` input h-[120px] ${errors.title && 'border-[1px] focus:outline-none border-red-300'} `} {...register('description')} />
                  {errors.description && <p className=' text-[.6em] text-red-500'>{errors.description.message}</p>}


                  <Tabs defaultValue="image" className="w-full mt-6">
                    <TabsList>
                      <TabsTrigger value="image">Image</TabsTrigger>
                      <TabsTrigger value="video">Video</TabsTrigger>
                    </TabsList>
                    <TabsContent value="image">
                    <div className=' w-full h-[200px] bg-zinc-900 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-md'>
                      <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                        <div className=' w-full h-full flex flex-col items-center justify-center gap-2 text-xs'>
                          <ImageUp size={25}/>
                          <p>Click to upload</p>
                          <p>SPNG or JPG (MAX. 5mb)</p>

                          <p className=' text-zinc-400 mt-4'>{image}</p>
                        </div>

                        
                        <input value={image} onChange={(e) => setImage(e.target.value)} type="file" id='dropzone-file'  className=' hidden'/>
                      </label>
                    </div>
                    </TabsContent>
                    <TabsContent value="video">
                      <div className=' w-full h-[200px] bg-zinc-900 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-md'>
                      <label htmlFor="dropzone-file" className=' w-full h-full flex flex-col items-center justify-center'>

                        <div className=' w-full h-full flex flex-col items-center justify-center gap-2 text-xs'>
                          <ImageUp size={25}/>
                          <p>Click to upload</p>
                          <p>MP4 (MAX. 20mb)</p>

                          <p className=' text-zinc-400 mt-4'>{image}</p>
                        </div>

                        
                        <input value={image} onChange={(e) => setImage(e.target.value)} type="file" id='dropzone-file'  className=' hidden'/>
                      </label>
                    </div>
                    </TabsContent>
                  </Tabs>

                  <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
                    <button className=' bg-zinc-800 px-6 py-2 rounded-md'>Cancel</button>
                    <button className=' active-gradient px-6 py-2 rounded-md'>Save</button>

                  </div>


                </form>
            </DialogContent>
        </Dialog> */}

        <CreateAnnouncementForm>
        <button className=' active-gradient px-4 py-2 text-xs flex items-center gap-1'><Plus size={15}/>Create</button>
        </CreateAnnouncementForm>


      </div>
    <Table>
    {list.length === 0 &&  
      <TableCaption className=' text-xs text-zinc-500'>No data</TableCaption>
    }
          
    {loading === true && (
      <TableCaption className=' '>
        <Loader/>
      </TableCaption>
    )}
    <TableHeader>
        <TableRow>
        <TableHead className="">Id</TableHead>
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
                <DialogTitle>Edit Announcement</DialogTitle>
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

    <PaginitionComponent currentPage={0} total={0} onPageChange={handlePageChange}/>

    </div>
  )
}
