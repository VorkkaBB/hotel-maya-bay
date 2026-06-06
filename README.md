# Hotel Maya Bay - Sistema de Reservas

El propósito de la plataforma web desarrollada para el Hotel Maya Bay es proveer un sistema integral y moderno para la gestión de reservaciones. La plataforma administra de manera centralizada el inventario del hotel (40 habitaciones) y la logística de traslados mediante una flotilla de 3 camionetas privadas.

El objetivo principal del sistema es automatizar y unificar el "agendamiento doble" (cuarto + transporte) a través de un flujo de reserva continuo.

---

## 🏗️ Arquitectura y Tecnologías

Para garantizar un alto rendimiento, escalabilidad y una experiencia de usuario (UX) fluida, se utilizaron las siguientes tecnologías:

* **Frontend:** [Astro](https://astro.build/) (Framework de alto rendimiento) para la estructura principal y enrutamiento.
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para construir una interfaz minimalista, responsiva y animada.
* **Backend & Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL) como plataforma *Backend-as-a-Service* (BaaS), proporcionando la API REST de forma automática.
* **Lógica de Cliente:** JavaScript (Vanilla JS) para manejar la lógica de estado, mapas interactivos y validaciones sin recargar la página.
* **Gestión de Fechas:** [Flatpickr](https://flatpickr.js.org/) para la selección interactiva y bloqueo de rangos de fechas.

---

## 📊 Modelo de Datos

La base de datos relacional en PostgreSQL (Supabase) está estructurada en 4 tablas principales para garantizar la integridad referencial:

1. **habitaciones:** Inventario estático de 40 unidades (15 Pequeñas, 15 Medianas, 10 Grandes).
2. **camionetas:** Gestión de la flotilla (3 unidades, capacidad máxima de 16 pasajeros c/u).
3. **reservas_habitacion:** Registro central del alojamiento (datos del cliente y fechas).
4. **reservas_traslado:** Vinculación opcional del transporte al alojamiento (utilizando borrado en cascada `ON DELETE CASCADE`).

*(Se recomienda incluir aquí una imagen del Diagrama Entidad-Relación).*

---

## 🚀 Guía de Instalación y Despliegue

### 1. Requisitos previos

* Entorno de ejecución: Node.js (v18+).
* Gestor de paquetes: `npm`.
* Cuenta en Supabase.

### 2. Clonar y montar el código

```bash
git clone [https://github.com/VorkkaBB/hotel-maya-bay.git](https://github.com/VorkkaBB/hotel-maya-bay.git)
cd hotel-maya-bay
npm install
```

### 3. Configuración de Variables (`.env`)

Crea un archivo `.env` en la raíz del proyecto y configura tus credenciales:

```bash
PUBLIC_SUPABASE_URL="TU_URL_DE_SUPABASE"
PUBLIC_SUPABASE_ANON_KEY="TU_KEY_PUBLICA"
PUBLIC_ADMIN_USER="TU_USER"
PUBLIC_ADMIN_PASS="TU_PASS"
```

## 4. Importar la Base de Datos

Desde el SQL Editor de tu proyecto en Supabase, ejecuta el script SQL inicial (que crea las tablas e inserta las 40 habitaciones y 3 camionetas). Importante: Ejecutar utilizando la opción Run without RLS.

## 5. Ejecución Local

```bash
npm run dev
```

La aplicación web estará disponible en [http://localhost:4321](http://localhost:4321).

## ⚙️ Manual de Uso y Endpoints de la API

### Flujo de Reserva (`/reservar`)

El sistema guía al usuario a través de un flujo interactivo continuo:

1. **Estancia:** Selección de rango de fechas (validación `minDate: today` con Flatpickr) y cantidad de huéspedes.
2. **Habitación:** Selección mediante un "pasillo" interactivo (las habitaciones no aptas o tomadas se bloquean automáticamente).
3. **Traslado:** Selección opcional de horario y mapa de asientos estilo cine (validando capacidad).
4. **Confirmación:** Resumen final y captura de datos de contacto.

### Panel Administrativo (`/admin`)

Interfaz de gestión (CRUD) protegida por validación local:

* **Visualización:** Tabla cruzada que muestra al cliente, su habitación y su traslado.
* **Gestión:** Botón para cancelar reservas, el cual limpia automáticamente el inventario de cuartos y los asientos de las camionetas.

### Endpoints (Supabase REST API)

La plataforma consume directamente la API autogenerada:

* `GET` `/rest/v1/habitaciones` (Inventario y disponibilidad).
* `POST` `/rest/v1/reservas_habitacion` (Inserción del alojamiento principal).
* `POST` `/rest/v1/reservas_traslado` (Inserción del transporte con llave foránea).

## 🔐 Nota

Para fines de este proyecto escolar, se ha configurado la base de datos de Supabase con permisos "**UNRESTRICTED**" (RLS desactivado). Esta decisión técnica permite la lectura y escritura fluida de datos desde el cliente web sin bloqueos. El panel de administración implementa una capa de autenticación validada localmente mediante variables de entorno.

Desarrollado por: *VorkkaDev & Pau*
