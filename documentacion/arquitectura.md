# Arquitectura del Sistema

Este documento describe la arquitectura general del sistema de gestión de productos de Disagro.

El sistema está dividido en tres partes principales:

* Frontend
* Backend
* Base de datos

---

## Descripción general

El sistema permite administrar un catálogo de productos mediante una aplicación web.

El usuario interactúa con el frontend, el frontend se comunica con el backend por medio de peticiones HTTP y el backend consulta o modifica la información almacenada en la base de datos PostgreSQL.

---

## Tecnologías utilizadas

| Parte         | Tecnología                     |
| ------------- | ------------------------------ |
| Frontend      | React + TypeScript             |
| Backend       | Node.js + Express + TypeScript |
| Base de datos | PostgreSQL                     |
| Autenticación | JWT                            |
| Cliente HTTP  | Axios                          |

---

## Estructura general

```txt
Usuario
   |
   v
Frontend React
   |
   v
Backend Node.js / Express
   |
   v
Base de datos PostgreSQL
```

---

## Frontend

El frontend fue desarrollado con React y TypeScript.

Esta parte se encarga de mostrar la interfaz del sistema y permitir que el usuario realice acciones como:

* Iniciar sesión.
* Ver productos.
* Buscar productos.
* Crear productos.
* Modificar productos.
* Eliminar productos.
* Usar el asistente del catálogo.

El frontend utiliza Axios para enviar peticiones al backend.

---

## Backend

El backend fue desarrollado con Node.js, Express y TypeScript.

Esta parte se encarga de recibir las peticiones del frontend, validar la información y comunicarse con la base de datos.

El backend contiene la lógica principal del sistema, incluyendo:

* Login de usuarios.
* Generación de token JWT.
* Validación de token.
* Control de permisos por rol.
* Operaciones CRUD de productos.

---

## Base de datos

La base de datos utilizada es PostgreSQL.

En ella se almacena la información de:

* Usuarios.
* Productos.

La tabla de usuarios permite controlar el acceso al sistema, mientras que la tabla de productos almacena la información del catálogo.

---

## Flujo de inicio de sesión

```txt
1. El usuario ingresa correo y contraseña.
2. El frontend envía los datos al backend.
3. El backend valida las credenciales en PostgreSQL.
4. Si los datos son correctos, el backend genera un token JWT.
5. El frontend guarda el token y los datos del usuario.
6. El usuario accede al sistema según su rol.
```

---

## Flujo de consulta de productos

```txt
1. El usuario entra al listado de productos.
2. El frontend solicita los productos al backend.
3. El backend valida el token JWT.
4. El backend consulta la tabla productos en PostgreSQL.
5. La base de datos devuelve los registros.
6. El backend envía los productos al frontend.
7. El frontend muestra los productos en una tabla.
```

---

## Flujo de creación de producto

```txt
1. El usuario Admin llena el formulario de producto.
2. El frontend valida los campos principales.
3. El frontend solicita confirmación antes de guardar.
4. El frontend envía los datos al backend.
5. El backend valida el token JWT.
6. El backend verifica que el usuario tenga rol Admin.
7. El backend inserta el producto en PostgreSQL.
8. El sistema muestra un mensaje de éxito.
```

---

## Flujo de modificación de producto

```txt
1. El usuario Admin selecciona un producto para modificar.
2. El frontend habilita los campos de edición en la tabla.
3. El usuario modifica los datos.
4. El frontend envía la actualización al backend.
5. El backend valida token y rol Admin.
6. El backend actualiza el producto en PostgreSQL.
7. El frontend recarga el listado actualizado.
```

---

## Flujo de eliminación de producto

```txt
1. El usuario Admin presiona el botón eliminar.
2. El frontend muestra un mensaje de confirmación.
3. Si el usuario confirma, el frontend envía la petición al backend.
4. El backend valida token y rol Admin.
5. El backend elimina el producto en PostgreSQL.
6. El frontend actualiza el listado de productos.
```

---

## Seguridad

El sistema utiliza JWT para proteger las rutas privadas.

Las rutas administrativas requieren:

* Token válido.
* Rol Admin.

Esto evita que usuarios sin autorización puedan crear, modificar o eliminar productos.

---

## Roles dentro de la arquitectura

| Rol     | Funciones permitidas                                 |
| ------- | ---------------------------------------------------- |
| Admin   | Consultar, crear, modificar y eliminar productos     |
| Usuario | Consultar productos y usar el asistente del catálogo |

---

## Comunicación entre capas

La comunicación entre frontend y backend se realiza mediante peticiones HTTP.

Ejemplos:

```txt
POST /api/login
GET /api/listado
POST /api/crear
PUT /api/modificar/:id
DELETE /api/eliminar/:id
```

El backend responde en formato JSON.

---

## Conclusión

La arquitectura del sistema separa correctamente la interfaz, la lógica del servidor y la base de datos.

Esta separación permite que el sistema sea más organizado, fácil de mantener y preparado para futuras mejoras.
