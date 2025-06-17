'use client'
import React, { useEffect, useState } from 'react'
import { AlignCenter, ImageUp, Pen, Plus} from 'lucide-react'
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
import { battlepassSchema, BattlePassValidations, createCode, CreateCode } from '@/validation/schema'
import { useAddRedeemCode, useUpdateRedeemCode } from '@/client_actions/superadmin/redeemcodes'
import toast from 'react-hot-toast'
import Loader from '../common/Loader'
import { useUpdateBpData } from '@/client_actions/superadmin/battlepass'
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
import { useGetAllItems } from '@/client_actions/superadmin/store'
import { useGetItemRewards } from '@/client_actions/superadmin/itemrewards'


type Props ={
    id: string
    seasonname: string
    start: string
    end: string
    status: string
    tiercount: number
    premcost: number
    grandreward: string[]
    season: number
    rewarditems: GrandRewardItem[]
    itemtype: string; // 'outfit' | 'weapon'
    items: { itemid: string; itemtype: string }[];
}

interface StatDetails {
  level: number;
  damage: number;
  defense: number;
  speed: number;
}

interface GrandRewardItem {
  id: string;
  name: string;
  type: string;     
  rarity: string;   
  description: string;
  imageUrl: string;
  isEquippable: boolean;
  isOpenable: boolean;
  crystals: number;
  coins: number;
  stats: StatDetails;
}

export default function UpdateBattlePass( prop: Props) {
    const [open, setOpen] = useState(false)
    const {mutate: updateBpData, isPending} = useUpdateBpData()
    const [filter, setFilter] = useState('outfit')
    const [item, setItem] = useState('')
    const [male, setMale] = useState('')
    const [itemlist, setItemlist] = useState<string[]>([])
    const [female, setFemale] = useState('')
    const {data, isLoading} = useGetAllItems(['skills','freebie','chests','crystalpacks','goldpacks'])
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
    } = useForm<BattlePassValidations>({
      resolver: zodResolver(battlepassSchema),
      defaultValues:({
        
      })
    });

    const updateBattlePass = async ( data: BattlePassValidations) => {
     updateBpData({bpid: prop.id, title: data.seasonname, startDate: data.startdate, endDate: data.enddate, status: data.status, tiercount: data.tiercount, premiumCost: data.premcost, season: data.season, grandreward: itemlist},{
     onSuccess: () => {
       toast.success(`Battle pass details updated successfully.`);
       setOpen(false)
     }})
   }

    //reset form value
    useEffect(() => {
        reset()
    },[open])

    useEffect(() => {
        if(prop){
            reset({
                seasonname: prop.seasonname,
                startdate: prop.start.split('T')[0],
                enddate: prop.end.split('T')[0],
                status: prop.status,
                tiercount: Number(prop.tiercount),
                premcost: prop.premcost,
                // grandreward: prop.grandreward,
                season: prop.season
            })
        }
    },[prop])



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
    <DialogTrigger className=' bg-yellow-500 text-black p-1 rounded-md flex items-center h-fit w-fit text-xs font-semibold'>
    <Pen size={15}/>
    </DialogTrigger>
    <DialogContent className=' max-w-[600px] h-auto border-amber-500/80 border-[1px]'>
      <DialogHeader className=' w-full bg-light p-3'>
        <DialogTitle className=' text-sm'>Update Battle Pass</DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(updateBattlePass)} className=' text-xs flex flex-col gap-2 p-6'>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
            <label htmlFor="">Battle Pass Title</label>
                <input type="text" placeholder='Season name' className={` input ${errors.seasonname && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('seasonname')} />
                {errors.seasonname && <p className=' text-[.6em] text-red-500'>{errors.seasonname.message}</p>}
            </div>

            <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
             <label htmlFor="">Season</label>
                <input type="text" placeholder='Season' className={` input ${errors.season && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('season', {valueAsNumber: true})} />
                {errors.season && <p className=' text-[.6em] text-red-500'>{errors.season.message}</p>}
            </div>

            <div className=' w-full flex  gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>

                <div className=' flex flex-col gap-1 w-full'>
                    <label htmlFor="" className=''>Start Date</label>
                    <input  type="date" placeholder='Start date' className={` input  text-xs `}  {...register('startdate')}/>
                     {errors.startdate && <p className=' text-[.6em] text-red-500'>{errors.startdate.message}</p>}
                </div>

                <div className=' flex flex-col gap-1 w-full'>
                    <label htmlFor="" className=''>End Date</label>
                    <input  type="date" placeholder='Start date' className={` input  text-xs `}  {...register('enddate')}/>
                     {errors.enddate && <p className=' text-[.6em] text-red-500'>{errors.enddate.message}</p>}
                </div>

               
            </div>

            <div className=' w-full flex  gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
                  <div className='w-full flex flex-col gap-1'>
                      <label htmlFor="">Premium Cost</label>
                      <input type="text" placeholder='Premium Cost' className={` input ${errors.premcost && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('premcost')} />
                      {errors.premcost && <p className=' text-[.6em] text-red-500'>{errors.premcost.message}</p>}
                  </div>

                <div className=' w-full flex flex-col gap-1 '>
                 <label htmlFor="">Tier Count</label>
                    <input disabled type="number" placeholder='Tier count' className={` input ${errors.tiercount && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('tiercount', {valueAsNumber: true})} />
                    {errors.tiercount && <p className=' text-[.6em] text-red-500'>{errors.tiercount.message}</p>}
                </div>
            </div>

          

            

            {/* <div className=' w-full flex flex-col gap-1 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
                 <label htmlFor="">Premium Cost</label>
                <input type="text" placeholder='Premium Cost' className={` input ${errors.premcost && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('premcost')} />
                {errors.premcost && <p className=' text-[.6em] text-red-500'>{errors.premcost.message}</p>}
            </div> */}

            <div className=' w-full flex flex-col gap-3 p-4 bg-light rounded-md border-amber-800 border-[1px]'>
                 <label htmlFor="">Grand Reward</label>
                {/* <input disabled type="text" placeholder='Grand Reward' className={` input ${errors.grandreward && 'border-[1px] focus:outline-none border-red-500'} text-xs `} {...register('grandreward')} /> */}
                {/* <Select defaultValue={prop.grandreward} onValueChange={(value) => setValue("grandreward", value, { shouldValidate: true })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Grand Reward" />
                </SelectTrigger>
                <SelectContent>
                  {prop.rewarditems.map((item, index) => (
                  <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  ))}
                
                </SelectContent>
              </Select> */}

             <DropdownMenu>
                         <DropdownMenuTrigger className=' bg-amber-800 px-3 py-1 rounded-sm flex items-center gap-1 w-fit'><AlignCenter size={15}/>Type : {filter}</DropdownMenuTrigger>
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
                {/* {errors.grandreward && <p className=' text-[.6em] text-red-500'>{errors.grandreward.message}</p>} */}
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
