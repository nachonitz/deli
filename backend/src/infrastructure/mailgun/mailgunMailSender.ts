import Mailgun from "mailgun.js";
import formData from "form-data";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { MailSender } from "../../business/mailSender";

const mailgun = new Mailgun(formData);

export class MailgunMailSender implements MailSender {
  private mg: ReturnType<typeof mailgun.client>;
  constructor(private apiKey: string, private domain: string) {
    this.mg = mailgun.client({ username: "api", key: apiKey });
  }

  private loadTemplate(variables: any): string {
    const templatePath = "resources/confirmationEmail.html";
    const source = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(source);
    return template(variables);
  }

  public async sendEmail(to: string, userName: string): Promise<void> {
    const html = this.loadTemplate({
      user_name: userName,
    });

    const data = {
      from: "Deli <no-reply@deli.com>",
      to: to,
      subject: "¡Bienvenido a deli!",
      html: html,
    };

    try {
      await this.mg.messages.create(this.domain, data);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Email sending failed");
    }
  }
}
