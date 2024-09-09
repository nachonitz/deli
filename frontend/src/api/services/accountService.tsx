import { api } from "../api";
import { CreateUserDto } from "../models/user";

export const register = async (user: CreateUserDto): Promise<string> => {
  const response = await api.post("/accounts", user);
  const token: string = response.data.token;
  return token;
};
