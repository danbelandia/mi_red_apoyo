# Notification Simulation Specification

## Purpose

Servicio de notificaciones preparado para integraciones futuras. Actualmente solo registra eventos en consola.

## Requirements

### Requirement: Simular notificación de emergencia

El sistema MUST registrar en consola cuando se crea una alerta RED.

#### Scenario: Notificación de emergencia

- GIVEN un usuario crea una alerta tipo RED
- WHEN se guarda la alerta exitosamente
- THEN el sistema registra en consola "[NOTIFICACIÓN] Emergencia enviada para usuario {name}"
- AND la notificación incluye el tipo de alerta y timestamp

### Requirement: Simular notificación de ayuda

El sistema MUST registrar en consola cuando se crea una alerta YELLOW.

#### Scenario: Notificación de solicitud

- GIVEN un usuario crea una alerta tipo YELLOW
- WHEN se guarda la alerta exitosamente
- THEN el sistema registra en consola "[NOTIFICACIÓN] Solicitud de ayuda enviada para usuario {name}"
- AND la notificación incluye el tipo de alerta y timestamp

### Requirement: Preparado para integración futura

El sistema MUST exponer métodos sendEmergencyNotification y sendSupportNotification que puedan ser reemplazados sin modificar la lógica de alertas.

#### Scenario: Interfaz de notificación

- GIVEN el servicio de notificaciones
- WHEN se crea una alerta
- THEN se invoca el método correspondiente según el tipo
- AND la lógica de alertas NO depende de la implementación de notificaciones
