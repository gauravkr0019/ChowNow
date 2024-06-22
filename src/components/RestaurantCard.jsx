// import {useContext} from 'react'
import { ImageCDN} from "../constants";
import UserContext from '../utils/useContext'
import ratingLogo from '../assets/rating-image.png'


const RestaurantCard= ({name, cloudinaryImageId, cuisines, areaName, avgRatingString}) => {
  // const {user}= useContext(UserContext)
    
    return(
      // <Link to='restaurand/'></Link>
    <div className="restaurantcard"> 
       <img src= {ImageCDN + cloudinaryImageId}/>

        <h2>{name}</h2>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{areaName}</h4>
        <h4>{avgRatingString}<img src={ratingLogo} style={{width: '12px'}}/></h4>
        
      {/* <p>{user.name}</p> */}
    </div>
    
    )
    
}

export default RestaurantCard;