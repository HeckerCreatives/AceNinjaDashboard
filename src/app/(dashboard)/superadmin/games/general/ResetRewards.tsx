'use client'
import React, { useEffect, useState } from 'react'
import { useGetBattlepass, useGetDailyQuest, useUpdateBpMission } from '@/client_actions/superadmin/battlepass'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Boxes, Calendar, CalendarCheck, Clock, Clock12, Expand, RefreshCcw, Sword, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResetDailyExpSpin, useResetDailySpin, useResetFreebie, useResetMonthlyLogin, useResetMonthlyLoginAll, useResetWeeklyLogin } from '@/client_actions/superadmin/reset';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


const rewards = [
    {name: 'Daily Spin', icon: <Clock12 className="h-5 w-5 text-primary" />,sub: 'Spin'},
    {name: 'Daily Exp Spin', icon: <Expand className="h-5 w-5 text-primary" />,sub: 'Exp'},
    {name: 'Weekly Login', icon: <Calendar className="h-5 w-5 text-primary" />,sub: 'Weekly'},
    {name: 'Monthly Login', icon: <CalendarCheck className="h-5 w-5 text-primary" />,sub: 'Daily'},
    {name: 'Monthly Login', icon: <CalendarCheck className="h-5 w-5 text-primary" />,sub: 'All'},
    {name: 'Freebie', icon: <Boxes className="h-5 w-5 text-primary" />,sub: 'Freebie'},
]


export default function RewardReset() {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [loading, setLoading] = useState(false)
  const {mutate: resetDailySpin} = useResetDailySpin()
  const {mutate: resetDailyExpSpin} = useResetDailyExpSpin()
  const {mutate: resetWeeklyLogin} = useResetWeeklyLogin()
  const {mutate: resetMonthlyLogin} = useResetMonthlyLogin()
  const {mutate: resetMonthlyLoginAll} = useResetMonthlyLoginAll()
  const {mutate: resetFreebie} = useResetFreebie()
    const { data: quest } = useGetDailyQuest(0, 10)

    const timeleft = quest?.data[0].timer

    const [selectedReward, setSelectedReward] = useState<{ name: string; sub: string } | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const onConfirmReset = () => {
        if (selectedReward) {
            handleResetReward(selectedReward.name, selectedReward.sub);
            setDialogOpen(false);
        }
    };
  

  
    function formatMilliseconds(ms: number): string {
  if (ms <= 0) return "Refreshing...";
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

   useEffect(() => {
  if (typeof timeleft !== "number") {
    setTimeRemaining("N/A");
    return;
  }

  let remaining = timeleft;

  const updateCountdown = () => {
    setTimeRemaining(formatMilliseconds(remaining));
    remaining -= 1000;

    if (remaining <= 0) {
      clearInterval(timer);
      setTimeRemaining("Refreshing...");
    }
  };

  updateCountdown(); 
  const timer = setInterval(updateCountdown, 1000);

  return () => clearInterval(timer);
    }, [timeleft]);


   const handleResetReward = (name: string, sub: string) => {
    setLoading(true);

    const resetMap: Record<string, () => void> = {
        'Daily Spin_Spin': () =>
        resetDailySpin(undefined, {
            onSuccess: () => toast.success('Reset successfully'),
            onError: () => toast.error('Reset failed'),
            onSettled: () => setLoading(false),
        }),
        'Daily Exp Spin_Exp': () =>
        resetDailyExpSpin(undefined, {
            onSuccess: () => toast.success('Reset successfully'),
            onError: () => toast.error('Reset failed'),
            onSettled: () => setLoading(false),
        }),
        'Weekly Login_Weekly': () =>
        resetWeeklyLogin(undefined, {
            onSuccess: () => toast.success('Reset successfully'),
            onError: () => toast.error('Reset failed'),
            onSettled: () => setLoading(false),
        }),
        'Monthly Login_Daily': () =>
        resetMonthlyLogin(undefined, {
            onSuccess: () => toast.success('Reset successfully'),
            onError: () => toast.error('Reset failed'),
            onSettled: () => setLoading(false),
        }),
        'Monthly Login_All': () =>
        resetMonthlyLoginAll(undefined, {
            onSuccess: () => toast.success('Reset all monthly login successfully'),
            onError: () => toast.error('Reset all monthly login failed'),
            onSettled: () => setLoading(false),
        }),
        'Freebie_Freebie': () => {
         resetFreebie(undefined, {
            onSuccess: () => toast.success('Reset successfully'),
            onError: () => toast.error('Reset failed'),
            onSettled: () => setLoading(false),
        }),
        setLoading(false);
        },
    };

    const key = `${name}_${sub}`;
    const resetFn = resetMap[key];

    if (!resetFn) {
        toast.error('Unknown reward type or sub-action');
        setLoading(false);
        return;
    }

    resetFn();
    };


      




  return (
    <div className="w-full ">
      <div className="bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md">
        <div className="w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md">
          <div className="w-full bg-light p-3">
            <p className="text-lg font-semibold">Rewards</p>
          </div>

          <div className="flex flex-col gap-4 ~p-2/8">
        
             <div className="container mx-auto">
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-6">

                        {rewards.map((item, index) => (
                            <Card className="w-full max-w-md border-2 hover:shadow-lg bg-amber-950 border-amber-900 transition-shadow">
                                <CardHeader className="pb-2">
                                </CardHeader>
                                <CardContent className="space-y-4">

                                    <div className="flex items-center gap-1 text-xl font-semibold">
                                            {item.icon}{item.name}
                                            {(item.sub === 'All' || item.sub === 'Daily') && (
                                                <span className=' text-sm text-amber-700'>({item.sub})</span>
                                            )}
                                        </div>
                                

                                    <div className="flex items-center justify-between text-sm mt-2">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4 text-blue-500" />
                                            <span>Refreshes in:</span>
                                        </div>
                                        <div className="font-mono">{timeRemaining}</div>
                                    </div>

                                    <Button
                                    disabled={loading}
                                    onClick={() => {
                                        setSelectedReward({ name: item.name, sub: item.sub });
                                        setDialogOpen(true);
                                    }}
                                    >
                                    {loading && <Loader />}
                                    <RefreshCcw className="h-4 w-4" /> Reset
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}

                         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogContent className="max-w-sm h-fit p-6">
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                This will permanently reset:{" "} 
                                <strong>
                                    {selectedReward?.name}
                                     {(selectedReward?.sub === 'All' || selectedReward?.sub === 'Daily') && (
                                                <span className=' text-sm text-amber-700'>({selectedReward.sub})</span>
                                            )}
                                </strong>

                                {selectedReward?.sub === 'All' && (
                                    <p className=' text-sm text-red-500 mt-4'>Warning, this action will reset all monthly login progress back to zero. </p>
                                )}

                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                                Cancel
                                </Button>
                                <Button
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={onConfirmReset}
                                disabled={loading}
                                >
                                {loading && <Loader />}
                                Confirm Reset
                                </Button>
                            </div>
                            </DialogContent>
                        </Dialog>
                   
                    </div>
                  </div>
          
          
          </div>
        </div>
      </div>
    </div>
  )
}

