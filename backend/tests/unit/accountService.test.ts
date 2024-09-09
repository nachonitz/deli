import { MailSender } from "../../src/business/mailSender";
import { AccountService } from "../../src/business/services/accountService";
import { TokenGenerator } from "../../src/business/tokenGenerator";
import { MemoryUserRepository } from "../../src/infrastructure/repositories/memoryUserRepository";

describe("AccountService", () => {
  let mockTokenGenerator: jest.Mocked<TokenGenerator>;
  let mockMailSender: jest.Mocked<MailSender>;
  let userRepository: MemoryUserRepository;
  let accountService: AccountService;

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

    mockTokenGenerator = {
      generateToken: jest.fn(),
    };

    mockMailSender = {
      sendEmail: jest.fn(),
    };

    accountService = new AccountService(
      userRepository,
      mockMailSender,
      mockTokenGenerator
    );
  });

  test("Should return token provided by token generator", async () => {
    mockTokenGenerator.generateToken.mockReturnValueOnce("token");

    const token = await accountService.createUser(user);

    expect(mockTokenGenerator.generateToken).toHaveBeenCalledWith(user.email);
    expect(token).toBe("token");
  });

  test("Should store user in repository", async () => {
    await accountService.createUser(user);

    let createdUser = userRepository.findUserByEmail(user.email);

    expect(createdUser).toBe(user);
  });

  test("Should return null if user already exists", async () => {
    mockTokenGenerator.generateToken.mockReturnValue("token");

    userRepository.addUser(user);
    const token = await accountService.createUser(user);

    expect(token).toBeNull();
  });

  test("Should call mail sender with correct parameters", async () => {
    await accountService.createUser(user);

    expect(mockMailSender.sendEmail).toHaveBeenCalledWith(
      user.email,
      user.username
    );
  });

  test("Sould not create user if mail sender fails", async () => {
    mockMailSender.sendEmail.mockRejectedValueOnce(new Error());

    await expect(accountService.createUser(user)).rejects.toThrow();

    const createdUser = userRepository.findUserByEmail(user.email);
    expect(createdUser).toBeUndefined();
  });

  test("Should not create user if token generator fails", async () => {
    mockTokenGenerator.generateToken.mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(accountService.createUser(user)).rejects.toThrow();

    const createdUser = userRepository.findUserByEmail(user.email);
    expect(createdUser).toBeUndefined();
  });
});
