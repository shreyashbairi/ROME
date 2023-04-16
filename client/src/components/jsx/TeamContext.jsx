import { createContext, useState } from "react";

export const TeamContext = createContext({});
export function TeamProvider({ children }) {
  const [teams, setTeams] = useState([
    {
      teamID: Number,
      team: String,
      description: String,
      managerid: String,  
      color: String,
      members: [String]
    }
  ]);

  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
}