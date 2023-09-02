import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const CountContext = createContext();

export const useUserContext = () => useContext(UserContext);
export const useCountContext = () => useContext(CountContext);

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });
  const [count, setCount] = useState(3);

  return (
    <CountContext.Provider value={[count, setCount]}>
      <UserContext.Provider value={[userData, setUserData]}>
        {children}
      </UserContext.Provider>
    </CountContext.Provider>
  );
}
