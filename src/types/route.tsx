import { Gamepad, Gem, Globe, Home, LayoutGrid, ShoppingBag, ShoppingBasket, Swords, TicketCheck, User, UserRound, Users, UsersRound } from "lucide-react";

export const userRoutes = [
    {route:'/user/dashboard', name: 'Dashboard', icon: <Home size={15}/> },
    {route:'/user/inventory', name: 'Inventory', icon: <ShoppingBasket size={15}/> },
    {route:'/user/pvp', name: 'Pvp', icon: <Swords size={15}/> },
    {route:'/user/purchase', name: 'Purchase', icon: <ShoppingBag size={15}/> },
    {route:'/user/topup', name: 'Top up', icon: <Gem size={15}/> },
]

export const superadminRoutes = [
    {route:'/superadmin/dashboard', name: 'Dashboard', icon: <LayoutGrid size={15}/>, subitems: [] },
    {route:'/superadmin/players', name: 'Players', icon: <UsersRound size={15}/>, subitems: [] },
    {route:'/superadmin/', name: 'Website', icon: <Globe size={15}/>,
    subitems: [
        {route:'/superadmin/website/news', name: 'News', icon: <Home size={15}/>},
       
    ] },
    {route:'/superadmin/game', name: 'Game', icon: <Gamepad size={15}/>,
    subitems: [
        {route:'/superadmin/game/announcement', name: 'Announcement'},
        {route:'/superadmin/game/redeemcodes', name: 'Redeem Codes'},
        {route:'/superadmin/game/dailyquest', name: 'Daily Quest'},
        {route:'/superadmin/game/battlepass', name: 'Battle Pass'},
        {route:'/superadmin/game/pvp', name: 'PvP'},
        {route:'/superadmin/game/rewards', name: 'Rewards'},
        {route:'/superadmin/game/maintenance', name: 'Maintenance'},
    ] },
    {route:'/superadmin/profile', name: 'Profile', icon: <UserRound size={15}/>, subitems: [] },


]


export const userViewRoutes = [
    {route:'/superadmin/players/viewuser/dashboard', name: 'Dashboard', icon: <Home size={15}/> },
    {route:'/superadmin/players/viewuser/inventory', name: 'Inventory', icon: <ShoppingBasket size={15}/> },
    {route:'/superadmin/players/viewuser/pvp', name: 'Pvp', icon: <Swords size={15}/> },
    {route:'/superadmin/players/viewuser/bp', name: 'Battle Pass', icon: <TicketCheck size={15}/> },
    
]