import { UserRepository } from "../../business/userRepository";
import { User } from "../../business/user";

export class MemoryUserRepository implements UserRepository {
  private users: { [email: string]: User } = {};

  addUser(user: User): void {
    if (this.users[user.email]) {
      throw new Error("User already exists");
    }

    for (let email in this.users) {
      if (this.users[email].username === user.username) {
        throw new Error("Username already taken");
      }
    }
    this.users[user.email] = user;
  }

  deleteUser(email: string): void {
    delete this.users[email];
  }

  findUserByEmail(email: string): User | undefined {
    return this.users[email];
  }
}
