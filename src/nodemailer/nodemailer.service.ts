import { Injectable} from '@nestjs/common';
import { CreateNodemailerDto } from './dto/create-nodemailer.dto';
import { UpdateNodemailerDto } from './dto/update-nodemailer.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailService: MailerService) {}
  
  
  async emailRecoveryPassword() {
    const message = `Hola si tu no solicitaste la recuperacion de contraseña ignora esto.`;

    try {
      await this.mailService.sendMail({
        from: 'Recuperar contraseña <m3ndezdi4z17@gmail.com>',
        to: '211099@ids.upchiapas.edu.mx',
        subject: `Recuperar contraseña`,
        text: message,
      });
      console.log('Email sent successfully');
      return "Message sent";
    } catch (error) {
      console.log('Error sending email', error);
      throw new Error(`Failed to send email ${error}`);
    }
  }

  emailPromotionFirst() {
    return ``;
  }

}
