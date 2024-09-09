import { User } from "./user";

export interface UserRepository {
  addUser(user: User): void;
  deleteUser(email: string): void;
  findUserByEmail(email: string): User | undefined;
}
