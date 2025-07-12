'use client'
import React, { useEffect, useState } from 'react'
import { useGetCurrentSeason, useGetSeasons } from '@/client_actions/superadmin/season'
import { tierImg } from '@/utils/findAsset'
import Countdown from 'react-countdown'
import { ListRestart, RefreshCcw, SquarePen } from 'lucide-react'
import { useGetLeaderboardHsitory, useGetResetList, useGetSeasonsLeaderboard, useResetRankings } from '@/client_actions/superadmin/leaderboard'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import Loader from '@/components/common/Loader'
import toast from 'react-hot-toast'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Pagination from '@/components/common/Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LeaderboardHistory from './History'

export default function Leaderboards() {
     const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [resetdate, setResetdate] = useState('1')
      const {data: currentSeason} = useGetCurrentSeason()
      const {data: season} = useGetSeasons(0, 9999, '')
      const {data: ranking, isLoading} = useGetSeasonsLeaderboard(0, 10)
      const {mutate: resetRankings, isPending} = useResetRankings()
      const {data: history, isLoading:historyLoading} = useGetLeaderboardHsitory(0,10,Number(resetdate))
      const {data: resetList} = useGetResetList()
      const timeleft = currentSeason?.data.timeleft ?? 0
      const [open, setOpen] = useState(false);

        const onSubmit = () => {
            resetRankings({resettype:'seasonreset' , seasonid: currentSeason?.data.id || ''} , {
                onSuccess: () => {
                  toast.success(`Ranking reset successfully.`);
                    setOpen(false)
                },
              })
        };


      const topRanking = (data: number) => {
        if(data === 1){
            return <img src="/leaderboard/number_Icon_1.png" alt="rank badge" width={35} height={35} />
        } else if(data === 2){
            return <img src="/leaderboard/number_Icon_2.png" alt="rank badge" width={35} height={35} />
        } else if(data === 3){
            return <img src="/leaderboard/number_Icon_3.png" alt="rank badge" width={35} height={35} />
        } else{
            return <p className=' w-[35px] text-center  font-bold'>{data}</p>
        }
      }

    const ranktierImg = (data: string) => {
        if(data === 'Rookie'){
            return <img src="/manage/Rank-ROOKIE icon.png" alt="tier" width={40}/>
        } else if (data === 'Veteran'){
            return <img src="/manage/Rank-VETERAN icon.png" alt="tier" width={40}/>
        } else if (data === 'Shogun'){
            return <img src="/manage/Rank-SHOGUN icon.png" alt="tier" width={40}/>
        } else if (data === 'Ronin'){
            return <img src="/manage/Rank-RONIN icon.png" alt="tier" width={40}/>
        } else if (data === 'Elder'){
            return <img src="/manage/Rank-ELDER icon.png" alt="tier" width={40}/>
        } else if (data === 'Ace'){
            return <img src="/manage/Rank-ACE icon.png" alt="tier" width={40}/>
        } 
    }

    //paginition
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        setTotalPage(ranking?.pagination.totalPages || 0)
    },[ranking])

    console.log(resetList)

    
  return (
    <div className=' w-full grid lg:grid-cols-2 gap-4 '>
        <div className=' grid gap-4'>
            <div className=' w-full bg-amber-950 h-auto flex flex-col items-center justify-center gap-4 rounded-md border-2 border-amber-900 p-4 relative'>
            <div className=' flex items-center gap-4'>
                <img src="/leaderboard/Trophy_in_PVP_ICON.png" alt="trophy" width={70} height={70} />
                <div className=' flex flex-col gap-2'>
                    <div className=' flex items-center gap-2'>
                        <h2 className=' text-2xl'>{currentSeason?.data.title} <span className=' text-sm text-amber-500'>(Rankings)</span></h2>
                         <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button className=' flex items-center gap-1 bg-amber-900 p-2 rounded-sm text-xs'><RefreshCcw size={15}/> Reset</button>

                        </DialogTrigger>
                        <DialogContent className=' max-w-lg p-6 h-fit'>
                            <DialogHeader>
                            <DialogTitle>Confirm Reset</DialogTitle>
                            <DialogDescription>
                                This action will permanently reset all player rankings. This cannot be undone.
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button disabled={isPending} className=' bg-red-600 text-white' onClick={onSubmit}>
                                 {isPending && <Loader/>}
                                Confirm Reset
                            </Button>
                            </DialogFooter>
                        </DialogContent>
                        </Dialog>
                    </div>
                    {/* <h2 className=' text-sm'>Leaderboard Rankings</h2> */}
                    
                    <Countdown
                                className="mt-2"
                                date={Date.now() + timeleft}
                                renderer={({ days, hours, minutes, seconds, completed }) =>
                                completed ? (
                                    <span className="text-xs w-fit bg-green-950 px-4 py-1 text-green-500 rounded-sm">
                                    {currentSeason?.data.title} is ended
                                    </span>
                                ) : (
                                    <span className="text-xs w-fit bg-green-950 px-4 py-1 text-green-500 rounded-sm">
                                    Ends in: {days} days : {hours} : {minutes} : {seconds}
                                    </span>
                                )
                                }
                            />
                </div>
            </div>
            </div>
            <div className=' w-full bg-orange-50 h-fit border-4 border-orange-300 rounded-md p-2 md:p-4 lg:p-6 overflow-x-auto'>
                <div className=' w-full h-fit bg-zinc-300 p-2 flex flex-col gap-1 rounded-sm'>
                    {ranking?.data.map((item, index) => (
                        <div key={item.characterId} className=' relative flex items-center justify-between px-2 py-1 bg-gradient-to-b from-orange-100 to-orange-300 w-full border-2 border-zinc-950 rounded-sm'>
                            <div className=' w-full flex items-center justify-center gap-5 lg:gap-8'>
                                <div className=' text-amber-950'>
                                    {topRanking(item.rank)}
                                </div>
                                <div className=' w-full h-[40px] bg-cyan-800 rounded-sm flex items-center'>
                                    <div className=' -translate-x-4'>
                                        {ranktierImg(item.rankName)}
                                    </div>
                                <div className=' flex flex-col items-start relative z-50'>
                                    <p className=' text-white text-sm font-semibold'>{item.username}</p>
                                    <p className=' text-[.7rem] text-green-400'>Lvl {item.level}</p>

                                </div>
                                
                                </div>

                                <div className=' h-full w-[110px] md:w-[175px] absolute right-0 flex items-center justify-center gap-4 '
                                style={{
                                    backgroundImage: "url('/leaderboard/right-tab.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "bottom",
                                }}
                                >
                                    <img src="/leaderboard/Trophy_in_PVP_ICON.png" alt="trophy" width={35} height={35} />
                                    <p className=' text-sm font-semibold '>{item.mmr.toLocaleString()}</p>                        
                                
                                </div>
                            </div>

                        </div>
                    ))}

                     {!isLoading && (
                    <Pagination currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>
                    )}

                    {isLoading && (
                        <div className=' h-[300px] flex items-center justify-center w-full'>
                            <div className=' flex items-center gap-2'>
                                <Loader/>
                                <p className=' text-xs text-amber-950 flex items-center gap-2'>
                                    Fetching ranking data...
                                </p>
                            </div>
                        

                        </div>
                    )}
                
                </div>

               

            </div>
        </div>

        <LeaderboardHistory/>
       
    </div>
  )
}
