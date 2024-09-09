import { Router } from "express";
import { AccountController } from "../controllers/accountController";
import { AccountService } from "../../business/services/accountService";
import { MemoryUserRepository } from "../repositories/memoryUserRepository";
import { MailgunMailSender } from "../mailgun/mailgunMailSender";
import dotenv from "dotenv";
import { JwtTokenGenerator } from "../jwt/jwtTokenGenerator";

dotenv.config();

const router = Router();

const mailSender = new MailgunMailSender(
  process.env.MAILGUN_API_KEY || "",
  process.env.MAILGUN_DOMAIN || ""
);
const tokenGenerator = new JwtTokenGenerator(process.env.JWT_SECRET || "");
const userRepository = new MemoryUserRepository();
const userService = new AccountService(
  userRepository,
  mailSender,
  tokenGenerator
);
const accountController = new AccountController(userService);

router.post("/", accountController.createUser);

export default router;
