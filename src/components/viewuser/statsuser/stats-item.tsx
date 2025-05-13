import type { FC, ReactNode } from "react"

interface StatItemProps {
  icon: ReactNode
  label: string
  value: string
}

const icons = [
    {name: 'Health', img: '/manage/Health.png'},
    {name: 'Energy', img: '/manage/Energy.png'},
    {name: 'Armor', img: '/manage/Armor.png'},
    {name: 'Magic Resist', img: '/manage/Magic Resist.png'},
    {name: 'Speed', img: '/manage/Speed.png'},
    {name: 'Lifesteal', img: '/manage/Life steal.png'},
    {name: 'Omnivamp', img: '/manage/Omnivamp.png'},
    {name: 'Attack Damage', img: '/manage/Attack Damage.png'},
    {name: 'Magic Damage', img: '/manage/Magic Damage.png'},
    {name: 'Armor Penetration', img: '/manage/Armor Penetration.png'},
    {name: 'Magic Penetration', img: '/manage/Magic Penetration.png'},
    {name: 'Critical Chance', img: '/manage/Critical Chance.png'},
    {name: 'Heal and Shield Power', img: '/manage/Heal and Shield.png'},
    {name: 'Critical Damage', img: '/manage/Critical Damage.png'},
]

export default function StatItem( prop: StatItemProps) {

    const findicon = icons.find((item) =>  item.name === prop.label)?.img
  return (
    <div className="flex items-center justify-between rounded-md">
      <div className="flex items-center gap-2">
        <img src={findicon} alt="icon" width={35}/>
        {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40">{prop.icon}</div> */}
        <span className="text-xs font-medium text-white">{prop.label}:</span>
      </div>
      <span className="font-bold text-sm text-white">{prop.value}</span>
    </div>
  )
}


