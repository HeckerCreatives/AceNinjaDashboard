import { Box, Boxes, Coins, Gamepad, Gem, GemIcon, Globe, Globe2, Home, LayoutGrid, List, Settings2, ShoppingBag, ShoppingBasket, Swords, Ticket, TicketCheck, User, UserRound, Users, UsersRound, Wallet } from "lucide-react";
import { FaBullhorn, FaMoneyBill } from "react-icons/fa";
import { GiRank1, GiWhirlpoolShuriken } from "react-icons/gi";
import { GrVmMaintenance } from "react-icons/gr";
import { PiPath, PiRanking } from "react-icons/pi";
import { RiGamepadFill } from "react-icons/ri";
import { TbSwords } from "react-icons/tb";

export interface SuperadminRoute {
  route: string;
  name: string;
  icon: JSX.Element | null;
  subitems: SuperadminRoute[];
}

// SUPERADMIN
export const superadminRoutes: SuperadminRoute[] = [
  { route: '/superadmin/dashboard', name: 'Dashboard', icon: <LayoutGrid size={15} />, subitems: [] },
  { route: '/superadmin/players', name: 'Manage Players', icon: <UsersRound size={15} />, subitems: [] },
  {
    route: '/superadmin/games',
    name: 'Games',
    icon: <RiGamepadFill size={15} />,
    subitems: [
      { route: '/superadmin/games/general', name: 'General', icon: null, subitems: [] },
      { route: '/superadmin/games/news', name: 'News & Showcase', icon: null, subitems: [] },
      { route: '/superadmin/games/message', name: 'Messages', icon: <FaBullhorn size={15} />, subitems: [] },
      { route: '/superadmin/games/battlepass', name: 'Battle Pass', icon: null, subitems: [] },
      { route: '/superadmin/games/store', name: 'Store', icon: null, subitems: [] },
      { route: '/superadmin/games/vippacks', name: 'VIP Packs', icon: null, subitems: [] },
      { route: '/superadmin/games/quest', name: 'Quest', icon: null, subitems: [] },
      { route: '/superadmin/games/leaderboards', name: 'Leaderboards', icon: null, subitems: [] },
      { route: '/superadmin/games/ranktier', name: 'Rank Tier', icon: null, subitems: [] },
      { route: '/superadmin/games/rankrewards', name: 'Rank Rewards', icon: null, subitems: [] },
      { route: '/superadmin/games/pvp', name: 'PVP', icon: null, subitems: [] },
      { route: '/superadmin/games/raidboss', name: 'Raid Boss', icon: null, subitems: [] },
    ],
  },
  {
    route: '/superadmin/rewards',
    name: 'Rewards',
    icon: <Coins size={15} />,
    subitems: [
      { route: '/superadmin/rewards/dailyspin', name: 'Daily Spin', icon: null, subitems: [] },
      { route: '/superadmin/rewards/dailyexpspin', name: 'Daily Exp Spin', icon: null, subitems: [] },
      { route: '/superadmin/rewards/weeklylogin', name: 'Weekly Login', icon: null, subitems: [] },
      { route: '/superadmin/rewards/monthlylogin', name: 'Monthly Login', icon: null, subitems: [] },
      { route: '/superadmin/rewards/redeemcodes', name: 'Redeem Codes', icon: null, subitems: [] },
      { route: '/superadmin/rewards/chest', name: 'Chests', icon: null, subitems: [] },

    ],
  },
  {
    route: '/superadmin/grant',
    name: 'Grant',
    icon: <FaBullhorn size={15} />,
    subitems: [
      { route: '/superadmin/grant/item', name: 'Item', icon: <Box size={15} />, subitems: [] },
      { route: '/superadmin/grant/currency', name: 'Currency', icon: <FaMoneyBill size={15} />, subitems: [] },
    ],
  },
  {
    route: '/superadmin/website',
    name: 'Website',
    icon: <Globe2 size={15} />,
    subitems: [
      { route: '/superadmin/website/news', name: 'News', icon: null, subitems: [] },
      { route: '/superadmin/website/downloadlinks', name: 'Download Links', icon: null, subitems: [] },
      { route: '/superadmin/website/socialmedia', name: 'Social Media', icon: null, subitems: [] },
    ],
  },
  {
    route: '/superadmin/',
    name: 'Newsletter',
    icon: <FaBullhorn size={15} />,
    subitems: [
      { route: '/superadmin/newsletter/subscribers', name: 'Subscribers', icon: <FaBullhorn size={15} />, subitems: [] },
      { route: '/superadmin/newsletter/registered', name: 'Registered', icon: <FaBullhorn size={15} />, subitems: [] },
    ],
  },
  { route: '/superadmin/maintenance', name: 'Maintenance', icon: <GrVmMaintenance size={15} />, subitems: [] },
  { route: '/superadmin/topuphistory', name: 'Topup History', icon: <List size={15} />, subitems: [] },
  // { route: '/superadmin/patcher', name: 'Patcher', icon: <Settings2 size={15} />, subitems: [] },
];


//USER
export const userRoutes = [
    {name: 'Dashboard', path: '/user/dashboard' , icon: <GiWhirlpoolShuriken size={20}/>, subItems: []},
  
    {name: 'Inventory', path: '/user/inventory' , icon: <Boxes size={20}/>},
    {name: 'PVP', path: '/user/pvp' , icon: <TbSwords size={20}/>},
    {name: 'Path', path: '/user/path' , icon: <PiPath size={20}/>},
    {name: 'Skills', path: '/user/skills' , icon: <GiWhirlpoolShuriken size={20}/>},
    {name: 'Battle Pass', path: '/user/bp' , icon: <Ticket size={20}/>},
    {name: 'Story', path: '/user/story' , icon: <List size={20}/>},
    {name: 'Friends', path: '/user/friends' , icon: <Users size={20}/>},
    {name: 'Marketplace', path: '/user/purchase' , icon: <ShoppingBag size={20}/>},
    {name: 'Top Up', path: '/user/topup' , icon: <FaMoneyBill size={20}/>},
    {name: 'Vip Packs', path: '/user/vippacks' , icon: <Boxes size={20}/>},
]