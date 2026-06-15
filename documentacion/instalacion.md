# Instalación y Ejecución del Proyecto

Este documento explica los pasos necesarios para instalar y ejecutar el sistema de gestión de productos de Disagro.

El proyecto está dividido en dos partes principales:

* Backend
* Frontend

También utiliza una base de datos PostgreSQL.

---

## Requisitos previos

Antes de ejecutar el proyecto, se debe tener instalado:

* Node.js
* npm
* PostgreSQL
* pgAdmin o una herramienta similar para administrar la base de datos
* Git

---

## Clonar el repositorio

Para obtener el proyecto, se debe clonar el repositorio desde GitHub.

```bash
git clone URL_DEL_REPOSITORIO
```

Luego ingresar a la carpeta del proyecto:

```bash
cd nombre-del-proyecto
```

---

## Configuración de la base de datos

El sistema utiliza PostgreSQL como base de datos.

Para crear la base de datos, se debe ejecutar el archivo:

```txt
database.sql
```

Este archivo contiene la estructura de las tablas y datos iniciales necesarios para probar el sistema.

Las tablas principales son:

* usuarios
* productos

---

## Crear la base de datos en PostgreSQL

Desde pgAdmin o consola, crear una base de datos con el nombre utilizado por el proyecto.

Ejemplo:

```sql
CREATE DATABASE disagro_catalogo;
```

Luego ejecutar el archivo `database.sql` dentro de esa base de datos.

---

## Instalación del Backend

Ingresar a la carpeta del backend:

```bash
cd Backend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor backend:

```bash
npx ts-node-dev src/index.ts
```

El backend se ejecuta en:

```txt
http://localhost:3001
```

La API utiliza la siguiente URL base:

```txt
http://localhost:3001/api
```

---

## Instalación del Frontend

Abrir otra terminal e ingresar a la carpeta del frontend:

```bash
cd Frontend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el frontend:

```bash
npm run dev
```

El frontend se ejecuta normalmente en:

```txt
http://localhost:5173
```

---

## Credenciales de prueba

El sistema incluye usuarios de prueba para validar el funcionamiento.

| Rol     | Correo                                        | Contraseña |
| ------- | --------------------------------------------- | ---------- |
| Admin   | [admin@gmail.com](mailto:admin@gmail.com)     | 1234       |
| Usuario | [usuario@gmail.com](mailto:usuario@gmail.com) | 1234       |

---

## Validación de funcionamiento

Para comprobar que el sistema está funcionando correctamente:

1. Ejecutar PostgreSQL.
2. Ejecutar el backend.
3. Ejecutar el frontend.
4. Abrir el navegador en la URL del frontend.
5. Iniciar sesión con las credenciales de prueba.
6. Probar las funciones del sistema según el rol.

---

## Funciones disponibles

### Usuario Admin

El usuario administrador puede:

* Iniciar sesión.
* Ver productos.
* Buscar productos.
* Crear productos.
* Modificar productos.
* Eliminar productos.
* Usar el asistente del catálogo.

### Usuario normal

El usuario normal puede:

* Iniciar sesión.
* Ver productos.
* Buscar productos.
* Usar el asistente del catálogo.

El usuario normal no puede crear, modificar ni eliminar productos.

---

## Endpoints principales

| Método | Endpoint             | Descripción             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/login`         | Iniciar sesión          |
| GET    | `/api/listado`       | Listar productos        |
| GET    | `/api/producto/:id`  | Obtener producto por ID |
| POST   | `/api/crear`         | Crear producto          |
| PUT    | `/api/modificar/:id` | Modificar producto      |
| DELETE | `/api/eliminar/:id`  | Eliminar producto       |

---

## Problemas comunes

### El frontend no conecta con el backend

Verificar que el backend esté encendido en:

```txt
http://localhost:3001/api
```

También revisar que Axios tenga configurada la URL correcta.

---

### Error al iniciar sesión

Verificar que:

* La base de datos esté activa.
* La tabla `usuarios` tenga datos.
* El correo y contraseña sean correctos.
* El backend esté ejecutándose.

---

### Error al crear, modificar o eliminar productos

Verificar que:

* El usuario haya iniciado sesión como Admin.
* El token JWT se esté enviando correctamente.
* El backend esté ejecutándose.
* La tabla `productos` exista en PostgreSQL.

---

## Conclusión

Siguiendo estos pasos, el sistema puede ejecutarse localmente para probar sus funciones principales.

El proyecto utiliza una arquitectura separada entre frontend, backend y base de datos, lo cual facilita su mantenimiento y futuras mejoras.
