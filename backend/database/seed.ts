import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../src/users/user.entity';
import { Alert } from '../src/alerts/alert.entity';
import { SupportContact } from '../src/contacts/support-contact.entity';
import { UserRole } from '../src/common/enums/user-role.enum';
import { AlertType } from '../src/common/enums/alert-type.enum';
import { AlertStatus } from '../src/common/enums/alert-status.enum';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'mi_red_apoyo',
    entities: [User, Alert, SupportContact],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('📦 Conectado a PostgreSQL');

  const usersRepo = dataSource.getRepository(User);
  const alertsRepo = dataSource.getRepository(Alert);
  const contactsRepo = dataSource.getRepository(SupportContact);

  // Limpiar datos existentes (DELETE FROM respeta FKs mejor que TRUNCATE)
  await dataSource.query('DELETE FROM alerts');
  await dataSource.query('DELETE FROM support_contacts');
  await dataSource.query('DELETE FROM users');
  console.log('🧹 Datos limpiados');

  // Crear usuarios
  const hashedPassword = await bcrypt.hash('123456', 10);

  const maria = await usersRepo.save({
    rut: '11111111-1',
    name: 'María González',
    email: 'maria@email.com',
    password: hashedPassword,
    role: UserRole.OLDER_ADULT,
    phone: '+56911111111',
  });

  const pedro = await usersRepo.save({
    rut: '22222222-2',
    name: 'Pedro Pérez',
    email: 'pedro@email.com',
    password: hashedPassword,
    role: UserRole.ADMIN,
    phone: '+56922222222',
  });

  const ana = await usersRepo.save({
    rut: '33333333-3',
    name: 'Ana Morales',
    email: 'ana@email.com',
    password: hashedPassword,
    role: UserRole.OLDER_ADULT,
    phone: '+56933333333',
  });

  const juan = await usersRepo.save({
    rut: '44444444-4',
    name: 'Juan Soto',
    email: 'juan@email.com',
    password: hashedPassword,
    role: UserRole.OLDER_ADULT,
    phone: '+56944444444',
  });

  const fernando = await usersRepo.save({
    rut: '55555555-5',
    name: 'Fernando',
    email: 'fernando@email.com',
    password: hashedPassword,
    role: UserRole.OLDER_ADULT,
    phone: '+56955555555',
  });

  console.log('👥 5 usuarios creados');

  // Crear alertas
  await alertsRepo.save([
    {
      userId: maria.id,
      type: AlertType.RED,
      message: 'Necesito ayuda urgente',
      latitude: -38.7359,
      longitude: -72.5904,
      status: AlertStatus.PENDING,
    },
    {
      userId: pedro.id,
      type: AlertType.YELLOW,
      message: 'Necesito medicamentos',
      latitude: -38.7360,
      longitude: -72.5905,
      status: AlertStatus.PENDING,
    },
    {
      userId: ana.id,
      type: AlertType.YELLOW,
      message: 'Necesito una visita',
      status: AlertStatus.PENDING,
    },
    {
      userId: juan.id,
      type: AlertType.RED,
      message: 'Emergencia médica',
      latitude: -38.7361,
      longitude: -72.5906,
      status: AlertStatus.IN_PROGRESS,
    },
    {
      userId: maria.id,
      type: AlertType.YELLOW,
      message: 'Solicitud de apoyo anterior',
      status: AlertStatus.RESOLVED,
    },
    {
      userId: pedro.id,
      type: AlertType.RED,
      message: 'Emergencia resuelta',
      latitude: -38.7362,
      longitude: -72.5907,
      status: AlertStatus.RESOLVED,
    },
  ]);

  console.log('🚨 6 alertas creadas');

  // Crear contactos de apoyo
  await contactsRepo.save([
    {
      name: 'Fernando',
      role: 'Equipo de apoyo',
      phone: '+56955555555',
      email: 'fernando@email.com',
    },
    {
      name: 'Kinesióloga',
      role: 'Equipo de apoyo',
      phone: '+56966666666',
    },
    {
      name: 'Trabajadora Social',
      role: 'Equipo de apoyo',
      phone: '+56977777777',
    },
  ]);

  console.log('📞 3 contactos creados');
  console.log('✅ Seed completado exitosamente');

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Error en seed:', error);
  process.exit(1);
});
