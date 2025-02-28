import { Gamepad, Gem, Globe, Home, LayoutGrid, ShoppingBag, ShoppingBasket, Swords, TicketCheck, User, UserRound, Users, UsersRound } from "lucide-react";
import { FaBullhorn } from "react-icons/fa";
import { GrVmMaintenance } from "react-icons/gr";
import { RiGamepadFill } from "react-icons/ri";



export const userRoutes = [
    {route:'/user/dashboard', name: 'Dashboard', icon: <Home size={15}/> },
    {route:'/user/inventory', name: 'Inventory', icon: <ShoppingBasket size={15}/> },
    {route:'/user/pvp', name: 'Pvp', icon: <Swords size={15}/> },
    {route:'/user/purchase', name: 'Purchase', icon: <ShoppingBag size={15}/> },
    {route:'/user/topup', name: 'Top up', icon: <Gem size={15}/> },
]

export const superadminRoutes = [
    {route:'/superadmin/dashboard', name: 'Dashboard', icon: <LayoutGrid size={15}/>, subitems: [] },
    {route:'/superadmin/players', name: 'Manage Players', icon: <UsersRound size={15}/>, subitems: [] },
     {route:'/superadmin/', name: 'Newsletter', icon: <FaBullhorn size={15}/>,
     subitems: [
         {route:'/superadmin/newsletter/subscribers', name: 'Subscribers', icon: <FaBullhorn size={15}/>},
         {route:'/superadmin/newsletter/registered', name: 'Registered', icon: <FaBullhorn size={15}/>},
       
     ] },
    // {route:'/superadmin/maintenance', name: 'Maintenance', icon: <GrVmMaintenance size={15}/>, subitems: [] },
    // {route:'/superadmin/', name: 'Announcement', icon: <FaBullhorn size={15}/>,
    //  subitems: [
    //      {route:'/superadmin/announcement/message', name: 'Message', icon: <FaBullhorn size={15}/>},
    //      {route:'/superadmin/announcement/update', name: 'Update', icon: <FaBullhorn size={15}/>},
       
    //  ] },

    //  {route:'/superadmin/', name: 'Games', icon: <RiGamepadFill size={15}/>,
    //  subitems: [
    //      {route:'/superadmin/games/pvp', name: 'PVP', icon: null},
    //      {route:'/superadmin/games/quest', name: 'Quest', icon: null},
    //      {route:'/superadmin/games/store', name: 'Store', icon: null},
    //      {route:'/superadmin/games/redeemcodes', name: 'Redeem Codes', icon: null},
       
    //  ] },



]


export const userViewRoutes = [
    {route:'/superadmin/players/viewuser/dashboard', name: 'Dashboard', icon: <Home size={15}/> },
    {route:'/superadmin/players/viewuser/inventory', name: 'Inventory', icon: <ShoppingBasket size={15}/> },
    {route:'/superadmin/players/viewuser/pvp', name: 'Pvp', icon: <Swords size={15}/> },
    {route:'/superadmin/players/viewuser/bp', name: 'Battle Pass', icon: <TicketCheck size={15}/> },
    
]