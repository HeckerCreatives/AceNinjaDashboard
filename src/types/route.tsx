import { Box, Boxes, Gamepad, Gem, Globe, Globe2, Home, LayoutGrid, ShoppingBag, ShoppingBasket, Swords, Ticket, TicketCheck, User, UserRound, Users, UsersRound } from "lucide-react";
import { FaBullhorn, FaMoneyBill } from "react-icons/fa";
import { GiRank1, GiWhirlpoolShuriken } from "react-icons/gi";
import { GrVmMaintenance } from "react-icons/gr";
import { PiPath, PiRanking } from "react-icons/pi";
import { RiGamepadFill } from "react-icons/ri";
import { TbSwords } from "react-icons/tb";



// export const userRoutes = [
//     {route:'/user/dashboard', name: 'Dashboard', icon: <Home size={15}/> },
//     {route:'/user/inventory', name: 'Inventory', icon: <ShoppingBasket size={15}/> },
//     {route:'/user/pvp', name: 'Pvp', icon: <Swords size={15}/> },
//     {route:'/user/purchase', name: 'Purchase', icon: <ShoppingBag size={15}/> },
//     {route:'/user/topup', name: 'Top up', icon: <Gem size={15}/> },
// ]

export const superadminRoutes = [
    {route:'/superadmin/dashboard', name: 'Dashboard', icon: <LayoutGrid size={15}/>, subitems: [] },
    {route:'/superadmin/players', name: 'Manage Players', icon: <UsersRound size={15}/>, subitems: [] },
     {route:'/superadmin/', name: 'Newsletter', icon: <FaBullhorn size={15}/>,
     subitems: [
         {route:'/superadmin/newsletter/subscribers', name: 'Subscribers', icon: <FaBullhorn size={15}/>},
         {route:'/superadmin/newsletter/registered', name: 'Registered', icon: <FaBullhorn size={15}/>},
       
     ] },
     {route:'/superadmin/maintenance', name: 'Maintenance', icon: <GrVmMaintenance size={15}/>, subitems: [] },
     {route:'/superadmin/', name: 'Announcement', icon: <FaBullhorn size={15}/>,
      subitems: [
          {route:'/superadmin/announcement/message', name: 'Message', icon: <FaBullhorn size={15}/>},
          {route:'/superadmin/announcement/update', name: 'Update', icon: <FaBullhorn size={15}/>},
 
      ] },

      {route:'/superadmin/', name: 'Games', icon: <RiGamepadFill size={15}/>,
      subitems: [
          {route:'/superadmin/games/ranktier', name: 'Rank Tier', icon: null},
          {route:'/superadmin/games/pvp', name: 'PVP', icon: null},
          {route:'/superadmin/games/quest', name: 'Quest', icon: null},
          {route:'/superadmin/games/store', name: 'Store', icon: null},
          {route:'/superadmin/games/redeemcodes', name: 'Redeem Codes', icon: null},
 
      ] },
     {route:'/superadmin/grant', name: 'Grant', icon: <Box size={15}/>, subitems: [] },

     {route:'/superadmin/', name: 'Website', icon: <Globe2 size={15}/>,
      subitems: [
          {route:'/superadmin/website/news', name: 'News', icon: null},
          {route:'/superadmin/website/downloadlinks', name: 'Download Links', icon: null},
          {route:'/superadmin/website/socialmedia', name: 'Social Media', icon: null},
 
      ] },
     {route:'/superadmin/seasons', name: 'Seasons', icon: <PiRanking size={15}/>, subitems: [] },


      



]


export const userViewRoutes = [
    {route:'/superadmin/players/viewuser/dashboard', name: 'Dashboard', icon: <Home size={15}/> },
    {route:'/superadmin/players/viewuser/inventory', name: 'Inventory', icon: <ShoppingBasket size={15}/> },
    {route:'/superadmin/players/viewuser/pvp', name: 'Pvp', icon: <Swords size={15}/> },
    {route:'/superadmin/players/viewuser/bp', name: 'Battle Pass', icon: <TicketCheck size={15}/> },
    
]

export const userRoutes = [
    {name: 'Dashboard', path: '/user/dashboard' , icon: <GiWhirlpoolShuriken size={20}/>},
    {name: 'Inventory', path: '/user/inventory' , icon: <Boxes size={20}/>},
    {name: 'PVP', path: '/user/pvp' , icon: <TbSwords size={20}/>},
    {name: 'Path', path: '/user/path' , icon: <PiPath size={20}/>},
    {name: 'Skills', path: '/user/skills' , icon: <GiWhirlpoolShuriken size={20}/>},
    {name: 'Battle Pass', path: '/user/bp' , icon: <Ticket size={20}/>},
    {name: 'Friends', path: '/user/friends' , icon: <Users size={20}/>},
    {name: 'Marketplace', path: '/user/purchase' , icon: <ShoppingBag size={20}/>},
    {name: 'Top Up', path: '/user/topup' , icon: <FaMoneyBill size={20}/>},
]