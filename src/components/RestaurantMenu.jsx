import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {ImageCDN} from '../constants';
import Shimmer from './Shimmer';
import useRestaurant from '../utils/useRestaurant';

const RestaurantMenu=()=>{

  const params= useParams();
  const {id}= params;
  console.log(id)

  const restaurant=useRestaurant(id)
  console.log(restaurant)
  
  // const resmenu=restaurant?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

  const resmenu=restaurant?.ResMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

  // const data2=restaurant?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards
 
  
  return !resmenu?(<Shimmer />):(
    <div style={{display:'flex', flexDirection: 'row'}}>
      <div>
        <h1>{restaurant?.data?.cards[0]?.card?.card?.info?.name}</h1>
        <h2>{restaurant?.data?.cards[0]?.card?.card?.info?.areaName}</h2>
        <h2>{restaurant?.data?.cards[0]?.card?.card?.info?.avgRating}</h2>
        <img src={ImageCDN + restaurant?.data?.cards[0]?.card?.card?.info?.cloudinaryImageId}></img>
      </div>
     
      <div style={{margin: '20px'}}>
        <h2 style={{paddingLeft: '28px'}}>Menu</h2>
        {console.log(Object.values(resmenu)?.map(item =>(item?.card?.info?.name)))}
        <ul>
          {Object.values(resmenu)?.map(item =>{
            const price=item?.card?.info?.defaultPrice/100 || item?.card?.info?.price/100
            return (
              <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', width:'100%', padding: '10px'}}>
                <li><img src={ImageCDN+item.card.info.imageId} /></li>
                <li>{item?.card?.info?.name}</li>
                <li style={{listStyleType: 'none'}}>₹{price}</li>
              </div>
              
            )
      })}
        </ul>
        {/* {console.log(Object.values(data2)[0]?.card?.info?.name)} */}
      </div>
    </div>
  )
}
export default RestaurantMenu;