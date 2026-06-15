# Diagramas del Sistema

Este documento presenta los diagramas principales del sistema de gestión de productos.

Los diagramas ayudan a comprender la arquitectura, la base de datos, los flujos principales y el control de roles implementado en el proyecto.

---

## 1. Diagrama de arquitectura general

```mermaid
flowchart TD
    A[Usuario] --> B[Frontend React + TypeScript]
    B --> C[Backend Node.js + Express + TypeScript]
    C --> D[Base de Datos PostgreSQL]

    B --> E[Axios]
    C --> F[JWT]
    C --> G[Control de Roles]
```

### Descripción

El usuario interactúa con el frontend desarrollado en React.
El frontend se comunica con el backend mediante Axios.
El backend procesa las peticiones, valida el token JWT, controla los roles y consulta la base de datos PostgreSQL.

---

## 2. Diagrama de base de datos

```mermaid
erDiagram
    USUARIOS {
        int id
        varchar nombre
        varchar correo
        varchar contra
        varchar rol
    }

    PRODUCTOS {
        int id
        varchar codigo
        varchar nombre
        varchar descripcion
        numeric precio
        varchar categoria
        int stock
    }
```

### Descripción

La base de datos contiene dos tablas principales:

* `usuarios`: almacena los datos de acceso y rol.
* `productos`: almacena la información del catálogo de productos.

Actualmente no existe una relación directa entre ambas tablas mediante llave foránea.

---

## 3. Flujo de inicio de sesión con JWT

```mermaid
flowchart TD
    A[Usuario ingresa correo y contraseña] --> B[Frontend envía datos al backend]
    B --> C[Backend valida credenciales en PostgreSQL]
    C --> D{Credenciales correctas?}

    D -->|Sí| E[Backend genera token JWT]
    E --> F[Frontend guarda token y datos del usuario]
    F --> G[Usuario accede al sistema según su rol]

    D -->|No| H[Backend devuelve error]
    H --> I[Frontend muestra mensaje de error]
```

### Descripción

El sistema valida las credenciales del usuario en la base de datos.
Si los datos son correctos, el backend genera un token JWT que se utiliza para acceder a las rutas protegidas.

---

## 4. Flujo CRUD de productos

```mermaid
flowchart TD
    A[Usuario Admin] --> B[Formulario o listado de productos]

    B --> C{Acción seleccionada}

    C -->|Crear| D[Frontend envía POST /api/crear]
    C -->|Modificar| E[Frontend envía PUT /api/modificar/:id]
    C -->|Eliminar| F[Frontend envía DELETE /api/eliminar/:id]
    C -->|Listar| G[Frontend envía GET /api/listado]

    D --> H[Backend valida token y rol Admin]
    E --> H
    F --> H
    G --> I[Backend valida token]

    H --> J[Backend ejecuta operación en PostgreSQL]
    I --> J

    J --> K[Backend devuelve respuesta]
    K --> L[Frontend actualiza la interfaz]
```

### Descripción

El CRUD de productos permite listar, crear, modificar y eliminar productos.
Las acciones administrativas requieren que el usuario tenga rol `Admin`.

---

## 5. Diagrama de roles y permisos

```mermaid
flowchart TD
    A[Usuario autenticado] --> B{Rol del usuario}

    B -->|Admin| C[Ver productos]
    B -->|Admin| D[Buscar productos]
    B -->|Admin| E[Crear productos]
    B -->|Admin| F[Modificar productos]
    B -->|Admin| G[Eliminar productos]
    B -->|Admin| H[Usar asistente del catálogo]

    B -->|Usuario| I[Ver productos]
    B -->|Usuario| J[Buscar productos]
    B -->|Usuario| K[Usar asistente del catálogo]

    B -->|Rol no autorizado| L[Acceso bloqueado]
```

### Descripción

El sistema maneja dos roles principales:

* `Admin`: puede administrar completamente el catálogo.
* `Usuario`: solo puede consultar productos y usar el asistente.

Cualquier rol no autorizado debe ser bloqueado por el sistema.

---

## 6. Flujo del asistente del catálogo

```mermaid
flowchart TD
    A[Usuario abre el asistente] --> B[Selecciona tipo de consulta]

    B --> C{Tipo de consulta}

    C -->|Stock| D[Clasificar productos por stock]
    C -->|Código por nombre| E[Buscar coincidencias por nombre]
    C -->|Precio por código o nombre| F[Buscar coincidencias por código o nombre]

    D --> G[Mostrar productos sin stock, stock bajo o stock bueno]
    E --> H[Mostrar productos encontrados con su código]
    F --> I[Mostrar productos encontrados con su precio]
```

### Descripción

El asistente permite consultar información rápida del catálogo.
No utiliza una API externa de inteligencia artificial, sino lógica interna basada en los productos registrados.

---

## Conclusión

Los diagramas muestran la estructura principal del sistema, la comunicación entre sus partes, el modelo de datos, los flujos de uso y el control de roles.

Estos diagramas complementan la documentación técnica y facilitan la comprensión del proyecto.
