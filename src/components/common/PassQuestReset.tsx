"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sword, Clock, Trophy, Edit, Save, X, RefreshCcw } from "lucide-react";
import { useResetPassQuest } from "@/client_actions/superadmin/reset";
import toast from "react-hot-toast";
import Loader from "./Loader";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"




interface Mission {
  missionName: string;
  description: string;
  xpReward: number;
  requirements: {
    [key: string]: number;
  };
  daily: boolean;
  _id: string;
}


interface QuestProps {
  id: string;
  missionName: string;
  description: string;
  type: string;
  xpReward: number;
  requirements: Record<string, number>;
  currentPoints?: number;
  refreshTime?: string;
  missiontype: string;
  missiondata: Mission[]
  isEditable?: boolean;
  bpid: string;
  missionCategory: "freeMissions" | "premiumMissions";
  rewardtype?: string
  timeleft?: number
}

export default function PassQuestReset({
  id,
  missionName,
  description,
  missiondata,
  type,
  xpReward,
  missiontype,
  requirements,
  currentPoints = 0,
  refreshTime = new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
  isEditable = false,
  bpid,
  missionCategory,
  rewardtype,
  timeleft
}: QuestProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedRequirements, setEditedRequirements] = useState<Record<string, string>>(
    Object.fromEntries(Object.entries(requirements).map(([k, v]) => [k, v.toString()]))
  );


  const [editedRewardType, setEditedRewardType] = useState<string>('');
    const {mutate: resetPassQuest, isPending} = useResetPassQuest()
     const [open, setOpen] = useState(false)
  


  const getLabelForRequirement = (key: string) => {
    switch (key) {
      case "pvpwins":
        return "PvP Wins";
      case "enemydefeated":
        return "Defeat Enemies";
      case "dailyquests":
        return "Daily Quests";
      case "skillsused":
        return "Skills Used";
      case "totaldamage":
        return "Total Damage";
      case "pvpparticipated":
        return "PvP Participation";
      case "raidparticipated":
        return "Raids Participated";
      case "dailyspin":
        return "Daily Spin";
      case "dailyloginclaimed":
        return "Daily Login";
      case "storychapters":
        return "Story Chapters";
      case "friendsadded":
        return "Friends Added";
      case "selfheal":
        return "Self Heal";
      default:
        return key;
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
}, [timeleft]);;




  const handleRequirementChange = (key: string, value: string) => {
    setEditedRequirements((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
  setEditedRewardType(rewardtype ?? "exp");
}   , []);



    const resetQuest = () => {
       resetPassQuest({questid: id} , {
                onSuccess: () => {
                  toast.success(`Reset successfully `);
                    setOpen(false)
              }})
    
       }


  return (
    <Card className="w-full max-w-md border-2 hover:shadow-lg bg-amber-950 border-amber-900 transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Sword className="h-5 w-5 text-primary" />
            {missionName} <span className=" text-xs text-amber-600">({missiontype})</span>
          </CardTitle>
         
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              
                <span className="font-medium uppercase">{xpReward} {editedRewardType}</span>
             
            </div>
         
          </div>

          {Object.entries(requirements).map(([key, requiredPoints]) => (
            <div
              key={key}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{getLabelForRequirement(key)}:</span>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedRequirements[key] ?? ""}
                    onChange={(e) =>
                      handleRequirementChange(key, e.target.value)
                    }
                    className="w-20 h-8"
                    min="0"
                  />
                ) : (
                  <span className="font-medium text-white">{requiredPoints}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex items-center justify-between text-sm mt-6">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Refreshes in:</span>
          </div>
          <div className="font-mono">{timeRemaining}</div>
        </div> */}

         {/* <Button
         disabled={isPending}
         onClick={resetQuest}
          className=""
        >
        {isPending && <Loader/>}
          <RefreshCcw className="h-4 w-4" />Reset
        </Button> */}
        <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button
                        disabled={isPending}
        
                        // onClick={resetQuest}
                        className=""
                        >
                            {isPending && <Loader/>}
                        <RefreshCcw className="h-4 w-4" />Reset
                        </Button>
                    </DialogTrigger>
                        
                    <DialogContent className=" max-w-sm h-fit p-6">
                        <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                           This will permanently reset: <span className=" text-amber-600">{missionName}</span>
                        </DialogDescription>
                        </DialogHeader>
        
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                            </Button>
                            <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={resetQuest}
                            disabled={isPending}
                            >
                            {isPending && <Loader />}
                            Confirm Reset
                            </Button>
                        </div>
                    </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
