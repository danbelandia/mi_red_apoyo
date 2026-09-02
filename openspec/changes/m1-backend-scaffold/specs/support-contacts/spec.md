# Support Contacts Specification

## Purpose

Listado de contactos de apoyo configurados para los adultos mayores.

## Requirements

### Requirement: Listar contactos de apoyo

El sistema MUST retornar todos los contactos de apoyo registrados.

#### Scenario: Listar contactos

- GIVEN existen 3 contactos de apoyo en la base de datos
- WHEN un usuario autenticado envía GET /api/support-contacts
- THEN recibe status 200
- AND recibe un array con los 3 contactos
- AND cada contacto tiene { id, name, role, phone, email }

#### Scenario: No hay contactos

- GIVEN no existen contactos de apoyo
- WHEN un usuario autenticado envía GET /api/support-contacts
- THEN recibe status 200
- AND recibe un array vacío []

### Requirement: Datos de contacto

El sistema MUST almacenar: id, name, role, phone, email, createdAt.

#### Scenario: Estructura de contacto

- GIVEN un contacto de apoyo
- WHEN se consulta
- THEN los campos name y role son obligatorios
- AND los campos phone y email son opcionales
- AND el campo createdAt se genera automáticamente
