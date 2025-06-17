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
import { createCode, CreateCode } from '@/validation/schema'
import { useAddRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { useGetAllItems, useGetAllSkills } from '@/client_actions/superadmin/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

export default function CreateQuestForm() {
    const [image, setImage] = useState('')
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('Image')
    const {mutate: addRedeemCode, isPending} = useAddRedeemCode()
    const [coins, setCoins] = useState(0)
    const [exp, setExp] = useState(0)
    const [crystal, setCrystal] = useState(0)
    const [itemreward, setItemReward] = useState<string[]>([])
    const {data, isLoading} = useGetAllItems(['chests','freebie'])
    const [type, setType] = useState('')
    const {data: skills} = useGetAllSkills()
    const [filter, setFilter] = useState('outfit')
    const [item, setItem] = useState('')
    const [male, setMale] = useState('')
    const [itemlist, setItemlist] = useState<string[]>([])
    const [female, setFemale] = useState('')
    const actualFilter = filter !== 'outfit' ? filter : '';
    const {data: others} = useGetItemRewards(actualFilter, filter !== 'item' ? 'unisex' : '')
    const {data: maleitems} = useGetItemRewards('outfit', 'male')
    const {data: femaleitems} = useGetItemRewards('outfit', 'female')
    

    //create news validation
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      trigger,
      formState: { errors },
    } = useForm<CreateCode>({
      resolver: zodResolver(createCode),
    });

    const createRedeemcodes = async ( data: CreateCode) => {
        if(filter !== 'outfit' && item === ''){
                toast.error(`Please select an item.`);
            } else if(filter === 'outfit' && male === ''){
                toast.error(`Please select a male ${filter}.`);
            } else if(filter === 'outfit' && female === ''){
                toast.error(`Please select a female ${filter}.`);
            } else {
                addRedeemCode({code: data.code, status: 'active', expiry: data.expiration, rewards:{coins: coins, exp: exp, crystal: crystal}, itemrewards: filter === 'skills' ? [] : itemlist,
              skillrewards: filter === 'skills' ? itemlist : []},{
                  onSuccess: () => {
                    toast.success(`Code created successfully.`);
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
          setItemlist([value]); 
        };
    
         const handleMaleChange = (value: string) => {
          setMale(value);
          setItemlist(([_, femaleId]) => [value, femaleId || '']);
        };
    
        const handleFemaleChange = (value: string) => {
          setFemale(value);
          setItemlist(([maleId]) => [maleId || '', value]);
        };
    
        console.log(itemlist)
    
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' bg-yellow-500 text-black px-6 py-2 rounded-md flex items-center w-fit text-xs font-semibold'>
    <Plus size={15}/>Create
    </DialogTrigger>
    <DialogContent className=' max-w-[800px] h-auto border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Create Codes</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(createRedeemcodes)} className=' text-xs flex flex-col gap-2 p-6'>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Code</label>
            <input type="text" placeholder='Code' className={` input ${errors.code && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('code')} />
            {errors.code && <p className=' text-[.6em] text-red-500'>{errors.code.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="" className=' text-sm'>Rewards</label>

            <label htmlFor="" className=''>Coins</label>
              <input value={coins} onChange={(e) => setCoins(e.target.valueAsNumber)} type="number" placeholder='Coins' className={` input  text-xs `}  />

              <label htmlFor="" className=''>Experience</label>
              <input value={exp} onChange={(e) => setExp(e.target.valueAsNumber)} type="number" placeholder='Exp' className={` input text-xs `} />

              <label htmlFor="" className=''>Crystal</label>
              <input value={crystal} onChange={(e) => setCrystal(e.target.valueAsNumber)} type="number" placeholder='Crystal' className={` input  text-xs `}  />
            </div>

            <div className=' flex flex-col gap-2 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
                      <label htmlFor="">Select Item</label>
                      {/* <Select 
                         onValueChange={(value) => {
                          setItemReward([value]);
                            const selectedItem = data?.data.items.find((item) => item.itemid === value);
                            if (selectedItem) {
                              setType(selectedItem.type);
                            }
                        }}
                      >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Item" />
                        </SelectTrigger>
                        <SelectContent>
                            {data?.data.items.map((item, index) => (
                            <SelectItem  value={item.itemid}>{item.name}</SelectItem>
                            ))}

                            
                            
                        </SelectContent>
                        </Select>
                       */}

                            <DropdownMenu>
                                                <DropdownMenuTrigger className=' bg-amber-800 px-3 py-1 rounded-sm flex items-center gap-1 w-fit'><AlignCenter size={15}/>Type : {filter}</DropdownMenuTrigger>
                                                <DropdownMenuContent className=' bg-amber-800'>
                                                  <DropdownMenuLabel className=' text-xs'>Select</DropdownMenuLabel>
                                                  <DropdownMenuSeparator />
                                                  <DropdownMenuItem className={` text-xs cursor-pointer ${filter === 'outfit' && 'text-yellow-500'}`} onClick={() => setFilter('outfit')}>Outfit</DropdownMenuItem>
                                                  <DropdownMenuItem className={` text-xs cursor-pointer ${filter === 'weapon' && 'text-yellow-500'}`} onClick={() => setFilter('weapon')}>Weapon</DropdownMenuItem>
                                                    <DropdownMenuItem className={` text-xs cursor-pointer ${filter === 'skills' && 'text-yellow-500'}`} onClick={() => setFilter('skills')}>Skills</DropdownMenuItem>
                                                      <DropdownMenuItem className={` text-xs cursor-pointer ${filter === 'item' && 'text-yellow-500'}`} onClick={() => setFilter('item')}>Items</DropdownMenuItem>
                                                </DropdownMenuContent>
                                              </DropdownMenu>
                                              {filter !== 'outfit' ? (
                                                          <div className=' flex flex-col gap-2 w-full'>
                                                          <label htmlFor="" className=' '> {actualFilter && actualFilter.charAt(0).toUpperCase() + actualFilter.slice(1)}</label>
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


            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Expiration</label>
            <input type="date" placeholder='Expiration' className={` input ${errors.expiration && 'border-[1px] focus:outline-none border-red-500'} `} {...register('expiration')} />
            {errors.expiration && <p className=' text-[.6em] text-red-500'>{errors.expiration.message}</p>}
            </div>

          <div className=' w-full flex items-end justify-end gap-4 mt-6 text-white'>
            <button disabled={isPending} className=' bg-yellow-500 text-black text-xs px-8 py-2 rounded-md flex items-center justify-center gap-1'>
              {isPending && <Loader/>}
              Save</button>
          </div>


         </form>
    </DialogContent>
    </Dialog>
  )
}
