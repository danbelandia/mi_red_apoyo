# Tasks: m1-backend-scaffold

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 800–1000 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Foundation) → PR 2 (Modules) → PR 3 (Seed + Docs) |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation: configs, entities, enums | PR 1 | Base: main. Sin dependencias. |
| 2 | Modules: auth, users, alerts, contacts | PR 2 | Base: PR 1. Depende de entities. |
| 3 | Wiring + Seed + Docs | PR 3 | Base: PR 2. Depende de modules. |

---

## Phase 1: Foundation

- [x] 1.1 Crear `backend/package.json` con dependencias: @nestjs/core, @nestjs/typeorm, @nestjs/jwt, @nestjs/passport, typeorm, pg, bcryptjs, class-validator, class-transformer, passport, passport-jwt
- [x] 1.2 Crear `backend/tsconfig.json` con config NestJS estándar
- [x] 1.3 Crear `backend/tsconfig.build.json`
- [x] 1.4 Crear `backend/nest-cli.json`
- [x] 1.5 Crear `backend/.env` con DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET
- [x] 1.6 Crear `backend/src/common/enums/user-role.enum.ts` — UserRole: OLDER_ADULT, ADMIN
- [x] 1.7 Crear `backend/src/common/enums/alert-type.enum.ts` — AlertType: RED, YELLOW
- [x] 1.8 Crear `backend/src/common/enums/alert-status.enum.ts` — AlertStatus: PENDING, IN_PROGRESS, RESOLVED, CANCELLED
- [x] 1.9 Crear `backend/src/users/user.entity.ts` — Entity User con todos los campos TypeORM
- [x] 1.10 Crear `backend/src/alerts/alert.entity.ts` — Entity Alert con relación ManyToOne a User
- [x] 1.11 Crear `backend/src/contacts/support-contact.entity.ts` — Entity SupportContact

## Phase 2: Core Modules

- [x] 2.1 Crear `backend/src/auth/dto/login.dto.ts` — clase con @IsString, @IsNotEmpty para rut y password
- [x] 2.2 Crear `backend/src/auth/jwt.strategy.ts` — Extrae JWT del header, valida, retorna { sub, role }
- [x] 2.3 Crear `backend/src/auth/jwt-auth.guard.ts` — Extiende AuthGuard('jwt')
- [x] 2.4 Crear `backend/src/auth/roles.guard.ts` — Verifica role del usuario contra roles requeridos
- [x] 2.5 Crear `backend/src/auth/auth.service.ts` — validateUser(rut, password), login(user)
- [x] 2.6 Crear `backend/src/auth/auth.controller.ts` — POST /api/auth/login
- [x] 2.7 Crear `backend/src/auth/auth.module.ts` — Importa UsersModule, JwtModule, PassportModule
- [x] 2.8 Crear `backend/src/users/users.service.ts` — findById(id), findByRut(rut)
- [x] 2.9 Crear `backend/src/users/users.controller.ts` — GET /api/users/:id (JWT guard)
- [x] 2.10 Crear `backend/src/users/users.module.ts` — Exports UsersService
- [x] 2.11 Crear `backend/src/alerts/dto/create-alert.dto.ts` — userId, type, message?, latitude?, longitude?
- [x] 2.12 Crear `backend/src/alerts/dto/update-status.dto.ts` — status con enum
- [x] 2.13 Crear `backend/src/alerts/alerts.service.ts` — create, findAll, findById, findByUserId, updateStatus
- [x] 2.14 Crear `backend/src/alerts/alerts.controller.ts` — POST /api/alerts, GET /api/alerts, GET /api/alerts/:id, GET /api/users/:id/alerts, PATCH /api/alerts/:id/status
- [x] 2.15 Crear `backend/src/alerts/alerts.module.ts` — Importa UsersModule, TypeOrmModule
- [x] 2.16 Crear `backend/src/contacts/contacts.service.ts` — findAll
- [x] 2.17 Crear `backend/src/contacts/contacts.controller.ts` — GET /api/support-contacts
- [x] 2.18 Crear `backend/src/contacts/contacts.module.ts`
- [x] 2.19 Crear `backend/src/common/notification/notification.service.ts` — sendEmergencyNotification, sendSupportNotification (console.log)

## Phase 3: Wiring & Bootstrap

- [x] 3.1 Crear `backend/src/app.module.ts` — Root module con TypeOrmModule.forRoot, AuthModule, UsersModule, AlertsModule, ContactsModule
- [x] 3.2 Crear `backend/src/main.ts` — NestFactory.create, enableCors, setGlobalPrefix('api'), listen(3000)
- [ ] 3.3 Ejecutar `npm install` en backend/ y verificar que no hay errores de compilación

## Phase 4: Seed & Documentation

- [x] 4.1 Crear `backend/database/seed.ts` — Script que inserta 5 usuarios, 6 alertas, 3 contactos
- [x] 4.2 Crear `backend/.env.example` — Template de variables de entorno
- [x] 4.3 Crear `backend/README.md` — Instrucciones de instalación, configuración, ejecución, endpoints

## Phase 5: Verification

- [ ] 5.1 Verificar que `npm run start:dev` levanta sin errores
- [ ] 5.2 Verificar POST /api/auth/login con credenciales del seed retorna JWT
- [ ] 5.3 Verificar GET /api/alerts retorna alertas del seed
- [ ] 5.4 Verificar POST /api/alerts crea nueva alerta
- [ ] 5.5 Verificar PATCH /api/alerts/:id/status cambia estado
- [ ] 5.6 Ejecutar seed y verificar 5 usuarios, 6 alertas, 3 contactos en DB
