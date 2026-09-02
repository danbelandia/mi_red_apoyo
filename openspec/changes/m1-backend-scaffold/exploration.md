## Exploration: m1-backend-scaffold

### Current State

Proyecto vacío — solo existe configuración de opencode. No hay código backend, base de datos ni endpoints. El spec completo está en `AGENTS.md.md` (646 líneas).

### Affected Areas

- `backend/` — Directorio nuevo: scaffold completo NestJS
- `backend/src/users/` — Módulo de usuarios (entities, service, controller)
- `backend/src/alerts/` — Módulo de alertas (entities, service, controller)
- `backend/src/auth/` — Módulo de autenticación (JWT, login, guards)
- `backend/src/contacts/` — Módulo de contactos de apoyo
- `backend/src/common/` — Shared: DTOs, enums, notification service
- `backend/database/` — Seeds de datos de prueba

### Approaches

1. **NestJS + TypeORM + PostgreSQL (recomendado)**
   - Pros: Stack obligatorio del spec, ORM maduro, migrationes nativas, bien documentado
   - Cons: Requiere PostgreSQL corriendo (no SQLite como alternativa)
   - Effort: Medium

2. **NestJS + Prisma + PostgreSQL**
   - Pros: Type safety superior, schema-first, mejores DX
   - Cons: NO está en el stack obligatorio del spec
   - Effort: Medium

**Decisión**: Opción 1 — el stack es obligatorio según el spec.

### Estructura Propuesta

```
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── dto/
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── user.entity.ts
│   │   └── dto/
│   ├── alerts/
│   │   ├── alerts.module.ts
│   │   ├── alerts.controller.ts
│   │   ├── alerts.service.ts
│   │   ├── alert.entity.ts
│   │   └── dto/
│   ├── contacts/
│   │   ├── contacts.module.ts
│   │   ├── contacts.controller.ts
│   │   ├── contacts.service.ts
│   │   ├── support-contact.entity.ts
│   │   └── dto/
│   └── common/
│       ├── enums/
│       │   ├── alert-type.enum.ts
│       │   ├── alert-status.enum.ts
│       │   └── user-role.enum.ts
│       └── notification/
│           └── notification.service.ts
├── database/
│   └── seed.ts
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
└── .env
```

### Entidades (TypeORM)

**User**
| Campo | Tipo | Constraints |
|-------|------|------------|
| id | int | PK, auto-increment |
| rut | string | unique, not null |
| name | string | not null |
| email | string | nullable |
| password | string | not null |
| role | enum | OLDER_ADULT / ADMIN, not null |
| phone | string | nullable |
| createdAt | timestamp | auto |

**Alert**
| Campo | Tipo | Constraints |
|-------|------|------------|
| id | int | PK, auto-increment |
| userId | int | FK → users.id, not null |
| type | enum | RED / YELLOW, not null |
| message | string | nullable |
| latitude | decimal | nullable |
| longitude | decimal | nullable |
| status | enum | PENDING / IN_PROGRESS / RESOLVED / CANCELLED, default PENDING |
| createdAt | timestamp | auto |
| updatedAt | timestamp | auto |

**SupportContact**
| Campo | Tipo | Constraints |
|-------|------|------------|
| id | int | PK, auto-increment |
| name | string | not null |
| role | string | not null |
| phone | string | nullable |
| email | string | nullable |
| createdAt | timestamp | auto |

### Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|------------|
| POST | /api/auth/login | No | Login, retorna JWT |
| GET | /api/users/:id | JWT | Obtener usuario por ID |
| POST | /api/alerts | JWT | Crear alerta |
| GET | /api/alerts | JWT (admin) | Listar todas las alertas |
| GET | /api/alerts/:id | JWT | Obtener alerta por ID |
| GET | /api/users/:id/alerts | JWT | Alertas de un usuario |
| PATCH | /api/alerts/:id/status | JWT (admin) | Cambiar estado |
| GET | /api/support-contacts | JWT | Listar contactos |

### Datos de Prueba (Seed)

- María González (11111111-1, OLDER_ADULT)
- Pedro Pérez (11111111-1, OLDER_ADULT) — otro RUT
- Ana Morales (33333333-3, OLDER_ADULT)
- Juan Soto (44444444-4, OLDER_ADULT)
- Fernando (22222222-2, ADMIN)
- Password hasheado: bcrypt.hash('123456')
- 6 alertas de ejemplo (1 RED pendiente, 2 YELLOW pendientes, 2 RESOLVED, 1 IN_PROGRESS)
- 3 support contacts de ejemplo

### Notification Service (Simulado)

```typescript
// Solo logea por ahora — preparado para integraciones futuras
NotificationService {
  sendEmergencyNotification(alert: Alert) → console.log
  sendSupportNotification(alert: Alert) → console.log
}
```

### Recommendation

Proceder con **sdd-propose** para formalizar el alcance del cambio, luego **sdd-spec** para los escenarios, y **sdd-design** para el diseño técnico detallado.

### Risks

- PostgreSQL debe estar corriendo localmente (requerirá configuración de .env)
- bcrypt requiere build nativo — puede fallar en algunos entornos
- Seed script debe ejecutarse manualmente después del primer startup

### Ready for Proposal

**Yes** — el spec es claro y completo. Se puede proceder directamente a propuesta.
