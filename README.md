# Catálogo de Productos Disagro

Proyecto desarrollado como prueba técnica para la gestión de productos.
El sistema permite iniciar sesión, consultar productos, crear nuevos registros, modificar información, eliminar productos y utilizar un asistente básico para consultar datos del catálogo.

## Tecnologías utilizadas

### Frontend

* React
* TypeScript
* Axios
* CSS

### Backend

* Node.js
* Express
* TypeScript
* JWT para autenticación
* PostgreSQL como base de datos

## Funcionalidades principales

* Inicio de sesión con correo y contraseña.
* Generación de token JWT al iniciar sesión.
* Protección de rutas mediante autenticación.
* Manejo de roles:

  * **Admin:** puede ver, crear, modificar y eliminar productos.
  * **Usuario:** puede ver productos y consultar información.
* Listado de productos.
* Búsqueda de productos por nombre.
* Creación de productos.
* Modificación de productos.
* Eliminación de productos.
* Consulta individual de producto por ID.
* Asistente básico del catálogo para:

  * Consultar productos con stock bajo, stock bueno o sin stock.
  * Buscar el código de un producto por nombre.
  * Consultar el precio de un producto por código o nombre.

## Credenciales de prueba

### Administrador

```txt
Correo: admin@gmail.com
Contraseña: 1234
```

### Usuario

```txt
Correo: usuario@gmail.com
Contraseña: 1234
```

## Estructura general del proyecto

```txt
disagro-catalogo-productos/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── index.ts
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── config/
│   │   ├── interfaces/
│   │   └── services/
│   └── package.json
│
└── README.md
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd disagro-catalogo-productos
```

## Configuración del Backend

Entrar a la carpeta del backend:

```bash
cd Backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el backend:

```bash
npx ts-node-dev src/index.ts
```

El servidor se ejecuta en:

```txt
http://localhost:3001
```

## Configuración del Frontend

Entrar a la carpeta del frontend:

```bash
cd Frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el frontend:

```bash
npm start
```

El frontend se ejecuta en:

```txt
http://localhost:3000
```

## Base de datos

El proyecto utiliza PostgreSQL.

Se debe crear una base de datos llamada:

```txt
disagro_catalogo
```

Luego ejecutar el archivo:

```txt
database.sql
```

Este archivo contiene la creación de tablas necesarias para productos y usuarios, además de usuarios de prueba para iniciar sesión.

## Endpoints principales

### Autenticación

```http
POST /api/login
```

Permite iniciar sesión con correo y contraseña.
Devuelve un token JWT y los datos del usuario autenticado.

---

### Listar productos

```http
GET /api/listado
```

Devuelve el listado completo de productos registrados.

---

### Obtener producto por ID

```http
GET /api/producto/:id
```

Devuelve la información de un producto específico.

---

### Crear producto

```http
POST /api/crear
```

Permite registrar un nuevo producto.
Ruta protegida para usuarios con rol **Admin**.

---

### Modificar producto

```http
PUT /api/modificar/:id
```

Permite actualizar la información de un producto existente.
Ruta protegida para usuarios con rol **Admin**.

---

### Eliminar producto

```http
DELETE /api/eliminar/:id
```

Permite eliminar un producto.
Ruta protegida para usuarios con rol **Admin**.

## Campos del producto

Cada producto contiene los siguientes campos:

```txt
id
codigo
nombre
descripcion
precio
categoria
stock
```

## Criterio utilizado para el asistente de stock

Para clasificar los productos por stock se utilizó una regla básica:

```txt
Sin stock: stock = 0
Stock bajo: stock entre 1 y 10
Stock bueno: stock mayor a 10
```

Esta regla puede ajustarse según las políticas reales de inventario de la empresa.

## Seguridad

El sistema utiliza JWT para proteger las rutas del backend.

Cuando el usuario inicia sesión correctamente, el backend genera un token con la información principal del usuario:

```txt
id
correo
rol
```

El frontend guarda el token y lo envía en las peticiones protegidas.

Las operaciones de crear, modificar y eliminar productos están restringidas únicamente para usuarios con rol **Admin**.

## Notas del proyecto

El sistema fue desarrollado como una aplicación CRUD para productos, agregando autenticación, autorización por roles y un asistente básico para consultas del catálogo.

El objetivo principal es permitir la administración de productos de forma sencilla, organizada y segura.

