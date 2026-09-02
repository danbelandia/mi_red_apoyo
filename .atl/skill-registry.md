# Skill Registry — Prototipo Mi Red de Apoyo

## Project Convention Files

- `AGENTS.md.md` — Spec completo del proyecto (27 secciones, 646 líneas)
- `opencode.json` — Configuración de opencode (model, permissions)

## User-Level Skills (from ~/.config/opencode/skills/)

### sdd-init
- **Trigger**: Inicializar SDD en proyecto
- **Rules**: Detectar stack real, crear openspec/, guardar en Engram, crear skill registry

### sdd-explore
- **Trigger**: Explorar ideas antes de comprometer un cambio
- **Rules**: Investigar codebase, analizar tradeoffs, producir exploration.md

### sdd-propose
- **Trigger**: Crear propuesta de cambio
- **Rules**: Incluir intent, scope, approach, rollback plan

### sdd-spec
- **Trigger**: Escribir specs delta
- **Rules**: Given/When/Then, RFC 2119 keywords, produces specs/{domain}/spec.md

### sdd-design
- **Trigger**: Crear diseño técnico
- **Rules**: Diagramas de secuencia, decisiones con justificación, produces design.md

### sdd-tasks
- **Trigger**: Particularizar specs en tareas
- **Rules**: Numeración jerárquica, agrupar por fase, completables en una sesión

### sdd-apply
- **Trigger**: Implementar tareas desde specs/design
- **Rules**: Seguir patrones existentes, marked [x] en tasks.md

### sdd-verify
- **Trigger**: Verificar implementación contra specs
- **Rules**: Probar que implementación cumple specs, produces verify-report.md

### sdd-archive
- **Trigger**: Archivar cambio completado
- **Rules**: Mover a archive/YYYY-MM-DD-{name}/, merge deltas en main specs

### branch-pr
- **Trigger**: Crear PRs
- **Rules**: Issue-first checks, convenciones Gentle AI

### issue-creation
- **Trigger**: Crear issues
- **Rules**: Issue-first checks, formato estándar

## Project-Level Skills

Ninguno detectado (proyecto nuevo).

## Registered: 2026-09-02
