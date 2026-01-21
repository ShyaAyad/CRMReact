import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null); // later set user in login/register 
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
