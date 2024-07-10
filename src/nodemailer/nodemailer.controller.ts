import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}
}
