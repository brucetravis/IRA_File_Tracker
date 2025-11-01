import { createContext, useContext } from "react";

// create the authContext
const authContext = createContext()

// create a custom hook instead of using the context directy
export const useAuth = () => useContext(authContext)



export default function authProvider({children}) {
    
    return (
        <authContext.Provider value={{}}>
            {children}
        </authContext.Provider>
    )
}