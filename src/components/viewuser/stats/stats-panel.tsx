import type { FC } from "react"

// Icons for stats
import {
  Heart,
  Zap,
  Shield,
  Sparkles,
  Footprints,
  Droplets,
  Infinity,
  Swords,
  Flame,
  Target,
  Wand,
  Percent,
  HeartPulse,
  Bomb,
} from "lucide-react"
import StatItem from "./stats-item"
import { useUserData, useUserStats } from "@/client_actions/user/dashboard/dashboard"
import useCharacterStore from "@/hooks/character"

const icons = [
    {name: 'Health', img: '/manage/Health.png'},
    {name: 'Energy', img: '/manage/Energy.png'},
    {name: 'Armor', img: '/manage/Armor.png'},
    {name: 'Magic Resist', img: '/manage/Magic Resist.png'},
    {name: 'Speed', img: '/manage/Speed.png'},
    {name: 'Lifesteal', img: '/manage/Lifesteal.png'},
    {name: 'Omnivamp', img: '/manage/Omnivamp.png'},
    {name: 'Attack Damage', img: '/manage/Attack Damage.png'},
    {name: 'Magic Damage', img: '/manage/Magic Damage.png'},
    {name: 'Armor Penetration', img: '/manage/Armor Penetration.png'},
    {name: 'Magic Penetration', img: '/manage/Magic Penetration.png'},
    {name: 'Critical Chance', img: '/manage/Critical Chance.png'},
    {name: 'Heal and Shield Power', img: '/manage/Heal and Shield Power.png'},
    {name: 'Critical Damage', img: '/manage/Critical Damage.png'},
]

const StatsPanel: FC = () => {
  const { characterid, setCharacterid, clearCharacterid } = useCharacterStore();
  const { data, isLoading } = useUserStats(characterid)


  return (
    <div className="w-full max-w-3xl bg-light p-4 ">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-2">
          <StatItem icon={<Heart className="h-5 w-5 text-red-500" />} label="Health" value={`${data?.health}`} />
          <StatItem icon={<Zap className="h-5 w-5 text-cyan-400" />} label="Energy"  value={`${data?.energy}`} />
          <StatItem icon={<Shield className="h-5 w-5 text-blue-400" />} label="Armor"  value={`${data?.armor}`} />
          <StatItem icon={<Sparkles className="h-5 w-5 text-purple-400" />} label="Magic Resist"  value={`${data?.magicresist}`} />
          <StatItem icon={<Footprints className="h-5 w-5 text-yellow-500" />} label="Speed" value={`${data?.speed}`} />
          <StatItem icon={<Droplets className="h-5 w-5 text-red-400" />} label="Lifesteal"  value={`${data?.lifesteal}`} />
          <StatItem icon={<Infinity className="h-5 w-5 text-pink-400" />} label="Omnivamp"  value={`${data?.omnivamp}`} />
        </div>

        <div className="space-y-2">
          <StatItem icon={<Swords className="h-5 w-5 text-gray-300" />} label="Attack Damage" value={`${data?.attackdamage}`} />
          <StatItem icon={<Flame className="h-5 w-5 text-blue-300" />} label="Magic Damage"  value={`${data?.magicdamage}`} />
          <StatItem icon={<Target className="h-5 w-5 text-gray-300" />} label="Armor Penetration"  value={`${data?.armorpen}`} />
          <StatItem icon={<Wand className="h-5 w-5 text-blue-300" />} label="Magic Penetration"  value={`${data?.magicpen}`} />
          <StatItem icon={<Percent className="h-5 w-5 text-yellow-400" />} label="Critical Chance"  value={`${data?.critchance}`} />
          <StatItem icon={<HeartPulse className="h-5 w-5 text-green-400" />} label="Heal and Shield Power" value={`${data?.healshieldpower}`} />
          <StatItem icon={<Bomb className="h-5 w-5 text-yellow-500" />} label="Critical Damage"  value={`${data?.critdamage}`} />
        </div>
      </div>
    </div>
  )
}

export default StatsPanel

