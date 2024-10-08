import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isEmail(value)) {
      throw new BadRequestException('Invalid email format');
    }
    return value;
  }
}
