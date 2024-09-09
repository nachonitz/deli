import { TokenGenerator } from "../tokenGenerator";
import { MailSender } from "../mailSender";
import { UserRepository } from "../userRepository";
import { User } from "../user";

export class AccountService {
  private userRepository: UserRepository;
  private mailSender: MailSender;
  private tokenGenerator: TokenGenerator;

  constructor(
    userRepository: UserRepository,
    mailSender: MailSender,
    tokenGenerator: TokenGenerator
  ) {
    this.userRepository = userRepository;
    this.mailSender = mailSender;
    this.tokenGenerator = tokenGenerator;
  }

  public async createUser(user: User): Promise<string | null> {
    try {
      const existingUser = this.userRepository.findUserByEmail(user.email);
      if (existingUser) {
        return null;
      }

      this.userRepository.addUser(user);
      await this.mailSender.sendEmail(user.email, user.username);

      const token = this.tokenGenerator.generateToken(user.email);
      return token;
    } catch (error) {
      this.userRepository.deleteUser(user.email);
      throw error;
    }
  }
}
