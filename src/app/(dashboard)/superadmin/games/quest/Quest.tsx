'use client'
import React, { useEffect, useState } from 'react'
import QuestCard from '@/components/common/quest-cards'
import { useGetBattlepass, useGetDailyQuest, useUpdateBpMission } from '@/client_actions/superadmin/battlepass'
import toast from 'react-hot-toast'
import DailyQuestCard from '@/components/common/daily-quest'

const tabs = ['Daily', 'Pass']
const tabspass = ['Free', 'Premium']

export default function Quest() {
  const [tab, setTab] = useState('Daily')
  const [tabbp, setTabbp] = useState('Free')
  const [currentPage, setCurrentpage] = useState(0)

  const { data, isLoading } = useGetBattlepass(currentPage, 10)
  const { data: quest } = useGetDailyQuest(currentPage, 10)
  const { mutate: updateBpMission } = useUpdateBpMission()

  // Local states for free and premium missions
  const [freeMissions, setFreeMissions] = useState<any[]>([])
  const [premiumMissions, setPremiumMissions] = useState<any[]>([])
  const [dailyQuest, setDailyQuest] = useState<any[]>([])

  // Initialize local states on data load
  useEffect(() => {
    if (data && data.data && data.data[0]) {
      setFreeMissions(data.data[0].freeMissions || [])
      setPremiumMissions(data.data[0].premiumMissions || [])
    }
  }, [data])

  // Handle EXP update
  const handleExpUpdate = (questId: string, newExp: number) => {
    const isDailyTab = tab === 'Daily'

    const currentMissions = isDailyTab ? freeMissions : premiumMissions
    const updatedMissions = currentMissions.map((quest) =>
      quest._id === questId ? { ...quest, xpReward: newExp } : quest
    )

    if (isDailyTab) {
      setFreeMissions(updatedMissions)
    } else {
      setPremiumMissions(updatedMissions)
    }

    const updatePayload = {
      bpid: data?.data[0].id || '',
      ...(isDailyTab
        ? { freeMissions: updatedMissions }
        : { premiumMissions: updatedMissions }),
    }

    updateBpMission(updatePayload, {
      onSuccess: () => {
        toast.success('Quest updated successfully.')
      },
      onError: () => {
        toast.error('Failed to update quest.')
      },
    })
  }

  // Handle Requirements update
  const handleRequirementsUpdate = (
    questId: string,
    newRequirements: Record<string, number>
  ) => {
    const isDailyTab = tabbp === 'Free'

    const currentMissions = isDailyTab ? freeMissions : premiumMissions
    const updatedMissions = currentMissions.map((quest) =>
      quest._id === questId ? { ...quest, requirements: newRequirements } : quest
    )

    if (isDailyTab) {
      setFreeMissions(updatedMissions)
    } else {
      setPremiumMissions(updatedMissions)
    }

    const updatePayload = {
      bpid: data?.data[0].id || '',
      ...(isDailyTab
        ? { freeMissions: updatedMissions }
        : { premiumMissions: updatedMissions }),
    }

    updateBpMission(updatePayload, {
      onSuccess: () => {
        toast.success('Requirements updated successfully.')
      },
      onError: () => {
        toast.error('Failed to update requirements.')
      },
    })
  }


  console.log(quest)

  return (
    <div className="w-full ~p-2/8">
      <div className="bg-dark border-t-2 border-amber-900/50 px-2 py-6 rounded-md">
        <div className="w-full flex flex-col border-[1px] border-amber-900 bg-zinc-950 rounded-md">
          <div className="w-full bg-light p-3">
            <p className="text-lg font-semibold">Quest</p>
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
                  <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-6">Free Missions</h1>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-6">
                      {freeMissions.map((quest) => (
                        <QuestCard
                          key={quest._id}
                          id={quest._id}
                          missionName={quest.missionName}
                          description={quest.description}
                          xpReward={quest.xpReward}
                          requirements={quest.requirements}
                          currentPoints={0}
                          type={quest.daily ? 'Daily Quest' : 'Weekly Quest'}
                          onExpUpdate={handleExpUpdate}
                          onRequirementsUpdate={handleRequirementsUpdate}
                          isEditable={true} missiontype={'Free'}                    />
                      ))}

                      
                    </div>
                  </div>
                ) : (
                  <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-6">Premium Missions</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                      {premiumMissions.map((quest) => (
                        <QuestCard
                          key={quest._id}
                          id={quest._id}
                          missionName={quest.missionName}
                          description={quest.description}
                          xpReward={quest.xpReward}
                          requirements={quest.requirements}
                          currentPoints={0}
                          type={quest.daily ? 'Daily Quest' : 'Weekly Quest'}
                          onExpUpdate={handleExpUpdate}
                          onRequirementsUpdate={handleRequirementsUpdate}
                          isEditable={true} missiontype={'Premium'}                    />
                      ))}


             
                    </div>
                  </div>
                )}
              </>
            ) : (

             <>
             <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-6">Daily Quest</h1>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-6">
                      {quest?.data.map((quest) => (
                        <DailyQuestCard
                          key={quest.id}
                          id={quest.id}
                          missionName={quest.missionName}
                          description={quest.description}
                          xpReward={quest.xpReward}
                          requirements={quest.requirements}
                          currentPoints={0}
                          type={quest.daily ? 'Daily Quest' : 'Weekly Quest'}
                          isEditable={true} missiontype={'Daily'} />
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
