# User Management Specification

## Purpose

Gestión de usuarios del sistema. Lectura de perfil propio y consulta por ID.

## Requirements

### Requirement: Obtener usuario por ID

El sistema MUST retornar los datos de un usuario dado su ID.

#### Scenario: Usuario existente

- GIVEN existe un usuario con ID 1 (María González)
- WHEN se solicita GET /api/users/1 con JWT válido
- THEN recibe status 200
- AND recibe { id, rut, name, email, role, phone }

#### Scenario: Usuario inexistente

- GIVEN no existe usuario con ID 999
- WHEN se solicita GET /api/users/999 con JWT válido
- THEN recibe status 404
- AND recibe mensaje de error "Usuario no encontrado"

### Requirement: Roles de usuario

El sistema MUST soportar dos roles: OLDER_ADULT y ADMIN.

#### Scenario: Adulto mayor tiene rol OLDER_ADULT

- GIVEN el usuario "María González" con RUT "11111111-1"
- WHEN se consulta su perfil
- THEN el campo role es "OLDER_ADULT"

#### Scenario: Administrador tiene rol ADMIN

- GIVEN el usuario "Fernando" con RUT "22222222-2"
- WHEN se consulta su perfil
- THEN el campo role es "ADMIN"

### Requirement: Datos de usuario

El sistema MUST almacenar: id, rut, name, email, password, role, phone, createdAt.

#### Scenario: Estructura de datos

- GIVEN un usuario creado
- WHEN se consulta
- THEN los campos rut, name, role son obligatorios
- AND los campos email, phone son opcionales
- AND el campo createdAt se genera automáticamente
