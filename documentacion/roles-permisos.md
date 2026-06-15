# Roles y Permisos del Sistema

El sistema cuenta con control de acceso mediante roles.
Cada usuario tiene asignado un rol que define qué acciones puede realizar dentro de la aplicación.

Los roles principales son:

* `Admin`
* `Usuario`

---

## Rol: Admin

El rol `Admin` tiene permisos completos sobre el sistema.

Este usuario puede:

* Iniciar sesión.
* Ver el listado de productos.
* Buscar productos.
* Crear nuevos productos.
* Modificar productos existentes.
* Eliminar productos.
* Utilizar el asistente del catálogo.

Este rol está pensado para personal encargado de administrar el catálogo de productos.

---

## Rol: Usuario

El rol `Usuario` tiene permisos limitados.

Este usuario puede:

* Iniciar sesión.
* Ver el listado de productos.
* Buscar productos.
* Consultar información del catálogo.
* Utilizar el asistente del catálogo.

Este rol no puede:

* Crear productos.
* Modificar productos.
* Eliminar productos.

Este rol está pensado para usuarios que solo necesitan consultar información.

---

## Tabla de permisos

| Función                     | Admin | Usuario |
| --------------------------- | ----- | ------- |
| Iniciar sesión              | Sí    | Sí      |
| Ver productos               | Sí    | Sí      |
| Buscar productos            | Sí    | Sí      |
| Crear productos             | Sí    | No      |
| Modificar productos         | Sí    | No      |
| Eliminar productos          | Sí    | No      |
| Usar asistente del catálogo | Sí    | Sí      |

---

## Protección de rutas

El sistema utiliza autenticación mediante token JWT.

Al iniciar sesión correctamente, el backend genera un token.
Este token se almacena en el navegador y se envía en cada petición protegida.

Las rutas protegidas verifican:

1. Que exista un token válido.
2. Que el usuario tenga un rol autorizado.
3. Que el rol tenga permiso para realizar la acción solicitada.

---

## Rutas disponibles según rol

| Ruta                 | Método | Admin | Usuario |
| -------------------- | ------ | ----- | ------- |
| `/api/login`         | POST   | Sí    | Sí      |
| `/api/listado`       | GET    | Sí    | Sí      |
| `/api/producto/:id`  | GET    | Sí    | Sí      |
| `/api/crear`         | POST   | Sí    | No      |
| `/api/modificar/:id` | PUT    | Sí    | No      |
| `/api/eliminar/:id`  | DELETE | Sí    | No      |

---

## Validación de acceso

Cuando un usuario intenta acceder a una función no permitida, el sistema bloquea la acción.

Por ejemplo:

* Un usuario con rol `Usuario` puede ver productos.
* Un usuario con rol `Usuario` no puede crear, modificar ni eliminar productos.
* Solo un usuario con rol `Admin` puede administrar el catálogo.

---

## Roles permitidos

El sistema permite únicamente los siguientes roles:

```txt
Admin
Usuario
```

Cualquier otro rol no autorizado no debe tener acceso al sistema.

---

## Objetivo del control de roles

El control de roles permite proteger las funciones más importantes del sistema y evitar que usuarios sin autorización modifiquen la información del catálogo.

Esto ayuda a mantener la seguridad, integridad y control de los productos registrados.
