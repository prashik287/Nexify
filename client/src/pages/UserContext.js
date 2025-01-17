import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// UserProvider component to provide the context to children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will store the user data

  const setUserData = (userData) => {
    setUser(userData); // Function to update user state
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context in other components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
