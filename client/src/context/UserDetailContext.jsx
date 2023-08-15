import {createContext, useEffect, useState} from 'react'

export const UserDetailContext = createContext()

export function UserDetailContextProvider ({children}) {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(  () =>{
       if(!userDetails) {
          const userInfo =  JSON.parse(localStorage.getItem('userInfo'));
          if(userInfo){
             setUserDetails(userInfo);
          }
       }
    },[])
    
    return (
        <UserDetailContext.Provider value={{userDetails ,setUserDetails}}>
            {children}
        </UserDetailContext.Provider>
    )
}


