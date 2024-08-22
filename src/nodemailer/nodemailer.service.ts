import { Injectable} from '@nestjs/common';
import { CreateNodemailerDto } from './dto/create-nodemailer.dto';
import { UpdateNodemailerDto } from './dto/update-nodemailer.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailService: MailerService) {}
  
  
    
  async sendEmailByRecoverypassword(code:string, email) {
    const template = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <p>Hola,</p>
      <p>Si no solicitaste la recuperación de contraseña, ignora este correo.</p>
      <p>Este es tu código de verificación:</p>
      <h2 style="color: #4CAF50;">${code}</h2>
      <p>Gracias,</p>
      <p>El equipo de soporte</p>
    </div>
  `;

    try {
      await this.mailService.sendMail({
        from: 'Recuperar contraseña <m3ndezdi4z17@gmail.com>',
        to: email,
        subject: `Recuperar contraseña`,
        html: template,
      });
      console.log('Email sent successfully');
      return "Message sent";
    } catch (error) {
      console.log('Error sending email', error);
      throw new Error(`Failed to send email ${error}`);
    }
  }
}
