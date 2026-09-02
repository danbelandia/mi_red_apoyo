import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportContact } from './support-contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(SupportContact)
    private contactsRepository: Repository<SupportContact>,
  ) {}

  async findAll(): Promise<SupportContact[]> {
    return this.contactsRepository.find({ order: { createdAt: 'ASC' } });
  }
}
