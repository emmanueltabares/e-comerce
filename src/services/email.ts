import Config from '../config/config';
import nodemailer from 'nodemailer';
import { Logger } from './logger';

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

    this.transporter.verify().then(() => Logger.info('Ready to send email'))
  }

  async sendEmail(content: string, subject: string, destination: string) {
    const mailOptions = {
      from: this.owner,
      to: destination,
      subject: subject,
      html: content,
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const EmailService = new Email();