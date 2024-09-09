export interface TokenGenerator {
  generateToken(email: string): string;
}
