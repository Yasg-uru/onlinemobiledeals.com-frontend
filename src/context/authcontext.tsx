import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { getUserByToken } from "@/states/slices/authSlice";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
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
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      dispatch(getUserByToken(token))
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
  }, [token]);
  useEffect(() => {
    if (User) {
      setUser(User);
    }
  }, [User]);

  return (
    <authContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};
