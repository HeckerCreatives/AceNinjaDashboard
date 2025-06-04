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
import { ChevronDown, Plus, Search } from 'lucide-react'
import CreateNewsForm from '@/components/forms/CreateNewsForm'
import QuestItems from './QuestItems'
import CreateQuestForm from '@/components/forms/CreateQuest'
import QuestCard from '@/components/common/quest-cards'
import { useGetBattlepass, useUpdateBpMission } from '@/client_actions/superadmin/battlepass'
import toast from 'react-hot-toast'

const tabs = [
    'Daily',
    'Pass',
  ]




export default function Quest() {
    const [tab, setTab] = useState('Daily')
    const [currentPage, setCurrentpage] = useState(0)
    const [totalpage, setTotalpage] = useState(0)
   const { data, isLoading } = useGetBattlepass(currentPage, 10);
    const { mutate: updateBpMission } = useUpdateBpMission();
    const [freeMissions, setFreeMissions] = useState<any>([]);

  useEffect(() => {
    if (data && data.data && data.data[0]?.freeMissions) {
      setFreeMissions(data.data[0].freeMissions);
    }
  }, [data]);

  const handleExpUpdate = (questId: string, newExp: number) => {
  const isDailyTab = tab === "Daily";

  const currentMissions = isDailyTab
    ? data?.data[0].freeMissions || []
    : data?.data[0].premiumMissions || [];

  const updatedMissions = currentMissions.map((quest: any) =>
    quest._id === questId ? { ...quest, xpReward: newExp } : quest
  );

  if (isDailyTab) {
    setFreeMissions(updatedMissions);
  }

  const updatePayload = {
    bpid: data?.data[0].id || '',
    ...(isDailyTab
      ? { freeMissions: updatedMissions }
      : { premiumMissions: updatedMissions }),
  };

  updateBpMission(updatePayload, {
    onSuccess: () => {
      toast.success("Quest updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update quest.");
    },
  });
};


    const [quests, setQuests] = useState([
    {
      id: "quest-1",
      title: "Defeat the Dragon",
      description: "Slay the mighty dragon in the northern mountains",
      expReward: 500,
      requiredPoints: 100,
      currentPoints: 45,
      refreshTime: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
    },
    {
      id: "quest-2",
      title: "Collect Resources",
      description: "Gather 50 wood and 30 stone from the forest",
      expReward: 200,
      requiredPoints: 50,
      currentPoints: 50,
      refreshTime: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
    },
    {
      id: "quest-3",
      title: "Daily Login",
      description: "Log in to the game for 7 consecutive days",
      expReward: 100,
      requiredPoints: 7,
      currentPoints: 3,
      refreshTime: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
    },
  ])


    
  return (
    <div className=' w-full ~p-2/8'>

        <div className=' bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md'>

        <div className=' w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md'>
            <div className=' w-full bg-light p-3'>
                <p className=' text-lg font-semibold'>Quest</p>
            </div>

            <div className=' flex flex-col gap-4 ~p-2/8'>

              
                <div className=' flex items-center gap-[1px] mt-4 mb-1'>
                    {tabs.map((item, index) => (
                    <p onClick={() => setTab(item)} key={index} className={` cursor-pointer transition-all duration-300  text-center w-[110px] py-2 rounded-t-lg  text-xs ${item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'}`}>{item}</p>

                    ))}
                </div>

                {tab === 'Daily' ? (
                  <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-6">Daily Quests</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data?.data[0].freeMissions.map((quest) => (
                          <QuestCard
                            key={quest._id}
                            id={quest._id}
                            missionName={quest.missionName}
                            description={quest.description}
                            xpReward={quest.xpReward}
                            requirements={quest.requirements}
                            currentPoints={0}
                            type={quest.daily ? "Daily Quest" : "Weekly Quest"}
                            onExpUpdate={handleExpUpdate}
                            isEditable={true}
                          />
                          ))}
                    </div>
                  </div>
                ): (
                  <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-6">Pass Quests</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data?.data[0].premiumMissions.map((quest) => (
                          <QuestCard
                                key={quest._id}
                                id={quest._id}
                                missionName={quest.missionName}
                                description={quest.description}
                                xpReward={quest.xpReward}
                                requirements={quest.requirements}
                                currentPoints={0}
                                type={quest.daily ? "Daily Quest" : "Weekly Quest"}
                                onExpUpdate={handleExpUpdate}
                                isEditable={true}
                            />
                          ))}
                    </div>
                  </div>
                )}


                

                 {/* <div className="container mx-auto py-8">
                  <h1 className="text-2xl font-bold mb-6">Pass Quests</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quests.map((quest) => (
                      <QuestCard type={'Pass Quest'} key={quest.id} {...quest} onExpUpdate={handleExpUpdate} isEditable={true} />
                    ))}
                  </div>
                </div> */}
{/* 
               <div className=' flex items-center justify-center h-[200px] p-2'>
                <p className=' text-xs'>No Data</p>

               </div> */}

           

             
            </div>

           
        </div>
            
        </div>

    

    </div>
  )
}
