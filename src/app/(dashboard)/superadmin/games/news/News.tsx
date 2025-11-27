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
import { Plus, Trash } from 'lucide-react'
import CreateNewsForm from '@/components/forms/CreateNewsForm'
import Pagination from '@/components/common/Pagination'
import { useDeleteNews, useGetNews } from '@/client_actions/superadmin/website'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import Loader from '@/components/common/Loader'
import EditNewsForm from '@/components/forms/EditNews'
  
  

export default function News() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const {mutate: deleteNews , isPending} = useDeleteNews()
    const [open, setOpen] = useState(false)
    const {data, isLoading} = useGetNews(currentPage, 10)



     //paginition
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        if(data){
        setTotalPage(data.totalPages)
        }
    },[data])


    const deleteNewsData = (id: string) => {
        deleteNews({id: id},{
            onSuccess: () => {
                toast.success(`News deleted successfully.`);
                  setOpen(false)
              },
        })
    }

    const extractVideoId = (url: string): string | null => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

     const truncateText = (text: string, maxLength = 300) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + "..."
    }

  return (
    <div className=' w-full'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>News</p>
            </div>

            <div className=' flex flex-col gap-4 p-4'>
                <CreateNewsForm/>
                <Table className=' text-xs'>
                {data?.data.length === 0 && (
                <TableCaption>No data.</TableCaption>
                )}
                
                {isLoading && (
                <TableCaption>
                    <Loader/>
                </TableCaption>
                )}
                <TableHeader>
                    <TableRow>
                    <TableHead className=' w-[300px]'>Image / Video Link</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item, index) => (
                        <TableRow key={item.id}>
                        <TableCell>
                            {item.type === 'image' ? (
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`} alt="img" width={200} loading='lazy' className=' aspect-video'/>
                            ): (
                                <a href={item.url} target='_blank'>
                                    <img 
                                        src={`https://img.youtube.com/vi/${extractVideoId(item.url)}/hqdefault.jpg`} 
                                        alt="video thumbnail" 
                                        width={200}
                                        className=' aspect-video' loading='lazy'
                                        
                                    />
                                </a>
                                
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="space-y-2 ">
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-[700px]">{truncateText(item.content)}</p>
                            
                            <Dialog>
                                <DialogTrigger asChild>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-primary hover:underline"
                                >
                                    See more
                                </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] max-h-[80vh] h-fit overflow-y-auto p-8">
                                <DialogHeader>
                                    <DialogTitle>{item.title}</DialogTitle>
                                    <DialogDescription className=' text-xs mt-4'>Full news description</DialogDescription>
                                </DialogHeader>
                                <div className="mt-4">
                                    <p className="text-sm leading-relaxed text-foreground">{item.content}</p>
                                </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        </TableCell>
                        <TableCell className=' flex items-center gap-2 h-[150px]'>
                            <EditNewsForm title={item.title} content={item.content} type={item.type} url={item.url} id={item.id}/>
                            <Dialog>
                            <DialogTrigger className=' flex items-center gap-1 bg-red-600 p-1 rounded-sm text-xs'>
                                <Trash size={15}/>
                            </DialogTrigger>
                            <DialogContent className=' max-w-[500px] h-auto p-6'>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure, you want to delete this news?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the news.
                                </DialogDescription>
                                </DialogHeader>

                                <div className=' w-full flex items-end justify-end'>
                                    <Button disabled={isPending} onClick={() => deleteNewsData(item.id)}>
                                        {isPending && <Loader/>}
                                        Continue</Button>
                                </div>
                            </DialogContent>
                            </Dialog>

                        </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
                </Table>

                {data?.data.length !==0 && (
                <Pagination currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

                )}
            </div>

           
        </div>
            
        </div>

    

    </div>
  )
}
