# Prototipo — Sistema de Alertas y Apoyo para Adultos Mayores

## 1. Contexto del proyecto

Este proyecto corresponde a una Actividad A+S de la asignatura Arquitectura de Software de Ingeniería de Ejecución en Informática.

El sistema busca apoyar a aproximadamente 50 adultos mayores pertenecientes al Club Social del sector Pueblo Nuevo, Temuco.

La necesidad detectada está relacionada con:

* Aislamiento y soledad de algunos adultos mayores.
* Desconocimiento de redes de apoyo.
* Adultos mayores que viven solos.
* Dificultades para recibir ayuda oportunamente ante una emergencia.
* Necesidad de solicitar apoyo para actividades cotidianas, como abastecimiento de medicamentos o visitas.
* Falta de trazabilidad de los incidentes.

La solución propuesta consiste en una aplicación móvil con arquitectura cliente-servidor, servicios REST y una base de datos que permita registrar y consultar las alertas generadas.

La propuesta contempla dos acciones principales:

1. **Botón amarillo:** solicitud de apoyo no vital.
2. **Botón rojo:** emergencia vital.

La aplicación debe estar especialmente adaptada para usuarios mayores de 70 años, priorizando simplicidad, accesibilidad y facilidad de uso.

---

## 2. Objetivo del prototipo

Crear un prototipo funcional que permita demostrar el flujo principal de la solución.

El prototipo NO necesita implementar inicialmente integraciones reales con SMS o WhatsApp.

Debe simular correctamente estas funcionalidades para poder demostrar el concepto:

* Registro/inicio de sesión de usuario.
* Visualización de una pantalla principal extremadamente sencilla.
* Generación de alerta amarilla.
* Generación de alerta roja.
* Obtención/simulación de ubicación.
* Registro de las alertas.
* Visualización del historial de alertas.
* Visualización de los datos de contacto configurados.
* Panel para visualizar las alertas recibidas.

El objetivo es demostrar la arquitectura y experiencia de usuario antes de implementar servicios externos reales.

---

## 3. Usuarios del sistema

El prototipo debe contemplar dos tipos de usuarios.

### 3.1 Adulto mayor

Es el usuario principal de la aplicación.

Debe poder:

* Iniciar sesión.
* Ver su información básica.
* Generar una alerta amarilla.
* Generar una alerta roja.
* Consultar sus alertas anteriores.
* Consultar información de sus contactos de apoyo.

La interfaz debe minimizar la cantidad de decisiones que debe tomar el usuario.

### 3.2 Administrador / equipo de apoyo

Representa al equipo multidisciplinario que acompaña a los adultos mayores.

Debe poder:

* Iniciar sesión.
* Ver las alertas generadas.
* Identificar si una alerta es roja o amarilla.
* Ver quién generó la alerta.
* Ver fecha y hora.
* Ver ubicación.
* Consultar el estado de la alerta.
* Cambiar el estado de una alerta.

---

## 4. Funcionalidades principales

### 4.1 Login

Crear una pantalla sencilla de inicio de sesión.

Campos:

* RUT o identificador.
* Contraseña.

Agregar usuarios de prueba.

**Usuario adulto mayor**

```text
RUT: 11111111-1
Password: 123456
```

**Usuario administrador**

```text
RUT: 22222222-2
Password: 123456
```

No es necesario implementar un sistema de recuperación de contraseña en esta versión.

---

## 5. Pantalla principal del adulto mayor

Esta es la pantalla MÁS IMPORTANTE del prototipo. Debe ser visualmente muy sencilla.

Mostrar:

```text
----------------------------------
        MI RED DE APOYO
----------------------------------

Hola, María

¿Cómo podemos ayudarte?

┌──────────────────────────────┐
│        NECESITO AYUDA        │
│     Solicitar medicamentos   │
│     o visita                 │
└──────────────────────────────┘

┌──────────────────────────────┐
│        EMERGENCIA            │
│      NECESITO AYUDA          │
│         URGENTE              │
└──────────────────────────────┘

[ Mis alertas ]
[ Mis contactos ]
[ Cerrar sesión ]
```

**Requisitos de UX:** los botones deben ser extremadamente grandes, con texto grande, iconos, alto contraste, no depender únicamente del color, ser fáciles de presionar, evitar menús complejos, textos técnicos y pasos innecesarios.

La aplicación está destinada a adultos mayores, por lo que la accesibilidad tiene prioridad sobre la estética.

---

## 6. Botón amarillo — Solicitud de apoyo

Al presionar el botón amarillo debe aparecer una confirmación:

```text
¿Necesitas ayuda?

Puedes solicitar:

[ 💊 Necesito medicamentos ]
[ 👤 Necesito una visita ]
[ ❓ Otra ayuda ]
```

Para simplificar el prototipo también puede existir una opción general:

```text
[ SOLICITAR AYUDA ]
```

Al confirmar:

```text
Solicitud enviada.

Una persona de tu red de apoyo
se comunicará contigo a la brevedad.

[ Aceptar ]
```

La alerta debe registrarse en la base de datos.

* Tipo: `YELLOW`
* Mensaje: `Comuníquense conmigo a la brevedad.`

---

## 7. Botón rojo — Emergencia

El botón rojo representa una emergencia vital.

**IMPORTANTE:** no debe generar una emergencia inmediatamente al primer toque. Debe existir una confirmación para evitar activaciones accidentales.

```text
⚠️ EMERGENCIA

¿Estás seguro de que necesitas
ayuda urgente?

Tu ubicación será enviada
a tu red de apoyo.

[ CANCELAR ]
[ SÍ, NECESITO AYUDA ]
```

Después de confirmar:

```text
🚨 ALERTA ENVIADA

Tu solicitud de emergencia
ha sido registrada.

Tu red de apoyo recibirá
tu ubicación.

[ VOLVER ]
```

Registrar: usuario, tipo de alerta, fecha, hora, ubicación, estado, mensaje.

* Tipo: `RED`

---

## 8. Geolocalización

El prototipo debe implementar geolocalización de manera sencilla.

Si el dispositivo permite obtener la ubicación, almacenar `latitude` y `longitude`.

Si el entorno de desarrollo no permite obtener GPS, utilizar una ubicación simulada configurable:

```json
{
  "latitude": -38.7359,
  "longitude": -72.5904
}
```

No es necesario implementar navegación GPS en esta versión.

En el panel administrativo debe mostrarse la ubicación de manera comprensible, por ejemplo:

```text
Ubicación:
-38.7359, -72.5904
```

Opcionalmente mostrar un mapa.

---

## 9. Historial de alertas

El adulto mayor debe poder consultar sus alertas.

```text
MIS ALERTAS

🚨 Emergencia
02/09/2026 - 09:35
Estado: Atendida

🟡 Solicitud de ayuda
01/09/2026 - 15:20
Estado: Pendiente

🟡 Solicitud de ayuda
29/08/2026 - 11:10
Estado: Atendida
```

Estados posibles: `PENDIENTE`, `EN PROCESO`, `ATENDIDA`, `CANCELADA`.

---

## 10. Contactos de apoyo

Crear una pantalla:

```text
MIS CONTACTOS

Fernando
Equipo de apoyo
📞 +56 XXXXXXXX

Kinesióloga
Equipo de apoyo
📞 +56 XXXXXXXX

Trabajadora Social
Equipo de apoyo
📞 +56 XXXXXXXX
```

Los números pueden ser ficticios para el prototipo.

---

## 11. Panel administrativo

El administrador debe tener un dashboard:

```text
-----------------------------------------
          PANEL DE ALERTAS
-----------------------------------------

Alertas pendientes: 3
Emergencias: 1
Solicitudes de ayuda: 2

ALERTAS RECIENTES

🚨 EMERGENCIA
María González
02/09/2026 09:35
Ubicación disponible
Estado: PENDIENTE

🟡 AYUDA
Pedro Pérez
02/09/2026 08:50
Necesita medicamentos
Estado: EN PROCESO
```

Debe existir un listado de alertas. Cada alerta debe permitir abrir el detalle.

---

## 12. Detalle de alerta

```text
DETALLE DE ALERTA

Usuario:
María González

Tipo:
🚨 EMERGENCIA

Fecha:
02/09/2026

Hora:
09:35

Mensaje:
Necesito ayuda urgente.

Ubicación:
-38.7359, -72.5904

Estado:
PENDIENTE

[ MARCAR EN PROCESO ]
[ MARCAR COMO ATENDIDA ]
```

---

## 13. Modelo de datos

Base de datos relacional.

### Tabla `users`

```text
id
rut
name
email
password
role
phone
created_at
```

Roles: `OLDER_ADULT`, `ADMIN`

### Tabla `alerts`

```text
id
user_id
type
message
latitude
longitude
status
created_at
updated_at
```

Tipos: `RED`, `YELLOW`
Estados: `PENDING`, `IN_PROGRESS`, `RESOLVED`, `CANCELLED`

Relación: `users 1 ---- N alerts`

### Tabla `support_contacts`

```text
id
name
role
phone
email
created_at
```

---

## 14. API REST

**Auth**

```http
POST /api/auth/login
```

**Usuarios**

```http
GET /api/users/:id
```

**Alertas**

```http
POST /api/alerts
GET /api/alerts
GET /api/alerts/:id
GET /api/users/:id/alerts
PATCH /api/alerts/:id/status
```

**Contactos**

```http
GET /api/support-contacts
```

---

## 15. Ejemplo de creación de alerta

Request:

```json
POST /api/alerts

{
  "userId": 1,
  "type": "RED",
  "message": "Necesito ayuda urgente",
  "latitude": -38.7359,
  "longitude": -72.5904
}
```

Response:

```json
{
  "id": 15,
  "userId": 1,
  "type": "RED",
  "message": "Necesito ayuda urgente",
  "latitude": -38.7359,
  "longitude": -72.5904,
  "status": "PENDING",
  "createdAt": "2026-09-02T09:35:00"
}
```

---

## 16. Arquitectura

Arquitectura cliente-servidor:

```text
┌───────────────────────────┐
│      APLICACIÓN MÓVIL     │
│    Adulto Mayor           │
│    Administrador          │
└─────────────┬─────────────┘
              │ HTTP / REST
              ▼
┌───────────────────────────┐
│       BACKEND API         │
│ Authentication            │
│ Alert Service              │
│ User Service               │
│ Contact Service            │
└─────────────┬─────────────┘
              ▼
┌───────────────────────────┐
│       BASE DE DATOS       │
│ users                     │
│ alerts                    │
│ support_contacts          │
└───────────────────────────┘
```

Mantener separadas: presentación, lógica de negocio, persistencia, API.

---

## 17. Notificaciones

En esta primera versión NO implementar SMS ni WhatsApp reales.

Crear una capa de servicio preparada para integraciones externas:

```text
NotificationService
  sendEmergencyNotification(alert)
  sendSupportNotification(alert)
```

Por ahora estas funciones pueden simplemente registrar el evento en consola, guardar el registro y simular el envío.

La arquitectura debe permitir posteriormente conectar SMS Provider, WhatsApp API, Email, Push Notifications, sin modificar la lógica principal de alertas.

---

## 18. Requisitos tecnológicos

**Backend:** Node.js, TypeScript, NestJS, REST API, TypeORM
**Base de datos:** PostgreSQL
**Frontend móvil:** React

---

## 19. Datos de demostración

Usuarios adultos mayores: María González, Pedro Pérez, Ana Morales, Juan Soto
Administrador: Fernando

Crear varias alertas de ejemplo:

* 1 emergencia pendiente
* 2 solicitudes amarillas pendientes
* 2 alertas atendidas
* 1 alerta en proceso

---

## 20. Requisitos de accesibilidad (crítico)

La aplicación está destinada a adultos mayores de 70 años. Implementar:

* Tipografía grande, botones grandes, alto contraste, espaciado amplio.
* Iconografía clara, mensajes simples.
* Confirmación antes de una emergencia.
* Evitar formularios extensos, navegación profunda, exceso de elementos visuales.
* No depender únicamente del color.

La pantalla principal debe poder entenderse sin necesidad de leer un manual técnico.

---

## 21. Flujo principal del sistema

**Flujo de emergencia:** Login → Pantalla principal → Botón EMERGENCIA → Confirmación → Obtener ubicación → Crear alerta RED → Guardar en BD → Simular notificación → Mostrar confirmación

**Flujo de solicitud de ayuda:** Login → Pantalla principal → Botón NECESITO AYUDA → Seleccionar motivo → Confirmar → Crear alerta YELLOW → Guardar en BD → Simular notificación → Mostrar confirmación

**Flujo del administrador:** Login → Dashboard → Ver alertas → Seleccionar alerta → Ver detalle → Actualizar estado → Atendida

---

## 22. Qué NO debe hacer el agente

NO agregar: sistema de chat complejo, red social, publicaciones, sistema de pagos, gamificación, IA conversacional compleja, videollamadas, historial médico completo, gestión de medicamentos avanzada, integración real con servicios médicos, integración real con WhatsApp o SMS inicialmente.

El objetivo es demostrar el concepto principal.

---

## 23. Inteligencia Artificial

Para el prototipo, NO es necesario implementar una IA dentro de la aplicación. La IA puede utilizarse posteriormente para generar manuales, instrucciones visuales, material de capacitación y asistir al equipo durante el desarrollo.

---

## 24. Entregables esperados del agente

1. Proyecto completamente funcional.
2. Frontend móvil.
3. Backend REST.
4. Base de datos.
5. Datos de prueba.
6. Autenticación básica.
7. CRUD de alertas.
8. Dashboard administrativo.
9. Geolocalización real o simulada.
10. README con instrucciones de instalación.
11. Variables de entorno documentadas.
12. Arquitectura del proyecto explicada.
13. Endpoints documentados.
14. Instrucciones para ejecutar frontend y backend.

---

## 25. Criterio de éxito

**Escenario 1:** Ingresar como adulto mayor → presionar EMERGENCIA → confirmar. El sistema debe crear la alerta, registrar fecha/hora/ubicación, guardarla y mostrar confirmación. Luego, como administrador, comprobar que la alerta aparece inmediatamente en el dashboard.

**Escenario 2:** Ingresar como adulto mayor → presionar NECESITO AYUDA → seleccionar "Necesito medicamentos" → crear la solicitud. Comprobar desde el administrador que aparece como alerta amarilla.

**Escenario 3:** Desde el administrador, avanzar una alerta PENDING → IN_PROGRESS → RESOLVED. El historial debe conservar el registro.

---

## 26. Prioridad de implementación

**PRIORIDAD 1 — Obligatorio:** Login, pantalla principal, botón rojo, botón amarillo, creación de alertas, base de datos, API REST, dashboard administrador, cambio de estado, historial.

**PRIORIDAD 2:** Geolocalización, contactos, mapa, mejoras de accesibilidad.

**PRIORIDAD 3:** Notificaciones push, SMS, WhatsApp, IA, funcionalidades adicionales.

No comenzar por las funcionalidades de prioridad 3.

---

## 27. Principio fundamental del proyecto

**La aplicación debe ser más sencilla de utilizar que de explicar.**

El usuario adulto mayor no debe necesitar comprender APIs, servicios REST, geolocalización, bases de datos, estados de alerta ni arquitectura cliente-servidor. Todo eso debe quedar oculto detrás de una interfaz extremadamente simple.

El sistema debe permitir que un adulto mayor pueda generar una solicitud de ayuda o emergencia con el menor número de pasos posible.
