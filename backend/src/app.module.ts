import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AlertsModule } from './alerts/alerts.module';
import { ContactsModule } from './contacts/contacts.module';
import { User } from './users/user.entity';
import { Alert } from './alerts/alert.entity';
import { SupportContact } from './contacts/support-contact.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'mi_red_apoyo',
      entities: [User, Alert, SupportContact],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    AlertsModule,
    ContactsModule,
  ],
})
export class AppModule {}
