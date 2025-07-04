'use client'
import React, { useEffect, useState } from 'react'
import { useGetBattlepass, useGetDailyQuest, useUpdateBpMission } from '@/client_actions/superadmin/battlepass'
import DailyQuestResetCard from '@/components/common/DailyQuestReset'
import PassQuestReset from '@/components/common/PassQuestReset'

const tabs = ['Daily', 'Pass']
const tabspass = ['Free', 'Premium']

export default function QuestReset() {
  const [tab, setTab] = useState('Daily')
  const [tabbp, setTabbp] = useState('Free')
  const [currentPage, setCurrentpage] = useState(0)

  const { data, isLoading } = useGetBattlepass(currentPage, 10)
  const { data: quest } = useGetDailyQuest(currentPage, 10)

  const [freeMissions, setFreeMissions] = useState<any[]>([])
  const [premiumMissions, setPremiumMissions] = useState<any[]>([])
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const timeleft = quest?.data[0].timer



  useEffect(() => {
    if (data && data.data && data.data[0]) {
      setFreeMissions(data.data[0].freeMissions || [])
      setPremiumMissions(data.data[0].premiumMissions || [])
    }
  }, [data])

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





  return (
    <div className="w-full ">
      <div className="bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md">
        <div className="w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md">
          <div className="w-full bg-light p-3">
            <p className="text-lg font-semibold">Quest </p>
          </div>

          <div className="flex flex-col gap-4 ~p-2/8">
            <div className="flex items-center gap-[1px] mt-4 mb-1">
              {tabs.map((item, index) => (
                <p
                  onClick={() => setTab(item)}
                  key={index}
                  className={`cursor-pointer transition-all duration-300 text-center w-[110px] py-2 rounded-t-lg text-xs ${
                    item === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-600'
                  }`}
                >
                  {item}
                </p>
              ))}
            </div>

            {tab === 'Pass' ? (
              <>
              <div className=' flex items-center gap-2'>
                 {tabspass.map((item, index) => (
                  <p
                    onClick={() => setTabbp(item)}
                    key={index}
                    className={`cursor-pointer transition-all duration-300 text-center w-[110px] py-2 rounded-t-lg text-xs ${
                      item === tabbp ? 'bg-yellow-500 text-black' : 'bg-zinc-600'
                    }`}
                  >
                    {item}
                  </p>
                ))}
              </div>
              
                {tabbp === 'Free' ? (
                  <div className="container mx-auto py-4">
                    <h1 className="text-xl font-bold mb-6">Free Missions Reset in <span className=' text-sm text-amber-600'>{timeRemaining}</span></h1>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-6">
                      {freeMissions.map((quest) => (
                        <PassQuestReset
                          key={quest._id}
                          missionName={quest.missionName}
                          description={quest.description}
                          xpReward={quest.xpReward}
                          requirements={quest.requirements}
                          currentPoints={0}
                          type={quest.daily ? 'Daily Quest' : 'Weekly Quest'}
                           id={quest._id}
                          isEditable={true} missiontype={'Free'} bpid={data?.data[0].id || ''} missionCategory={'freeMissions'} missiondata={data?.data[0].freeMissions || []}
                          rewardtype={quest.rewardtype}
                          timeleft={quest.timer}
                          />
                      ))}

                      
                    </div>
                  </div>
                ) : (
                  <div className="container mx-auto py-4">
                    <h1 className="text-xl font-bold mb-6">Premium Missions Reset in <span className=' text-sm text-amber-600'>{timeRemaining}</span></h1>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-6">

                      {premiumMissions.map((quest) => (
                        <PassQuestReset
                          key={quest._id}
                          id={quest._id}
                          missionName={quest.missionName}
                          description={quest.description}
                          xpReward={quest.xpReward}
                          requirements={quest.requirements}
                          currentPoints={0}
                          type={quest.daily ? 'Daily Quest' : 'Weekly Quest'}
                          missiondata={data?.data[0].premiumMissions || []}
                          isEditable={true} missiontype={'Premium'}  
                          bpid={data?.data[0].id || ''} missionCategory={'premiumMissions'}
                          rewardtype={quest.rewardtype}   
                          timeleft={quest.timer}

                          />
                      ))}


             
                    </div>
                  </div>
                )}
              </>
            ) : (

             <>
             <div className="container mx-auto py-4">
                    <h1 className="text-2xl font-bold mb-6">Daily Quest Reset in <span className=' text-sm text-amber-600'>{timeRemaining}</span></h1>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-6">
                      {quest?.data.map((quest) => (
                        <DailyQuestResetCard
                          key={quest.id}
                          id={quest.id}
                          missionName={quest.missionName}
                          description={quest.description}
                          xpReward={quest.xpReward}
                          requirements={quest.requirements}
                          currentPoints={0}
                          type={quest.daily ? 'Daily Quest' : 'Weekly Quest'}
                          isEditable={true} missiontype={'Daily'} rewardtype={quest.rewardtype}
                          timeleft={quest.timer}
                          />
                      ))}

                      
                    </div>
                  </div>
             </> 
            )}

          
          </div>
        </div>
      </div>
    </div>
  )
}