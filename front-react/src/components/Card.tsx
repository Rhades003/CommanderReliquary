import React from 'react'

const Card = ({card}) => {
  return (
    <div style={{display:'flex', width:'30%', border: '1px solid white', justifyContent:'center', flexDirection:'column', margin: '1rem',}}>
        <img src={card.image_uris.large} className='imgCard'></img>
        <div style={{height: '30vh'}}>
            <h1 className='nameCard'>{card.name}</h1><p>{card.mana_cost}</p>
            <br/>
            <p className='rarityCard'>{card.rarity}</p>
            <p className='typeCard'>{card.type_line}</p> 
        </div>        
    </div>
  )
}

export default Card