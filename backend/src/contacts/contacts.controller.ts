import { Controller, Get, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('support-contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.contactsService.findAll();
  }
}
