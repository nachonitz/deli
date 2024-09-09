import { createContext } from "react";
import { CreateUserDto } from "../api/models/user";

interface UserContextProps {
  register: (user: CreateUserDto) => Promise<boolean>;
  isLoggedIn: boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);
