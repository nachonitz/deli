import { MemoryUserRepository } from "../../src/infrastructure/repositories/memoryUserRepository";

describe("AccountService", () => {
  let userRepository: MemoryUserRepository;

  const user = {
    email: "johndoe@gmail.com",
    fullname: "John Doe",
    age: 26,
    username: "johndoe",
    country: "Argentina",
    password: "johndoeargentina",
  };

  beforeEach(() => {
    userRepository = new MemoryUserRepository();
  });

  test("Should get user by email if we store a user", async () => {
    userRepository.addUser(user);

    let createdUser = userRepository.findUserByEmail(user.email);

    expect(createdUser).toBe(user);
  });

  test("Should raise error if we store the same email twice", async () => {
    userRepository.addUser(user);

    expect(() => userRepository.addUser(user)).toThrowError(
      "User already exists"
    );
  });

  test("Should raise error if we store the same username twice", async () => {
    userRepository.addUser(user);
    expect(() =>
      userRepository.addUser({ ...user, email: "anotherEmail@email.com" })
    ).toThrowError("Username already taken");
  });
});
