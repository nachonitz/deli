import jwt from "jsonwebtoken";
import { TokenGenerator } from "../../business/tokenGenerator";

export class JwtTokenGenerator implements TokenGenerator {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  public generateToken(email: string): string {
    return jwt.sign({ email: email }, this.secret, { expiresIn: "1h" });
  }
}
