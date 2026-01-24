import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? storedUser : null;
  }); // since context state is lost on refresh, we get the user from local storage if exists

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });
  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
