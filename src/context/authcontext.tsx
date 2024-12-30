import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { getUserByToken, logout } from "@/states/slices/authSlice";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  handleLogout: () => void;
  refreshUser:(token:string)=>void;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
export const authContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user: User } = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token] = useState<string | null>(localStorage.getItem("token"));
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast({
          title: "logged out successfully",
        });
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };
  const refreshUser=(authToken:string)=>{
    dispatch(getUserByToken(authToken))
    .unwrap()
    .then(() => {
      setIsAuthenticated(true);
    })
    .catch(() => {
      setIsAuthenticated(false);
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    });
  }
  useEffect(() => {
    if (token) {
     refreshUser(token);
    }
  }, [token]);
  useEffect(() => {
    if (User) {
      setUser(User);
    }
  }, [User]);

  return (
    <authContext.Provider value={{ user, isAuthenticated, handleLogout ,refreshUser}}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};
