
import { useContext, createContext, useState, ReactNode } from "react";


interface AuthContextType {
   authUser: string;
   setAuthUser: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuthContext must be used within an AuthProvider");
   }
   return context;
};

interface Props {
   children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
   const [authUser, setAuthUser] = useState<string>("")
   return <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
   </AuthContext.Provider>
}



