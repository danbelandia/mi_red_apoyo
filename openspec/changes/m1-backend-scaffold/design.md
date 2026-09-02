# Design: m1-backend-scaffold

## Technical Approach

Scaffold completo NestJS con 4 módulos (auth, users, alerts, contacts). TypeORM con `synchronize: true` para prototivo. JWT strategy simple. bcrypt para passwords. Seed como script CLI independiente. Estructura de carpetas por dominio.

## Architecture Decisions

### Decision: ORM — TypeORM

**Choice**: TypeORM
**Alternatives**: Prisma, Sequelize
**Rationale**: Stack obligatorio del spec. TypeORM tiene decoradores nativos para NestJS, soporta sincronización directa, y migrationes simples.

### Decision: Database — PostgreSQL

**Choice**: PostgreSQL
**Alternatives**: SQLite (spec lo prohíbe)
**Rationale**: Obligatorio según spec. PostgreSQL soporta GEOMETRY para geolocalización futura.

### Decision: Auth — JWT sin refresh tokens

**Choice**: JWT simple con payload { sub, role }
**Alternatives**: Refresh tokens, OAuth
**Rationale**: Prototipo, spec explícito. Login retorna token, guard valida en cada request.

### Decision: Password hashing — bcryptjs

**Choice**: bcryptjs (pure JavaScript)
**Alternatives**: bcrypt (nativo), argon2
**Rationale**: bcryptjs no requiere build nativo, evita problemas en Windows. Rendimiento suficiente para prototipo.

### Decision: Validación — class-validator + class-transformer

**Choice**: Pipes de NestJS con decoradores
**Alternatives**: Validación manual
**Rationale**: Estándar NestJS, reducir código repetitivo, mensajes de error automáticos.

## Data Flow

```
Client (React)
    │
    ▼
[JWT Auth Guard] ──→ [Controller] ──→ [Service] ──→ [TypeORM Repository] ──→ PostgreSQL
    │                    │                │
    │                    │                ▼
    │                    │         [NotificationService] ──→ console.log
    │                    │
    ▼                    ▼
  401/403           Response JSON
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `backend/package.json` | Create | Dependencias NestJS, TypeORM, JWT, bcrypt |
| `backend/tsconfig.json` | Create | Config TypeScript NestJS |
| `backend/nest-cli.json` | Create | Config NestJS CLI |
| `backend/.env` | Create | Variables de entorno (DB, JWT_SECRET) |
| `backend/src/main.ts` | Create | Bootstrap NestJS, CORS, prefix /api |
| `backend/src/app.module.ts` | Create | Root module, TypeORM config |
| `backend/src/common/enums/` | Create | UserRole, AlertType, AlertStatus |
| `backend/src/common/notification/notification.service.ts` | Create | Servicio simulado |
| `backend/src/auth/` | Create | Module, controller, service, strategy, guard, DTOs |
| `backend/src/users/` | Create | Module, controller, service, entity, DTOs |
| `backend/src/alerts/` | Create | Module, controller, service, entity, DTOs |
| `backend/src/contacts/` | Create | Module, controller, service, entity, DTOs |
| `backend/database/seed.ts` | Create | Script de datos de prueba |

## Entidades TypeORM

```typescript
// user.entity.ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  rut: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;
}

// alert.entity.ts
@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: AlertType })
  type: AlertType;

  @Column({ nullable: true })
  message: string;

  @Column('decimal', { nullable: true })
  latitude: number;

  @Column('decimal', { nullable: true })
  longitude: number;

  @Column({ type: 'enum', enum: AlertStatus, default: AlertStatus.PENDING })
  status: AlertStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// support-contact.entity.ts
@Entity('support_contacts')
export class SupportContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

## JWT Auth Flow

```
POST /api/auth/login { rut, password }
    │
    ▼
AuthService.validateUser(rut, password)
    │
    ├──→ UserRepository.findOne({ where: { rut } })
    │
    ├──→ bcrypt.compare(password, user.password)
    │
    ▼
AuthService.login(user) → { access_token: jwt.sign({ sub: id, role }) }
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Services, validators | — (sin runner aún) |
| Integration | Endpoints + DB | — (sin runner aún) |
| E2E | Flujos completos | — (sin runner aún) |

Testing deshabilitado en esta fase. Se configura después del scaffold.

## Migration / Rollout

No migration requerida — `synchronize: true` crea tablas automáticamente. Datos de prueba via seed script manual.

## Open Questions

- Ninguno — stack y diseño están completamente definidos por el spec.
