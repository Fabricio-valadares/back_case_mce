import nodemailer from "nodemailer";
import fs from "fs";
import { IDataEmail } from "./dtos";

class ConfigSendEmail {
  static async sendEmail({ to, variable, path }: IDataEmail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const configTransport = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await configTransport.sendMail({
      from: "mindcontato@mind.com.br",
      to: to,
      subject: "Reset password - Mind !",
      text: `Hello to ${variable.name} - acesse link ${variable.link}`,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { ConfigSendEmail };
