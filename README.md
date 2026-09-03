# Mi Red de Apoyo

App de alertas y apoyo para adultos mayores. Prototipo para la actividad A+S de la asignatura Arquitectura de Software.

## Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [PostgreSQL](https://www.postgresql.org/) corriendo en el puerto 5432

## 1. Clonar el repositorio

```bash
git clone https://github.com/danbelandia/mi_red_apoyo.git
cd mi_red_apoyo
```

## 2. Backend

```bash
cd backend

# Instalar dependencias
pnpm install

# Crear la base de datos
psql -U postgres -c "CREATE DATABASE mi_red_apoyo;"

# Crear el archivo .env
cp .env.example .env
# Abrilo y configurá las credenciales de PostgreSQL

# Insertar datos de prueba (5 usuarios, 6 alertas, 3 contactos)
pnpm run seed

# Levantar el servidor
pnpm run start:dev
```

El backend queda en `http://localhost:3000`

### Variables de entorno (backend/.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_contraseña
DB_NAME=mi_red_apoyo
JWT_SECRET=clave_secreta_para_jwt
```

## 3. Frontend

Abrir una segunda terminal:

```bash
cd frontend

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev
```

El frontend queda en `http://localhost:5173`

## 4. Credenciales de prueba

| Usuario | RUT | Contraseña | Rol |
|---------|-----|------------|-----|
| María González | `11111111-1` | `123456` | Adulto mayor |
| Pedro Pérez | `22222222-2` | `123456` | Administrador |
| Ana Morales | `33333333-3` | `123456` | Adulto mayor |
| Juan Soto | `44444444-4` | `123456` | Adulto mayor |

## 5. Probar desde el celular (opcional)

En la terminal del frontend:

```bash
npm run dev -- --host
```

Entrá desde el navegador del celular a `http://TU-IP:5173` (usá `ipconfig` para conocer tu IP).

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Login (rut + password) |
| GET | `/api/users/:id` | Datos de un usuario |
| POST | `/api/alerts` | Crear alerta |
| GET | `/api/alerts` | Listar todas las alertas |
| GET | `/api/alerts/:id` | Detalle de una alerta |
| PATCH | `/api/alerts/:id/status` | Cambiar estado de alerta |
| GET | `/api/users/:id/alerts` | Alertas de un usuario |
| GET | `/api/support-contacts` | Contactos de apoyo |

## Stack

- **Backend:** NestJS + TypeORM + PostgreSQL
- **Frontend:** React + Ionic + Capacitor
- **Auth:** JWT
