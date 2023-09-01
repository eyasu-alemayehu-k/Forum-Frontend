import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const ErrorContext = createContext();

export const useUserContext = () => useContext(UserContext);
export const useErrorContext = () => useContext(ErrorContext);

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });
  const [error, setError] = useState("");

  return (
    <ErrorContext.Provider value={[error, setError]}>
      <UserContext.Provider value={[userData, setUserData]}>
        {children}
      </UserContext.Provider>
    </ErrorContext.Provider>
  );
}
