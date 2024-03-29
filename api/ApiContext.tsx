// ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { router } from 'expo-router';
import {UserType} from './User'


export interface ApiContextType {
  authToken: string;
  loggedIn: boolean;
  loginUser: (username:string,password:string) => Promise<null | String>;
  signoutUser: () => void;
  updateUserData: () => Promise<null | String>;
  userData: null | UserType;
}


export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | UserType>(null);

  const updateUserData = async() => {
    if(!loggedIn){
      return "User is not logged in"
    }

    try{
        const response = await fetch('http://127.0.0.1:8000/user/gender/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });

        if (!response.ok) {
            return "could not connect to server";
        }
          const data = await response.json();
          setUserData(data.access);
          return null;
    }catch(error:any){
        return error;
    }
  }

  const loginUser = async(username:string,password:string) => {

    try{
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            });
        
        if (!response.ok) {
            return "could not connect to server";
        }
          const data = await response.json();
          setAuthToken(data.access);
          setLoggedIn(true);
          router.replace('/home');
          return null;
    }catch(error:any){
        return error;
    }
  }

  const signoutUser = () =>{
        setAuthToken('');
        setLoggedIn(false);
        setUserData(null);
        router.replace('/login');
        return true;
  }

  return(
  <ApiContext.Provider value={{ authToken,loggedIn,loginUser,signoutUser,updateUserData,userData}}>
    {children}
  </ApiContext.Provider>
  )
}

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('getApiKey must be used within a ApiProvider');
  }
  return context;
};

//returns a tuple where the first item is error/success message and second is truth value of login attempt
