# IEEE CS UNI — Plataforma Web

> Plataforma oficial del capítulo estudiantil de IEEE Computer Society en la Universidad Nacional de Ingeniería, Lima, Perú.

---

## Tabla de contenidos

- [Visión general](#visión-general)
- [Productos](#productos)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Zonas de la plataforma](#zonas-de-la-plataforma)
- [Módulos de la zona de miembros](#módulos-de-la-zona-de-miembros)
- [Base de datos — entidades principales](#base-de-datos--entidades-principales)
- [Autenticación y roles](#autenticación-y-roles)
- [API — convenciones](#api--convenciones)
- [Alcances por versión](#alcances-por-versión)
- [Setup local](#setup-local)
- [Variables de entorno](#variables-de-entorno)
- [Convenciones de código](#convenciones-de-código)
- [Equipo](#equipo)

---

## Visión general

Este repositorio contiene el código fuente de la plataforma web de IEEE CS UNI. El proyecto tiene dos grandes productos bajo la misma marca:

1. **IEEE CS UNI Web** — sitio institucional público + panel interno de gestión para miembros y admins del capítulo.
2. **Codenix** — plataforma de programación competitiva impulsada por IEEE CS UNI, con sección especial para DSA 1 (FIEE-UNI). Se desarrolla en versiones posteriores.

---

## Productos

### 1. IEEE CS UNI Web

| Zona | Acceso | Descripción |
|---|---|---|
| Pública | Cualquier visitante | Landing, eventos, sobre nosotros, equipo |
| Miembros | Login requerido | Panel de tareas, horas, certificados, asistencia |
| Admin | Rol admin | Gestión de usuarios, validaciones, reportes |

### 2. Codenix *(v3+)*

| Sección | Descripción |
|---|---|
| Problemas generales | Banco de problemas tipo LeetCode con tags, dificultad y soluciones |
| DSA 1 — FIEE | Exámenes pasados del curso organizados por tema |
| Ranking | Leaderboard por puntos y problemas resueltos |
| Competencias | Concursos internos con timer y scoreboard en vivo |

---

## Stack tecnológico

### Frontend

| Tecnología | Uso |
|---|---|
| **React** | UI — biblioteca principal |
| **Tailwind CSS** | Estilos utilitarios |
| **JavaScript (ES2022+)** | Lenguaje base (migración a TypeScript en v2) |
| **Vite** *(v2+)* | Build tool y dev server |
| **React Router v6** | Navegación SPA |
| **Axios** | Cliente HTTP |
| **React Query** *(v2+)* | Caché y sincronización de datos del servidor |
| **Zustand** *(v2+)* | Estado global ligero |

### Backend

| Tecnología | Uso |
|---|---|
| **Laravel 11** | Framework PHP — API REST |
| **PostgreSQL 16** | Base de datos principal |
| **Laravel Sanctum** | Autenticación SPA con tokens |
| **Laravel Horizon** *(v2+)* | Cola de trabajos (emails, generación de PDFs) |
| **Redis** *(v2+)* | Caché y sesiones |

### Infraestructura

| Servicio | Uso |
|---|---|
| **Vercel** | Deploy del frontend |
| **Railway** | Deploy del backend Laravel + PostgreSQL |
| **Cloudinary** *(v2+)* | Almacenamiento de imágenes y PDFs de certificados |
| **Resend / Mailgun** | Envío de correos transaccionales |
| **GitHub Actions** | CI/CD |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTE                             │
│              React + Tailwind CSS (Vercel)                  │
│                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│   │  Zona pública│  │ Zona miembros│  │   Zona admin    │  │
│   └──────────────┘  └──────────────┘  └─────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS — JSON REST API
                            │ Authorization: Bearer <token>
┌───────────────────────────▼─────────────────────────────────┐
│                      BACKEND                                │
│              Laravel 11 API (Railway)                       │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐   │
│  │   Auth   │  │ Members  │  │  Events  │  │  Admin    │   │
│  │ Sanctum  │  │  module  │  │  module  │  │  module   │   │
│  └──────────┘  └──────────┘  └──────────┘  └───────────┘   │
│                                                             │
│  ┌──────────────────────┐    ┌──────────────────────────┐   │
│  │   Jobs / Queues      │    │   Policies / Gates       │   │
│  │ (certs, emails)      │    │ (roles: admin, member)   │   │
│  └──────────────────────┘    └──────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
          ┌─────────────────┴──────────────────┐
          │                                    │
┌─────────▼──────────┐             ┌───────────▼────────┐
│   PostgreSQL 16     │             │   Redis (v2+)      │
│   (Railway)         │             │   caché / colas    │
└────────────────────┘             └────────────────────┘
```

### Flujo de autenticación

```
Usuario → POST /api/login → Laravel Sanctum
        ← token (plaintext)
        → Almacenado en localStorage / httpOnly cookie
        → Requests con header: Authorization: Bearer <token>
        → Laravel valida token en cada request
        → Middleware: auth:sanctum + role check
```

---

## Estructura del proyecto

```
ieee-cs-uni/
├── frontend/                   # React app
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── ui/             # Botones, inputs, badges, modals
│   │   │   ├── layout/         # Navbar, Sidebar, Footer
│   │   │   └── shared/         # Cards de eventos, tablas, etc.
│   │   ├── pages/
│   │   │   ├── public/         # Home, About, Events, Team
│   │   │   ├── auth/           # Login, ForgotPassword
│   │   │   ├── member/         # Dashboard, Tasks, Hours, Certs
│   │   │   └── admin/          # Users, Validations, Reports
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # Llamadas a la API (axios)
│   │   ├── context/            # AuthContext (v1), Zustand stores (v2+)
│   │   ├── utils/              # Helpers, formatters
│   │   ├── router/             # React Router config + guards
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/                    # Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Auth/
│   │   │   │   ├── Member/
│   │   │   │   ├── Admin/
│   │   │   │   └── Public/
│   │   │   ├── Middleware/
│   │   │   └── Requests/       # Form Requests (validación)
│   │   ├── Models/
│   │   ├── Policies/
│   │   ├── Services/           # Lógica de negocio
│   │   └── Jobs/               # GenerateCertificate, SendEmail
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php             # Todas las rutas de la API
│   │   └── web.php             # Solo para health check
│   ├── config/
│   └── .env.example
│
├── .github/
│   └── workflows/
│       ├── frontend.yml        # Deploy a Vercel
│       └── backend.yml         # Deploy a Railway
│
└── README.md
```

---

## Zonas de la plataforma

### Zona pública

Accesible por cualquier visitante sin autenticación.

- **Home / Landing** — Hero, stats del capítulo, preview de módulos, teaser de Codenix, próximos eventos.
- **Sobre nosotros** — Historia del capítulo, misión, logros.
- **Eventos** — Listado de eventos pasados y próximos con detalle.
- **Equipo** — Directiva y miembros activos.
- **Contacto** — Formulario de contacto y redes sociales.

### Zona de miembros

Requiere login. Acceso por rol `member` o superior.

Ver sección [Módulos de la zona de miembros](#módulos-de-la-zona-de-miembros).

### Zona admin

Requiere login con rol `admin`. Subconjunto del panel de miembros con capacidades adicionales.

- Gestión de usuarios (crear, editar, desactivar miembros).
- Validación de solicitudes de horas de voluntariado.
- Aprobación y generación masiva de certificados.
- Reporte de asistencia por evento.
- Panel de estadísticas del capítulo.

---

## Módulos de la zona de miembros

### 1. Panel de tareas

Gestión de tareas del equipo a nivel de capítulo.

- Crear, editar y eliminar tareas.
- Asignar responsables y fecha límite.
- Estados: `pendiente`, `en progreso`, `completado`.
- Filtro por proyecto, responsable y estado.
- Vista Kanban *(v2+)*.

**Entidades:** `tasks`, `task_assignments`

### 2. Validación de horas de voluntariado

Los miembros registran sus horas y el encargado las aprueba.

- El miembro crea una solicitud indicando actividad, fecha y horas.
- El admin/encargado aprueba o rechaza con comentario.
- Historial completo por miembro.
- Meta anual configurable (ej. 40 h).
- Exportar reporte en CSV *(v2+)*.

**Estados de solicitud:** `pending` → `approved` / `rejected`

**Entidades:** `volunteer_hours`, `hour_validations`

### 3. Certificados

Generación y descarga de certificados en PDF.

- Tipos: participación en evento, voluntariado, competencia (Xtreme, Xplore).
- El sistema genera el PDF con los datos del miembro y el evento.
- El miembro descarga desde su panel.
- El admin puede generar certificados masivos para un evento.
- Los PDFs se almacenan en Cloudinary *(v2+)*, en disco local en v1.

**Entidades:** `certificates`, `certificate_templates`

### 4. Registro de asistencia a eventos

- El admin crea el evento y habilita el check-in.
- Los miembros hacen check-in desde su panel (o QR en v2).
- El admin ve el listado de asistentes en tiempo real.
- La asistencia queda vinculada al perfil del miembro.
- Puede disparar generación automática de certificado si el evento lo tiene configurado.

**Entidades:** `events`, `event_attendances`

---

## Base de datos — entidades principales

```sql
-- Usuarios y roles
users               (id, name, email, password, role, is_active, created_at)
                     role: 'admin' | 'member'

-- Eventos
events              (id, title, description, date, location, type, created_by, created_at)
event_attendances   (id, event_id, user_id, checked_in_at)

-- Tareas
tasks               (id, title, description, status, due_date, project, created_by, created_at)
task_assignments    (id, task_id, user_id, assigned_at)

-- Horas de voluntariado
volunteer_hours     (id, user_id, activity, hours, date, status, notes, reviewed_by, reviewed_at)

-- Certificados
certificate_templates (id, name, type, file_path)
certificates        (id, user_id, template_id, event_id, issued_at, file_path, metadata jsonb)
```

---

## Autenticación y roles

Se usa **Laravel Sanctum** para autenticación SPA.

| Rol | Puede hacer |
|---|---|
| `member` | Ver su panel, registrar horas, descargar sus certificados, hacer check-in |
| `admin` | Todo lo anterior + validar horas, aprobar certificados, gestionar usuarios, ver reportes |

### Guards de ruta en el frontend

```jsx
// src/router/index.jsx
<Route element={<RequireAuth />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route element={<RequireRole role="admin" />}>
    <Route path="/admin" element={<AdminPanel />} />
  </Route>
</Route>
```

---

## API — convenciones

- Base URL: `https://api.ieeecuni.pe/api` *(producción)* / `http://localhost:8000/api` *(local)*
- Todas las respuestas en JSON.
- Autenticación: `Authorization: Bearer <token>`
- Paginación: `?page=1&per_page=15`
- Errores siguen la estructura:

```json
{
  "message": "Descripción del error",
  "errors": { "campo": ["detalle"] }
}
```

### Endpoints principales

```
POST   /api/login
POST   /api/logout
GET    /api/user

GET    /api/events
GET    /api/events/{id}
POST   /api/events/{id}/attend       (member)

GET    /api/tasks                    (member — solo las asignadas)
GET    /api/admin/tasks              (admin — todas)
POST   /api/admin/tasks
PATCH  /api/admin/tasks/{id}

GET    /api/hours                    (member — las propias)
POST   /api/hours                    (member — crear solicitud)
GET    /api/admin/hours              (admin — todas)
PATCH  /api/admin/hours/{id}/approve
PATCH  /api/admin/hours/{id}/reject

GET    /api/certificates             (member — los propios)
POST   /api/admin/certificates/generate
POST   /api/admin/certificates/bulk-generate

GET    /api/admin/users
POST   /api/admin/users
PATCH  /api/admin/users/{id}
```

---

## Alcances por versión

### v1.0 — Base institucional *(actual)*

**Objetivo:** plataforma funcional con zona pública completa y panel de miembros operativo para el día a día del capítulo.

**Frontend:**
- Landing page completa (hero, eventos, sobre nosotros, equipo, Codenix teaser).
- Login de miembros con React + Sanctum.
- Dashboard de miembros: tareas, validación de horas, certificados (descarga básica en PDF generado por Laravel), registro de asistencia.
- Panel admin básico: gestión de usuarios, aprobación de horas, generación de certificados por evento.
- Responsive (mobile-first).
- Sin Vite todavía — Create React App o configuración manual.

**Backend:**
- Laravel 11 + PostgreSQL.
- Autenticación con Sanctum.
- CRUD completo de los 4 módulos.
- Generación de PDF con `barryvdh/laravel-dompdf`.
- Envío de correos con Mailtrap (dev) y Resend (producción).
- Deploy: Vercel (frontend) + Railway (backend + DB).

**No incluye en v1:**
- Vite, TypeScript, React Query, Zustand.
- Redis, colas de trabajo (Horizon).
- QR para asistencia.
- Vista Kanban.
- Codenix.

---

### v2.0 — Madurez técnica y UX

**Objetivo:** refactorizar el frontend a un stack moderno y robusto, mejorar la experiencia de usuario y agregar funcionalidades de productividad al panel.

**Frontend:**
- Migración a **Vite** como build tool.
- Migración gradual a **TypeScript**.
- **React Query** para caché y sincronización de datos del servidor.
- **Zustand** para estado global (sesión, notificaciones).
- Vista Kanban de tareas.
- Notificaciones in-app (campana con dropdown).
- Exportación de reportes en CSV desde el panel admin.
- Check-in por **código QR** en eventos.

**Backend:**
- **Redis** para caché de queries frecuentes y sesiones.
- **Laravel Horizon** para colas de trabajo (generación de PDFs masivos, emails).
- **Cloudinary** para almacenamiento de certificados e imágenes.
- Rate limiting en la API.
- Tests unitarios y de feature con PHPUnit (cobertura mínima 60%).

**Infraestructura:**
- GitHub Actions con CI/CD completo (lint, tests, deploy automático por rama).
- Staging environment en Railway.

---

### v3.0 — Codenix MVP

**Objetivo:** lanzar Codenix como producto independiente bajo la marca IEEE CS UNI, con banco de problemas funcional y la sección DSA 1 FIEE.

**Codenix — features del MVP:**
- Banco de problemas con título, enunciado en Markdown, ejemplos de entrada/salida, constraints y tags.
- Dificultad: Fácil / Medio / Difícil.
- Editor de código in-browser (Monaco Editor) con soporte para C++, Python y Java.
- Judge básico: envío de solución → ejecución en sandbox → veredicto (AC, WA, TLE, RE).
- Perfil de usuario con problemas resueltos y racha.
- Sección **DSA 1 — FIEE UNI**: problemas organizados por tema del sílabo (arrays, listas enlazadas, pilas, colas, árboles, grafos, ordenamiento, búsqueda) con exámenes pasados etiquetados por año y tipo de pregunta.

**Stack adicional para Codenix:**
- Judge: microservicio aislado en Docker (ejecución de código en sandbox seguro).
- El frontend de Codenix puede ser un subdominio (`codenix.ieeecuni.pe`) o una sección dentro del mismo repo, a definir.

**No incluye en v3:**
- Competencias con timer en vivo.
- Leaderboard global.
- Editorial de soluciones.

---

### v4.0 — Codenix completo y comunidad

**Objetivo:** convertir Codenix en una plataforma competitiva completa y fortalecer la comunidad del capítulo.

**Features:**
- Competencias internas con timer, scoreboard en vivo y freeze.
- Leaderboard global y por semestre.
- Editorial de soluciones (Markdown, visible solo después de resolver o tras deadline).
- Sistema de discusión por problema (comentarios).
- Integración con el panel de miembros: problemas resueltos en Codenix suman puntos al perfil del capítulo.
- Preparación colaborativa para IEEE Xtreme: sala de práctica grupal con problemas de años anteriores.

---

## Resumen de versiones

| Versión | Nombre | Estado | Stack nuevo | Entregable clave |
|---|---|---|---|---|
| **v1.0** | Base institucional | 🟡 En desarrollo | React + Tailwind + Laravel + PostgreSQL | Web pública + panel de miembros |
| **v2.0** | Madurez técnica | ⚪ Planificado | Vite, TypeScript, React Query, Zustand, Redis | Panel robusto + QR + CI/CD |
| **v3.0** | Codenix MVP | ⚪ Planificado | Monaco Editor, Judge sandbox | Plataforma de problemas + DSA 1 FIEE |
| **v4.0** | Codenix completo | ⚪ Planificado | Competencias en vivo | Plataforma competitiva completa |

---

## Setup local

### Requisitos

- Node.js 20+
- PHP 8.2+
- Composer 2+
- PostgreSQL 16
- (Opcional) Redis

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Editar VITE_API_URL=http://localhost:8000/api
npm run dev
```

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# Configurar DB en .env
php artisan migrate --seed

php artisan serve
```

---

## Variables de entorno

### Frontend (`.env.local`)

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME="IEEE CS UNI"
```

### Backend (`.env`)

```env
APP_NAME="IEEE CS UNI API"
APP_ENV=local
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ieee_cs_uni
DB_USERNAME=postgres
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173
FRONTEND_URL=http://localhost:5173

MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=

FILESYSTEM_DISK=local
```

---

## Convenciones de código

### Frontend

- Componentes en PascalCase: `MemberDashboard.jsx`
- Hooks en camelCase con prefijo `use`: `useAuth.js`, `useVolunteerHours.js`
- Servicios de API en camelCase: `certificatesService.js`
- Clases Tailwind: mobile-first, no CSS personalizado salvo `tailwind.config.js`
- No usar `any` cuando se migre a TypeScript.

### Backend

- Controladores: `ResourceController` por módulo (Resource Controllers de Laravel).
- Form Requests para toda validación de entrada.
- Services para lógica de negocio (no en el controlador).
- Migraciones con nombres descriptivos: `create_volunteer_hours_table`.
- Rutas con prefijos de versión desde v2: `/api/v2/...`

### Git

- Ramas: `main` (producción), `develop` (integración), `feature/nombre`, `fix/nombre`.
- Commits en español, imperativo: `Agrega módulo de certificados`, `Corrige validación de horas`.
- PR obligatorio para mergear a `develop` y `main`.

---

## Equipo

| Rol | Responsabilidad |
|---|---|
| **Web Lead** | Arquitectura, revisión de PRs, decisiones técnicas |
| **Frontend Dev** | Componentes React, integración con API |
| **Backend Dev** | API Laravel, migraciones, lógica de negocio |
| **Diseño UX** | Figma, sistema de diseño, Tailwind config |

---

*IEEE Computer Society — Universidad Nacional de Ingeniería · Lima, Perú · 2026*