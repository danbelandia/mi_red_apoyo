# Mi Red de Apoyo — Backend API

Backend REST para la aplicación de alertas y apoyo para adultos mayores.

## Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: NestJS
- **ORM**: TypeORM
- **DB**: PostgreSQL
- **Auth**: JWT + bcrypt

## Requisitos

- Node.js 18+
- PostgreSQL 14+

## Instalación

```bash
cd backend
pnpm install
```

## Configuración

Copiar `.env.example` a `.env` y configurar las variables de entorno:

```bash
cp .env.example .env
```

## Base de datos

Crear la base de datos `mi_red_apoyo` en PostgreSQL:

```sql
CREATE DATABASE mi_red_apoyo;
```

Las tablas se crean automáticamente con `synchronize: true`.

## Datos de prueba

```bash
pnpm run seed
```

Inserta: 5 usuarios, 6 alertas, 3 contactos.

## Ejecución

```bash
pnpm run start:dev
```

El servidor arranca en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|------------|
| POST | /api/auth/login | No | Login (rut + password) |
| GET | /api/users/:id | JWT | Obtener usuario |
| POST | /api/alerts | JWT | Crear alerta |
| GET | /api/alerts | JWT (admin) | Listar alertas |
| GET | /api/alerts/:id | JWT | Obtener alerta |
| GET | /api/users/:id/alerts | JWT | Alertas de usuario |
| PATCH | /api/alerts/:id/status | JWT (admin) | Cambiar estado |
| GET | /api/support-contacts | JWT | Listar contactos |

## Credenciales de prueba

| Usuario | RUT | Password | Rol |
|---------|-----|----------|-----|
| María González | 11111111-1 | 123456 | OLDER_ADULT |
| Pedro Pérez | 22222222-2 | 123456 | OLDER_ADULT |
| Ana Morales | 33333333-3 | 123456 | OLDER_ADULT |
| Juan Soto | 44444444-4 | 123456 | OLDER_ADULT |
| Fernando | 55555555-5 | 123456 | ADMIN |

## Ejemplo de login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"rut":"11111111-1","password":"123456"}'
```

Respuesta:

```json
{
  "access_token": "eyJ...",
  "user": {
    "id": 1,
    "name": "María González",
    "role": "OLDER_ADULT"
  }
}
```
