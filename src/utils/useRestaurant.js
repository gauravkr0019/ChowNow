import { useState, useEffect } from "react";

const useRestaurant = (id) => {
  const [restaurant, setRestaurant] = useState(null);

  // get data from API
  useEffect(() => {
    getRestaurantInfo();
  }, []);

  // async function getRestaurantInfo() {
  //   const data = await fetch(
  //     `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.3506773&lng=85.80633600000002&restaurantId=${id}`
  //       // id+
  //       // "&catalog_qa=undefined&submitAction=ENTER",
  //   );

  //   // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.51800&lng=88.38320&restaurantId=454936

  //   const json = await data.json();
  //   setRestaurant(json);

  //   // console.log(json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards)
  // }



  const getRestaurantInfo = async () => {
    try {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.3506773&lng=85.8063360000000&restaurantId=${id}`)
        if (!response.ok) {
            const err = response.status;
            throw new Error(err)
        }
        else {
            const json = await response.json();
            const ResInfo = json?.data?.cards?.find(card => card?.card?.card["@type"]?.includes("food.v2.Restaurant"))
            const ResMenu = json?.data?.cards?.find(card => card?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(menu => menu?.card?.card["@type"]?.includes("food.v2.ItemCategory")
            ))
            setRestaurant({ResInfo, ResMenu})
            //console.log(restaurant)
        }
    } catch (err) {
        console.log(err)
        setRestaurant(null)
    }
}

  //export restaurant data
  return restaurant;
};

export default useRestaurant;