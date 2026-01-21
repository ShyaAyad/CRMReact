import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null); // later set user in login/register
    const [role, setRole] = useState(null);
  return (
    <AuthContext.Provider value={{user, setUser, role, setRole}}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
