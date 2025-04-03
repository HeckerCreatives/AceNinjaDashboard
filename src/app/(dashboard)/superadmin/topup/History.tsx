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
import { useDeleteNewsletter, useGetNewsletter } from '@/client_actions/superadmin/newsletter'
import CreateNewsletterForm from '@/components/forms/CreateNewsletter'
import PaginitionComponent from '@/components/common/Pagination'
import Loader from '@/components/common/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import EditNewsletterForm from '@/components/forms/EditNewsletter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetTopuphistory } from '@/client_actions/superadmin/topup'

  

export default function TopupHistory() {
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const {data, isLoading} = useGetTopuphistory(currentPage, 10)
    const {mutate: deleteNewsletter, isPending} = useDeleteNewsletter()
    
  //paginition
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

   useEffect(() => {
     setTotalPage(data?.data.totalPages || 0)
    },[data])

   const deleteNewsletterdata = () => {
    deleteNewsletter({newsletterid: id}, {
        onSuccess: () => {
        toast.success(`Newsletter deleted successfully`);
          setOpen(false)
        },
    })
   }


  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Topup (History)</p>
            </div>


            <div className=' flex flex-col gap-4 p-4'>
                <Table className=' text-xs h-auto'>
                {data?.data.payinhistory.length === 0 && (
                    <TableCaption>No data.</TableCaption>
                    )}

                    {isLoading && (
                    <TableCaption>
                        <Loader/>
                    </TableCaption>
                    )}
                <TableHeader>
                    <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.payinhistory.map((item, index) => (
                        <TableRow key={item.id}>
                            
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.currency}</TableCell>
                            <TableCell>{item.value}</TableCell>
                           
                        </TableRow>
                    ))}
                
                </TableBody>
                </Table>

                
                    {data?.data.payinhistory.length !== 0 && (
                    <div className=' w-full flex items-center justify-center mb-4'>
                    <PaginitionComponent currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>

                    </div>

                    )}
            </div>
            
           
        </div>
            
        </div>

    

    </div>
  )
}
