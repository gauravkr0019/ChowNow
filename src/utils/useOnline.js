import {useState, useEffect} from 'react'

const useOnline=()=>{
  const [isonline, setIsOnline]=useState(true);

  
 useEffect(()=>{
   const handleOnline= ()=>{
       setIsOnline(true);
     };
 
   const handleOffline=()=>{
       setIsOnline(false);
     };

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline",handleOffline)
    

   return (()=>{
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    })
   
  }, [])

  return isonline
}

export default useOnline;