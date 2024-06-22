export function filterData(serachText, restaurants){
    const filterData =restaurants.filter((item) => item.info.name.toLowerCase().includes(serachText.toLowerCase()));
    
      return filterData;
    }