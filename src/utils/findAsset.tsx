export const badgeImg = (data: number) => {
    if(data === 0){
        return <p className=' text-xs'>No badge equiped</p>
    } else  if(data === 1){
        return <img src="/Badge/01 - VIP Badge.png" alt="badge" width={100}/>
    }else  if(data === 2){
        return <img src="/Badge/02 - Raid Boss Badge.png" alt="badge" width={100} />
    }else  if(data === 3){
        return <img src="/Badge/03 - Clan Season 1 Champion Badge.png" alt="badge" width={100}/>
    }else  if(data === 4){
        return <img src="/Badge/04 - PVP Badge.png" alt="badge" width={100}/>
    }else  if(data === 5){
        return <img src="/Badge/05 - Season 1 Badge.png" alt="badge" width={100}/>
    }else  if(data === 6){
        return <img src="/Badge/06 - Shadow Badge.png" alt="badge"width={100} />
    }else  if(data === 7){
        return <img src="/Badge/07 - Samurai Badge.png" alt="badge" width={100}/>
    }else  if(data === 8){
        return <img src="/Badge/08 - Dark Path Badge.png" alt="badge" width={100}/>
    }else  if(data === 9){
        return <img src="/Badge/09 - Ninja Badge.png" alt="badge" width={100}/>
    }else  if(data === 10){
        return <img src="/Badge/10 - Ace Badge.png" alt="badge" width={100}/>
    }
}


export const titleAssets = (data: number) => {
    if(data === 0){
        return <p className=' text-xs'>No title equiped</p>
    } else  if(data === 1){
        return <img src="/Titles/1-Ace Comp.gif" alt="titles" width={250}/>
    }else  if(data === 2){
        return <img src="/Titles/2-Clan God Comp.gif" alt="badge" width={250} />
    }else  if(data === 3){
        return <img src="/Titles/3-Final BOss Comp.gif" alt="badge" width={250}/>
    }else  if(data === 4){
        return <img src="/Titles/4-Goat Comp.gif" alt="badge" width={250}/>
    }else  if(data === 5){
        return <img src="/Titles/5-MasterMind Comp.gif" alt="badge" width={250}/>
    }else  if(data === 6){
        return <img src="/Titles/6-Player Diff Comp.gif" alt="badge"width={250} />
    }else  if(data === 7){
        return <img src="/Titles/7-Stylish Comp.gif" alt="badge" width={250}/>
    }else  if(data === 8){
        return <img src="/Titles/8-Unkillable Comp.gif" alt="badge" width={250}/>
    }else  if(data === 9){
        return <img src="/Titles/9-Vip_title_animation.gif" alt="badge" width={250}/>
    }else  if(data === 10){
        return <img src="/Titles/10-void walker Comp.gif" alt="badge" width={250}/>
    }
}


export const companionImg = (data: string) => {
    if(data === 'Viper'){
        return <img src="/companions/Viper.png" alt="companion" />
    } else if (data === 'Terra'){
        return <img src="/companions/Terra.png" alt="companion" />
    }else if (data === 'Gale'){
        return <img src="/companions/Gale.png" alt="companion" />
    }else if (data === 'Shade'){
        return <img src="/companions/Shade.png" alt="companion" />
    }else if (data === 'Blaze'){
        return <img src="/companions/Blaze.png" alt="companion" />
    }
}