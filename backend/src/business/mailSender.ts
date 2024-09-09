export interface MailSender {
  sendEmail(to: string, userName: string): Promise<void>;
}
