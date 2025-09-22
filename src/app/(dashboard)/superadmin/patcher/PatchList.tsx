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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PatchUploadDialog } from './Upload'
import { useGetPatchFileList } from '@/client_actions/gamepatch/patch'
import DeletePatchFile from './DeletePatch'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'

export type FileUploadItem = {
    id: string
    file: File
    progress: number
    status: "pending" | "uploading" | "completed" | "error"
    error?: string
}
  

export default function PatchList() {
  const [filter, setFilter] = useState('StandaloneWindows64')
  const {data: patch, isPending} = useGetPatchFileList(filter,'')
  const [open, setOpen] = useState(false) 
  const [files, setFiles] = useState<FileUploadItem[]>([])
  const [overallProgress, setOverallProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)


  return (
    <div className=' bg-zinc-950 p-4 w-[95%] h-fit border-[1px] border-amber-900 rounded-md mt-12'>

      <p className=' text-xl font-semibold mb-6'>Patch</p>

      <div className=' flex items-center justify-between'>
        <PatchUploadDialog files={files} setFiles={setFiles} open={open} setOpen={setOpen} overallProgress={overallProgress} setOverallProgress={setOverallProgress} loading={loading} setLoading={setLoading} uploading={uploading} setUploading={setUploading}/>

         <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Select patch type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="StandaloneWindows64">Windows</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                  </SelectContent>
                </Select>
      </div>

      {(!open && uploading) && (
        <div className=' flex flex-col gap-2 max-w-sm mt-6'>
          <p className=' text-xs text-zinc-300'>Uploading files ({files.filter((item) => item.status === 'completed').length}/{files.length})...</p>
          <Progress value={overallProgress} className="h-2 [&>div]:bg-green-500" />
           {files.some((f) => f.status === "uploading") && (
                <p className="text-xs text-green-500">
                    Uploading{" "}
                    {files
                    .filter((f) => f.status === "uploading")
                    .map((f) => f.file.name)
                    .join(", ")}
                </p>
                )}

        </div>
      )}


    <Table className=' bg-zinc-900 mt-6'>
       {patch?.data.files.length === 0 && (
                 <TableCaption className=' text-xs'>No files</TableCaption>
                 )}
                 {isPending && (
                 <TableCaption className=' text-xs'><div className=' loader'></div></TableCaption>
      
                 )}
    <TableHeader>
        <TableRow>
        <TableHead className="">File Name</TableHead>
        <TableHead>File Size</TableHead>
        <TableHead>File Type</TableHead>
        <TableHead>Date Uploaded</TableHead>
        <TableHead className="">Action</TableHead>
      
        </TableRow>
    </TableHeader>
    <TableBody className=' text-xs'>
      {patch?.data.files.map((item, index) => (
        <TableRow key={item.id}>
        <TableCell className="">
          < Link href={`${process.env.NEXT_PUBLIC_API_URL}/addressables/download?path=${item.path}`} target='_blank' className=' underline cursor-pointer'>
          {item.filename}
          </Link>

        </TableCell>
        <TableCell className="">
          {item.filesizeMB}.mb
        </TableCell>
        <TableCell className="">{item.extension}</TableCell>
        <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
        <TableCell className="">
          <DeletePatchFile id={item.id} data={item}/>
        </TableCell>
        </TableRow>
      ))}
        
    </TableBody>
    </Table>

      {/* {patch?.data && (
        <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

        )} */}


    </div>
  )
}
