import express from "express";
import request from "supertest";
import { AccountController } from "../../src/infrastructure/controllers/accountController";
import { AccountService } from "../../src/business/services/accountService";
import { MemoryUserRepository } from "../../src/infrastructure/repositories/memoryUserRepository";
import { JwtTokenGenerator } from "../../src/infrastructure/jwt/jwtTokenGenerator";
import { MailSender } from "../../src/business/mailSender";

const app = express();
app.use(express.json());

describe("AccountController Integration Tests", () => {
  let accountService: AccountService;
  let userRepository: MemoryUserRepository;
  let tokenGenerator: JwtTokenGenerator;
  let mailSender: jest.Mocked<MailSender>;
  let accountController: AccountController;

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
    tokenGenerator = new JwtTokenGenerator("secret");
    mailSender = {
      sendEmail: jest.fn(),
    };

    accountService = new AccountService(
      userRepository,
      mailSender,
      tokenGenerator
    );
    accountController = new AccountController(accountService);

    app.post("/accounts", (req, res) => accountController.createUser(req, res));
  });

  test("Should create user and return token", async () => {
    const response = await request(app)
      .post("/accounts")
      .send(user)
      .expect(201);

    expect(response.body.token).toBeDefined();

    const createdUser = userRepository.findUserByEmail(user.email);
    expect(createdUser).toBeDefined();
    expect(createdUser?.email).toBe(user.email);
  });

  test("Should return 400 if user already exists", async () => {
    userRepository.addUser(user);

    await request(app).post("/accounts").send(user).expect(400);
  });

  test("Should return 400 if email is invalid", async () => {
    await request(app)
      .post("/accounts")
      .send({ ...user, email: "invalid" })
      .expect(400);
  });

  test("Should return 400 if email is not provided", async () => {
    await request(app)
      .post("/accounts")
      .send({ ...user, email: "" })
      .expect(400);
  });
});
