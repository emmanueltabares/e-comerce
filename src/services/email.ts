import Config from '../config/config';
import nodemailer from 'nodemailer';
import { UserI } from '../interfaces/users';

const DESTINATION = 'e.tabares20@gmail.com'

class Email {

  private owner;
  private transporter;

  constructor() {
    this.owner = {
      name: Config.ETHEREAL_NAME,
      address: Config.ETHEREAL_EMAIL,
    };

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: Config.ETHEREAL_EMAIL,
        pass: Config.ETHEREAL_PASSWORD,
        },
      tls: {
        rejectUnauthorized: false
        }
    });

    this.transporter.verify().then(() => console.log('Ready to send email'))
  }

  async sendEmail(content: string) {
    const mailOptions = {
      from: this.owner,
      to: DESTINATION,
      subject: 'Nuevo registro',
      html: content,
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const EmailService = new Email();