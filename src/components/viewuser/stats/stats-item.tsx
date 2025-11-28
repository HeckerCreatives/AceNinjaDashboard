import type { FC, ReactNode } from "react"

interface StatItemProps {
  icon: ReactNode
  label: string
  value: string
}

const icons = [
    {name: 'Health', img: '/manage/Health.webp'},
    {name: 'Energy', img: '/manage/Energy.webp'},
    {name: 'Armor', img: '/manage/Armor.webp'},
    {name: 'Magic Resist', img: '/manage/Magic Resist.webp'},
    {name: 'Speed', img: '/manage/Speed.webp'},
    {name: 'Lifesteal', img: '/manage/Life steal.webp'},
    {name: 'Omnivamp', img: '/manage/Omnivamp.webp'},
    {name: 'Attack Damage', img: '/manage/Attack Damage.webp'},
    {name: 'Magic Damage', img: '/manage/Magic Damage.webp'},
    {name: 'Armor Penetration', img: '/manage/Armor Penetration.webp'},
    {name: 'Magic Penetration', img: '/manage/Magic Penetration.webp'},
    {name: 'Critical Chance', img: '/manage/Critical Chance.webp'},
    {name: 'Heal and Shield Power', img: '/manage/Heal and Shield.webp'},
    {name: 'Critical Damage', img: '/manage/Critical Damage.webp'},
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
      <span className="font-bold text-sm text-white">{Number(prop.value).toLocaleString()}</span>
    </div>
  )
}


