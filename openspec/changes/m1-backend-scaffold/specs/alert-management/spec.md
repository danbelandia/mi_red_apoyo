# Alert Management Specification

## Purpose

Gestión de alertas: creación, consulta, listado y cambio de estado. Soporta alertas RED (emergencia) y YELLOW (solicitud de ayuda).

## Requirements

### Requirement: Crear alerta

El sistema MUST crear una alerta con tipo, mensaje, ubicación y usuario asociado.

#### Scenario: Crear alerta de emergencia (RED)

- GIVEN un usuario autenticado (ID 1)
- WHEN envía POST /api/alerts con { userId: 1, type: "RED", message: "Necesito ayuda urgente", latitude: -38.7359, longitude: -72.5904 }
- THEN recibe status 201
- AND la alerta se guarda con status "PENDING"
- AND la alerta tiene un ID asignado
- AND la alerta tiene createdAt y updatedAt

#### Scenario: Crear solicitud de ayuda (YELLOW)

- GIVEN un usuario autenticado (ID 1)
- WHEN envía POST /api/alerts con { userId: 1, type: "YELLOW", message: "Necesito medicamentos" }
- THEN recibe status 201
- AND la alerta se guarda con status "PENDING"
- AND latitude y longitude son null

#### Scenario: Crear alerta sin tipo

- GIVEN un usuario autenticado
- WHEN envía POST /api/alerts sin campo type
- THEN recibe status 400
- AND recibe mensaje de error de validación

### Requirement: Listar todas las alertas (admin)

El sistema MUST retornar todas las alertas para usuarios con rol ADMIN.

#### Scenario: Admin lista alertas

- GIVEN un administrador autenticado
- WHEN envía GET /api/alerts
- THEN recibe status 200
- AND recibe un array con todas las alertas
- AND cada alerta incluye { id, userId, type, message, latitude, longitude, status, createdAt }

#### Scenario: Adulto mayor no puede listar todas

- GIVEN un usuario con rol OLDER_ADULT autenticado
- WHEN envía GET /api/alerts
- THEN recibe status 403
- AND recibe mensaje de error "Acceso denegado"

### Requirement: Obtener alerta por ID

El sistema MUST retornar una alerta específica dado su ID.

#### Scenario: Alerta existente

- GIVEN existe alerta con ID 1
- WHEN se solicita GET /api/alerts/1 con JWT válido
- THEN recibe status 200
- AND recibe la alerta completa con todos los campos

#### Scenario: Alerta inexistente

- GIVEN no existe alerta con ID 999
- WHEN se solicita GET /api/alerts/999 con JWT válido
- THEN recibe status 404
- AND recibe mensaje de error "Alerta no encontrada"

### Requirement: Listar alertas de un usuario

El sistema MUST retornar todas las alertas de un usuario específico.

#### Scenario: Alertas del usuario

- GIVEN el usuario ID 1 tiene 3 alertas
- WHEN se solicita GET /api/users/1/alerts con JWT válido
- THEN recibe status 200
- AND recibe un array con las 3 alertas del usuario
- AND las alertas están ordenadas por createdAt descendente

### Requirement: Cambiar estado de alerta

El sistema MUST permitir cambiar el estado de una alerta (solo admin).

#### Scenario: Cambiar de PENDING a IN_PROGRESS

- GIVEN existe alerta con status "PENDING"
- WHEN admin envía PATCH /api/alerts/1/status con { status: "IN_PROGRESS" }
- THEN recibe status 200
- AND la alerta ahora tiene status "IN_PROGRESS"
- AND el campo updatedAt se actualiza

#### Scenario: Cambiar de IN_PROGRESS a RESOLVED

- GIVEN existe alerta con status "IN_PROGRESS"
- WHEN admin envía PATCH /api/alerts/1/status con { status: "RESOLVED" }
- THEN recibe status 200
- AND la alerta ahora tiene status "RESOLVED"

#### Scenario: Adulto mayor no puede cambiar estado

- GIVEN un usuario con rol OLDER_ADULT autenticado
- WHEN envía PATCH /api/alerts/1/status con { status: "RESOLVED" }
- THEN recibe status 403
- AND recibe mensaje de error "Acceso denegado"

#### Scenario: Estado inválido

- GIVEN existe alerta con status "PENDING"
- WHEN admin envía PATCH /api/alerts/1/status con { status: "INVALIDO" }
- THEN recibe status 400
- AND recibe mensaje de error de validación

### Requirement: Estados posibles

El sistema MUST soportar los estados: PENDING, IN_PROGRESS, RESOLVED, CANCELLED.

#### Scenario: Transiciones válidas

- GIVEN una alerta en estado "PENDING"
- WHEN se cambia a "IN_PROGRESS", "RESOLVED" o "CANCELLED"
- THEN el cambio es aceptado

### Requirement: Geolocalización en alertas

El系统 MUST almacenar latitude y longitude cuando estén disponibles.

#### Scenario: Alerta con ubicación

- GIVEN un usuario envía alerta con lat/lng
- WHEN se guarda la alerta
- THEN latitude y longitude se almacenan correctamente

#### Scenario: Alerta sin ubicación

- GIVEN un usuario envía alerta sin lat/lng
- WHEN se guarda la alerta
- THEN latitude y longitude son null
