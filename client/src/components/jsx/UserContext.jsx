import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";


export const UserContext = createContext({});
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        axios
          .get("/profile", { headers: { Authorization: `Bearer ${token}` } })
          .then(({ data }) => {
            setUser(data);
          });
      }
    }, []);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }