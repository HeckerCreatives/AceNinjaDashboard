export type Profile = {
    username: string
    level: number
    xp: number
    rank: number
    coins: number
    crystal: number
    title: string
    status: string
    story: string
}

export type Inventory = {
    itemid: string
    name: string
    rank: string
    status: string
}

export type Pvp = {
    matchid: string
    opponent: string
    status: string
    mmr: number
    start: string
    end: string
}

export type Purchase = {
    itemid: string
    itemname: string
    boughtat: string
    currency: string
    price: string
    date: string
}