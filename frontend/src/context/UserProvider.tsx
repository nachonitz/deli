import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../api/services/accountService";
import { UserContext } from "./UserContext";
import { CreateUserDto } from "../api/models/user";

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      setIsLoggedIn(true);
    }
  }, []);

  const register = async (user: CreateUserDto): Promise<boolean> => {
    const token = await registerService(user);
    if (token) {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigate("/welcome");
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ register, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
