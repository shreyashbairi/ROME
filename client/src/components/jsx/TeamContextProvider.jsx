import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";


export const TeamContext = createContext({});
export function TeamContextProvider({ children }) {
    const [team, setTeam] = useState(null);
  
    const changeTeam = newTeam => {
        setTeam(newTeam);
    }
  
    return (
      <TeamContext.Provider value={{ team, setTeam }}>
        {children}
      </TeamContext.Provider>
    );
  }