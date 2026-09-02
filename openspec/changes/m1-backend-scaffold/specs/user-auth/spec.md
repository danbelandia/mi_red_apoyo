# User Auth Specification

## Purpose

Autenticación de usuarios via JWT. Login con RUT y password hasheado con bcrypt.

## Requirements

### Requirement: Login con credenciales válidas

El sistema MUST aceptar login con RUT y password correctos, retornando un JWT.

#### Scenario: Login exitoso

- GIVEN un usuario registrado con RUT "11111111-1" y password "123456"
- WHEN envía POST /api/auth/login con { rut: "11111111-1", password: "123456" }
- THEN recibe status 201
- AND recibe un token JWT válido
- AND el token contiene el userId y role del usuario

#### Scenario: Login con password incorrecto

- GIVEN un usuario registrado con RUT "11111111-1"
- WHEN envía POST /api/auth/login con { rut: "11111111-1", password: "wrong" }
- THEN recibe status 401
- AND recibe mensaje de error "Credenciales inválidas"

#### Scenario: Login con RUT inexistente

- GIVEN no existe usuario con RUT "99999999-9"
- WHEN envía POST /api/auth/login con { rut: "99999999-9", password: "123456" }
- THEN recibe status 401
- AND recibe mensaje de error "Credenciales inválidas"

### Requirement: Protección de endpoints con JWT

El sistema MUST requerir JWT válido para acceder a endpoints protegidos.

#### Scenario: Acceso con token válido

- GIVEN un usuario autenticado con JWT válido
- WHEN envía GET /api/users/1 con header Authorization: Bearer {token}
- THEN recibe status 200
- AND recibe los datos del usuario

#### Scenario: Acceso sin token

- GIVEN un usuario no autenticado
- WHEN envía GET /api/users/1 sin header Authorization
- THEN recibe status 401
- AND recibe mensaje de error "Token no proporcionado"

#### Scenario: Acceso con token inválido

- GIVEN un token JWT inválido o expirado
- WHEN envía GET /api/users/1 con header Authorization: Bearer invalid-token
- THEN recibe status 401
- AND recibe mensaje de error "Token inválido"

### Requirement: Hash de password

El sistema MUST hashear passwords con bcrypt antes de almacenarlos.

#### Scenario: Password hasheado al crear usuario

- GIVEN un nuevo usuario con password "123456"
- WHEN se guarda en la base de datos
- THEN el campo password NO contiene "123456"
- AND el campo password contiene un hash bcrypt válido

#### Scenario: Verificación de password

- GIVEN un usuario con password hasheado
- WHEN se verifica con el password correcto
- THEN la verificación es exitosa

#### Scenario: Verificación con password incorrecto

- GIVEN un usuario con password hasheado
- WHEN se verifica con un password incorrecto
- THEN la verificación falla
