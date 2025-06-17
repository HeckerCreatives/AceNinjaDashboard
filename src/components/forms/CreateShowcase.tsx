'use client'
import React, { useEffect, useState } from 'react'
import { AlignCenter, ImageUp, Plus} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateNews } from '@/client_actions/superadmin/website'
import { createNewsData, CreateNewsData, CreateShowcaseItem, createShowcaseSchema } from '@/validation/schema'
import toast from 'react-hot-toast'
import { Input } from '../ui/input'
import { useGetAllItems, useGetAllSkills, useGetItemsAdmin } from '@/client_actions/superadmin/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCreateShowcaseItem } from '@/client_actions/superadmin/news'
import Loader from '../common/Loader'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetItemRewards } from '@/client_actions/superadmin/itemrewards'


const tabs = [
  'Image',
  'Video',
]



export default function CreateShowcaseForm() {
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState('outfit')
    const [item, setItem] = useState('')
    const [male, setMale] = useState('')
    const [itemlist, setItemlist] = useState<{ itemid: string; itemtype: string }[]>([])
    const [female, setFemale] = useState('')
    const {mutate: createShowcaseItem, isPending} = useCreateShowcaseItem()
    const {data, isLoading} = useGetAllItems(['skills','freebie','chests','crystalpacks','goldpacks','skins'])
    const {data: others} = useGetItemRewards('weapon', 'unisex')
    const {data: maleitems} = useGetItemRewards('outfit', 'male')
    const {data: femaleitems} = useGetItemRewards('outfit', 'female')


  
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateShowcaseItem>({
      resolver: zodResolver(createShowcaseSchema),
    });

    const createShowcaseData = async ( data: CreateShowcaseItem) => {
      if(filter === 'weapon' && item === ''){
          toast.error(`Please select a ${filter}.`);
      } else if(filter === 'outfit' && male === ''){
          toast.error(`Please select a male ${filter}.`);
      } else if(filter === 'outfit' && female === ''){
          toast.error(`Please select a female ${filter}.`);
      } else {
         console.log(data)
         createShowcaseItem({title: data.title, items: itemlist, itemtype: filter},{
           onSuccess: () => {
             toast.success(`Showcase item created successfully`);
             setOpen(false)
           },
         })
      }
     
    }

    //reset form value
    useEffect(() => {
        reset()
    },[open])


    useEffect(() => {
      setItemlist([])
      setItem('')
      setMale('')
      setFemale('')
    }, [filter])

   const handleWeaponChange = (value: string) => {
      setItem(value);
      setItemlist([{ itemid: value, itemtype: 'weapon' }]);
    };

    const handleMaleChange = (value: string) => {
      setMale(value);
      setItemlist((prev) => {
        const femaleItem = prev.find(i => i.itemtype === 'outfit');
        return [
          { itemid: value, itemtype: 'outfit' },
          ...(femaleItem ? [femaleItem] : [])
        ];
      });
    };

    const handleFemaleChange = (value: string) => {
      setFemale(value);
      setItemlist((prev) => {
        const maleItem = prev.find(i => i.itemtype === 'outfit');
        return [
          ...(maleItem ? [maleItem] : []),
          { itemid: value, itemtype: 'outfit' }
        ];
      });
    };


    console.log(itemlist)


 
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Create
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto max-h-[90%] border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Showcase Item</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createShowcaseData)} className=' text-xs flex flex-col gap-2 p-6'>

        <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Title</label>
          <input type="text" placeholder='Title' className={` input ${errors.title && 'border-[1px] focus:outline-none border-red-500'} `} {...register('title')} />
          {errors.title && <p className=' text-[.6em] text-red-500'>{errors.title.message}</p>}
        </div>

         <div className=' flex flex-col items-start gap-4 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <DropdownMenu>
            <DropdownMenuTrigger className=' bg-amber-800 px-3 py-1 rounded-sm flex items-center gap-1'><AlignCenter size={15}/>Type : {filter}</DropdownMenuTrigger>
            <DropdownMenuContent className=' bg-amber-800'>
              <DropdownMenuLabel className=' text-xs'>Select</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className={` text-xs cursor-pointer ${filter === 'outfit' && 'text-yellow-500'}`} onClick={() => setFilter('outfit')}>Outfit</DropdownMenuItem>
              <DropdownMenuItem className={` text-xs cursor-pointer ${filter === 'weapon' && 'text-yellow-500'}`} onClick={() => setFilter('weapon')}>Weapon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {filter === 'weapon' ? (
            <div className=' flex flex-col gap-2 w-full'>
            <label htmlFor="">Weapon</label>
            <Select value={item} 
             onValueChange={handleWeaponChange}
            >
              <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Item" />
              </SelectTrigger>
              <SelectContent>
                  {others?.data.items.map((item, index) => (
                  <SelectItem key={index} value={item.itemid}>{item.name}</SelectItem>
                  ))}

              </SelectContent>
            </Select>
            </div>
          ) : (
             <div className=' flex items-center gap-4 w-full'>
             <div className=' flex flex-col gap-2 w-full'>
               <label htmlFor="">Male</label>
                <Select  value={male} onValueChange={handleMaleChange}>
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Item" />
                  </SelectTrigger>
                  <SelectContent>
                      {maleitems?.data.items.map((item, index) => (
                      <SelectItem key={index} value={item.itemid}>{item.name}</SelectItem>
                      ))}

                    
                      
                  </SelectContent>
                </Select>
             </div>

             <div className=' flex flex-col gap-2 w-full'>
               <label htmlFor="">Female</label>
                <Select value={female} onValueChange={handleFemaleChange}>
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Item" />
                  </SelectTrigger>
                  <SelectContent>
                     {femaleitems?.data.items.map((item, index) => (
                      <SelectItem key={index} value={item.itemid}>{item.name}</SelectItem>
                      ))}

                  </SelectContent>
                </Select>
             </div>
           
            </div>
          )}
          
        </div>

         {/* <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
          <label htmlFor="">Item Type</label>
          <Select onValueChange={(value) => setValue("itemtype", value, { shouldValidate: true })}>
            <SelectTrigger className="w-full bg-zinc-900 border-none">
                <SelectValue placeholder="Select Item Type" />
            </SelectTrigger>
            <SelectContent>
           
                <SelectItem value="outfit">Outfit</SelectItem>
                <SelectItem value="weapon">Weapon</SelectItem>
              
            </SelectContent>
            </Select>
          {errors.itemtype && <p className=' text-[.6em] text-red-500'>{errors.itemtype.message}</p>}
        </div> */}

        

        <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
        <button
                                 type="submit"
                                 disabled={isPending}
                                 className="bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1"
                               >
                                 {isPending && <Loader />}
                                 Save
                               </button>
        </div>


        </form>
    </DialogContent>
    </Dialog>
  )
}
