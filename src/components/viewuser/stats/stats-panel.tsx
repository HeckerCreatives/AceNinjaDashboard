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
  return (
    <div className="w-full max-w-3xl bg-light p-4 ">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-2">
          <StatItem icon={<Heart className="h-5 w-5 text-red-500" />} label="Health" value="1000" />
          <StatItem icon={<Zap className="h-5 w-5 text-cyan-400" />} label="Energy" value="1000" />
          <StatItem icon={<Shield className="h-5 w-5 text-blue-400" />} label="Armor" value="0" />
          <StatItem icon={<Sparkles className="h-5 w-5 text-purple-400" />} label="Magic Resist" value="0" />
          <StatItem icon={<Footprints className="h-5 w-5 text-yellow-500" />} label="Speed" value="50" />
          <StatItem icon={<Droplets className="h-5 w-5 text-red-400" />} label="Lifesteal" value="0%" />
          <StatItem icon={<Infinity className="h-5 w-5 text-pink-400" />} label="Omnivamp" value="0%" />
        </div>

        <div className="space-y-2">
          <StatItem icon={<Swords className="h-5 w-5 text-gray-300" />} label="Attack Damage" value="0" />
          <StatItem icon={<Flame className="h-5 w-5 text-blue-300" />} label="Magic Damage" value="0" />
          <StatItem icon={<Target className="h-5 w-5 text-gray-300" />} label="Armor Penetration" value="0" />
          <StatItem icon={<Wand className="h-5 w-5 text-blue-300" />} label="Magic Penetration" value="0" />
          <StatItem icon={<Percent className="h-5 w-5 text-yellow-400" />} label="Critical Chance" value="5%" />
          <StatItem icon={<HeartPulse className="h-5 w-5 text-green-400" />} label="Heal and Shield Power" value="0%" />
          <StatItem icon={<Bomb className="h-5 w-5 text-yellow-500" />} label="Critical Damage" value="70%" />
        </div>
      </div>
    </div>
  )
}

export default StatsPanel

