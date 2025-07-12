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

export default function LeaderboardHistory() {
     const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [resetdate, setResetdate] = useState('1')
      const {data: currentSeason} = useGetCurrentSeason()
      const {data: ranking, isLoading} = useGetSeasonsLeaderboard(0, 10)
      const {mutate: resetRankings, isPending} = useResetRankings()
      const {data: history, isLoading:historyLoading} = useGetLeaderboardHsitory(0,10,Number(resetdate))
      const {data: resetList} = useGetResetList()
      const timeleft = currentSeason?.data.timeleft ?? 0
      const [open, setOpen] = useState(false);


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


    
  return (
      <div className=' bg-amber-950 w-full p-4 flex flex-col gap-2'>
            <p className=' text-sm'>History</p>

            <Select value={resetdate} onValueChange={setResetdate}>
            <SelectTrigger className=" w-fit">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                {resetList?.data.map((item, index) => (
                <SelectItem key={ index} value={`${item.index}`}>{item.name}</SelectItem>
                ))}
                
            </SelectContent>
            </Select>
            <Table className=' bg-zinc-950'>
             {history?.data.length === 0 && (
                <TableCaption>No data.</TableCaption>
                )}
                
                {historyLoading && (
                <TableCaption>
                    <Loader/>
                </TableCaption>
                )}
            <TableHeader>
                <TableRow>
                <TableHead className="">
                </TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="">Lvl</TableHead>
                <TableHead className="">MMR</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history?.data.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell className=" text-white">{topRanking(item.rank)}</TableCell>
                    <TableCell className="">{ranktierImg(item.rankName)}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.level}</TableCell>
                    <TableCell className="">
                        <div className=' flex items-center gap-1'>
                            <img src="/leaderboard/Trophy_in_PVP_ICON.png" alt="trophy" width={35} height={35} />
                            {item.mmr.toLocaleString()}
                        </div>
                        </TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
            </Table>

            
            {history?.data.length !== 0 && (
            <Pagination currentPage={currentPage} total={totalPage} onPageChange={handlePageChange}/>
            )}
        </div>
  )
}
