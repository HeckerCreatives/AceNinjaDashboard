"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Upload, File, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogTrigger } from "@radix-ui/react-dialog"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import Loader from "@/components/common/Loader"
import { FileUploadItem } from "./PatchList"
import { io, Socket } from "socket.io-client";
import { useSocket } from "@/utils/SocketConfig"


type Props = {
  setFiles: React.Dispatch<React.SetStateAction<FileUploadItem[]>>
  files: FileUploadItem[]
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  uploading: boolean,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>
  overallProgress: number
  setOverallProgress: React.Dispatch<React.SetStateAction<number>>
  loading: boolean,
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
}

export function PatchUploadDialog({setFiles, files, open, setOpen, overallProgress, setOverallProgress, loading, setLoading, uploading, setUploading}: Props) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [platform, setPlatform] = useState('StandaloneWindows64')
  const queryClient = useQueryClient()
  const socketRef = useSocket();

 

  const resetState = () => {
    setFiles([])
    setIsDragOver(false)
    setOverallProgress(0)
  }

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
  if (!selectedFiles) return

  const newFiles: FileUploadItem[] = []
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i]
    newFiles.push({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "pending",
    })
  }
  setFiles((prev) => [...prev, ...newFiles])

  if (fileInputRef.current) {
    fileInputRef.current.value = ""
  }
}, [])

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const getStatusIcon = (status: FileUploadItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <File className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const uploadFile = async (fileItem: FileUploadItem) => {
    const formData = new FormData()
    formData.append("addressableFile", fileItem.file)
    formData.append("platform", platform)
    formData.append("socketId", socketRef.current?.id || '')

    try {
      setFiles((prev) =>
        prev.map((f) => (f.id === fileItem.id ? { ...f, status: "uploading", progress: 0 } : f))
      )

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/patchnotefilemanager/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        // onUploadProgress: (progressEvent) => {
        //   if (progressEvent.total) {
        //     const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)

        //     setFiles((prev) =>
        //       prev.map((f) => (f.id === fileItem.id ? { ...f, progress: percent } : f))
        //     )

        //     setFiles((prev) => {
        //     const updatedFiles = prev.map((f) =>
        //         f.id === fileItem.id ? { ...f, progress: percent } : f
        //     )

        //     const totalProgress = updatedFiles.reduce((acc, f) => acc + f.progress, 0)
        //     const avgProgress = Math.round(totalProgress / updatedFiles.length)

        //     setOverallProgress(Number(avgProgress))

        //     return updatedFiles
        //     })

        //   }
        // },
      })

    

      setFiles((prev) =>
        prev.map((f) => (f.id === fileItem.id ? { ...f, status: "completed", progress: 100 } : f))
      )
    
    } catch (err) {

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id ? { ...f, status: "error", error: "Upload failed" } : f
        )
      )
    }
  }

  const uploadAllFiles = async () => {
    setLoading(true)
    setUploading(true)

    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      transports: ["websocket"],
    });
    

    for (const fileItem of files) {
      console.log(fileItem)

      socket.emit('game:patchstatus', {fileItem});
      console.log('emitted')
        if (fileItem.status === "pending") {

        await uploadFile(fileItem)
        }
    }

    setLoading(false)
    setUploading(false)
    toast.success("All files uploaded successfully")
    setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ["patchfile", platform, ""] })
    setOpen(false)
    resetState()
    }, 3000)
  }

  useEffect(() => {

     const socket = socketRef.current;
    if (!socket) return;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });


    socket.on("fileUploadStatus", (data) => {
      
      setFiles((prev) =>
        prev.map((f) => (f.file.name === data.name ? { ...f, progress: data.progress, status: data.staus } : f))
       )
      console.log("✅Progress:", data);
    });
    return () => {
      socket.disconnect();
    };
  }, [socketRef]);

  useEffect(() => {
     const updatedFiles = files.map((f) =>
        f.status === 'completed' ? {...f} : f
    )
    const totalProgress = updatedFiles.reduce((acc, f) => acc + f.progress, 0)
    const avgProgress = Math.round(totalProgress / updatedFiles.length)
    setOverallProgress(Number(avgProgress))
  },[files])




  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      // onOpenChange={(isOpen) => {
      //   setOpen(isOpen)
      //   if (!isOpen) resetState() 
      // }}
    >
      <DialogTrigger className=" w-fit px-3 py-2 bg-yellow-500 text-black flex items-center gap-2 text-xs rounded-md">
        <Plus size={15}/>Add Patch
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-h-[80%] h-fit p-6 bg-zinc-900 border-zinc-600 overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
        </DialogHeader>

        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select patch type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="StandaloneWindows64">Windows</SelectItem>
            <SelectItem value="iOS">iOS</SelectItem>
            <SelectItem value="Android">Android</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here, or click to select
            </p>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              Choose Files
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((fileItem) => (
                <div key={fileItem.id} className="flex items-center gap-3 p-3 border rounded-lg bg-zinc-800">
                  {getStatusIcon(fileItem.status)}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{fileItem.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(fileItem.file.size)}
                    </p>

                    {fileItem.status !== 'error' && (
                        <Progress value={fileItem.progress} className="mt-1 h-1 bg-zinc-500 [&>div]:bg-green-500" />
                    )}


                    {fileItem.error && (
                      <p className="text-xs text-red-500 mt-1">{fileItem.error}</p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileItem.id)}
                    disabled={fileItem.status === "uploading"}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-2">
                <p className="text-sm">Overall Progress</p>

                <Progress value={overallProgress} className="h-2 [&>div]:bg-green-500" />


                {files.some((f) => f.status === "uploading") && (
                <p className="text-sm text-green-500">
                    Uploading{" "}
                    {files
                    .filter((f) => f.status === "uploading")
                    .map((f) => f.file.name)
                    .join(", ")}
                </p>
                )}


                {files.every((f) => f.status === "completed") && (
                <p className="text-sm text-green-500 font-medium flex items-center gap-1">
                    <CheckCircle size={15}/> All {files.filter(f => f.status === "completed").length} files uploaded successfully
                </p>
                )}
                {files.every((f) => f.status === "error") && (
                <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                    <AlertCircle size={15} /> Failed to upload {files.filter(f => f.status === "error").length} files
                </p>
                )}

            </div>
            )}


          <div className="flex justify-end gap-2">
            {/* <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button> */}
            <Button disabled={loading} onClick={uploadAllFiles}>
                {loading && <Loader/>}
                {loading ? 'Uploading' : 'Upload'}</Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={loading}
        />
      </DialogContent>
    </Dialog>
  )
}
