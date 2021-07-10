import nodemailer from "nodemailer";
import fs from "fs";
import { IDataEmail } from "./dtos";
import handlebars from "handlebars";
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

    const pathUT8 = fs.readFileSync(path).toString("utf-8");

    const template = handlebars.compile(pathUT8);

    const templateHTML = template(variable);

    const message = await configTransport.sendMail({
      from: "mindcontato@mind.com.br",
      to: to,
      subject: "Reset password - Mind !",
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { ConfigSendEmail };
