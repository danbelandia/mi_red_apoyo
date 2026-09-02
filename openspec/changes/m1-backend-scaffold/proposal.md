# Proposal: m1-backend-scaffold

## Intent

Crear el backend completo del prototipo "Mi Red de Apoyo" desde cero. Proyecto vacío — no existe código, ni entidades, ni endpoints. El spec define 3 entidades, 8 endpoints REST, auth JWT, y seed de datos de prueba.

## Scope

### In Scope
- Scaffold NestJS con TypeScript
- 3 entidades TypeORM: User, Alert, SupportContact
- 4 módulos: auth, users, alerts, contacts
- 8 endpoints REST con JWT auth
- NotificationService simulado (console.log)
- Seed de datos de prueba (5 usuarios, 6 alertas, 3 contactos)
- Configuración PostgreSQL via .env
- CORS habilitado para frontend React

### Out of Scope
- Frontend React (fase separada)
- Geolocalización real (P2)
- Notificaciones push/SMS/WhatsApp (P3)
- Integración con servicios externos
- Testing automatizado (sin runner aún)
- Migraciones TypeORM (usar sync: true para prototipo)

## Capabilities

### New Capabilities
- `user-auth`: Login JWT, guards, hash de password con bcrypt
- `user-management`: CRUD de usuarios, entidad User con roles
- `alert-management`: CRUD de alertas, estados, tipos, ubicación
- `support-contacts`: Listado de contactos de apoyo
- `notification-sim`: Servicio de notificaciones simulado

### Modified Capabilities
None — proyecto nuevo

## Approach

NestJS estándar con módulos por dominio. TypeORM con `simplifyNames: true` y `synchronize: true` (prototipo, no producción). JWT con strategy simple. bcrypt para passwords. Seed como script independiente.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `backend/` | New | Scaffold completo NestJS |
| `backend/src/auth/` | New | Login, JWT, guards |
| `backend/src/users/` | New | Entidad, service, controller |
| `backend/src/alerts/` | New | Entidad, service, controller |
| `backend/src/contacts/` | New | Entidad, service, controller |
| `backend/src/common/` | New | Enums, notification service |
| `backend/database/` | New | Seed script |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| PostgreSQL no disponible | Medium | Documentar .env.example, instrucciones claras |
| bcrypt build nativo | Low | Usar bcryptjs como alternativa si falla |
| synchronize: true en prototipo | Accepted | Aceptable para prototipo, documentar que NO usar en producción |

## Rollback Plan

Eliminar directorio `backend/`. No hay dependencias previas — proyecto nuevo.

## Dependencies

- PostgreSQL corriendo localmente (requerido)
- Node.js 18+ instalado
- npm o yarn

## Success Criteria

- [ ] `npm run start:dev` levanta el backend sin errores
- [ ] POST /api/auth/login retorna JWT con credenciales válidas
- [ ] GET /api/alerts retorna alertas del seed
- [ ] POST /api/alerts crea una nueva alerta
- [ ] PATCH /api/alerts/:id/status cambia el estado
- [ ] Seed inserta 5 usuarios, 6 alertas, 3 contactos
