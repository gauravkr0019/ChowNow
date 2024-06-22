import { useEffect, useState, useContext } from "react";
import { restaurants } from "../constants";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/useContext";

const Body = () => {
  const [serachText, setSearchText] = useState(""); // return a array [variable name, fun to update the variable]
  const [allrestaurant, setAllRestaurant] = useState([]);
  const [filteredrestaurant, setFilteredrestaurant] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getRestaurant();
  }, []);

  async function getRestaurant() {
    // const data= await fetch("https://www.swiggy.com/mapi/homepage/getCards?lat=20.3506773&lng=85.80633600000002");
    // const data = await fetch("https://www.swiggy.com/mapi/homepage/getCards?lat=23.365622&lng=85.304041")

    //const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.3506773&lng=85.80633600000002&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")

    // const data =await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.3506773&lng=85.80633600000002&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")

    // const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/update/v5?lat=20.3506773&lng=85.80633600000002")

    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.2960587&lng=85.8245398&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    //const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.517929&lng=88.38341199999999&page_type=DESKTOP_WEB_LISTING')

    if (!data) {
      throw new Error("Failed to fetch data ");
    }

    const json = await data?.json();
    console.log(
      json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setAllRestaurant(
      json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredrestaurant(
      json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    //optional chaning (?)
    // setFilteredrestaurant(
    //   json.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle
    //     ?.restaurants
    // );
    // setAllRestaurant(
    //   json.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle
    //     ?.restaurants
    // );

    // console.log(json);
  }

  //Conditional renderring
  //if restaurant is empty => shimmer ui
  //if restaurant has data => actual data ui

  //not render component(early return)

  const isOnline = useOnline();
  if (!isOnline) return <h1>🔴You are Offline</h1>;

  return filteredrestaurant?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Serach"
          value={serachText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>

        <button
          className="search-btn"
          onClick={() => {
            //filter the data
            const data = filterData(serachText, allrestaurant);

            //update the res. list
            setFilteredrestaurant(data);
          }}
        >
          Search
        </button>
      </div>
      <div>
        {/* <input type='text' value={user.name} onChange={(e)=>setUser({
          ...user,
          name: e.target.value,
            })}></input> */}
      </div>

      <div className="restauranlist">
        {filteredrestaurant.length === 0 ? (
          <h1>No Restaurant Found</h1>
        ) : (
          filteredrestaurant?.map((restaurant) => {
            return (
              <Link
                to={"restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Body;

// npm i @reduxjs/toolkit -> core of redux
// npm i react-redux -> bridge between react and redux
