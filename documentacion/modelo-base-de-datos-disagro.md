# Modelo de Base de Datos

El sistema utiliza una base de datos PostgreSQL para almacenar la información de usuarios y productos.

La base de datos contiene dos tablas principales:

* `usuarios`
* `productos`

---

## Tabla: usuarios

La tabla `usuarios` almacena la información necesaria para el inicio de sesión y el control de roles dentro del sistema.

| Campo  | Tipo de dato     | Descripción                          |
| ------ | ---------------- | ------------------------------------ |
| id     | SERIAL / INTEGER | Identificador único del usuario      |
| nombre | VARCHAR          | Nombre del usuario                   |
| correo | VARCHAR          | Correo utilizado para iniciar sesión |
| contra | VARCHAR          | Contraseña del usuario               |
| rol    | VARCHAR          | Rol asignado al usuario              |

---

## Roles del sistema

El sistema permite únicamente los siguientes roles:

| Rol     | Descripción                                                                    |
| ------- | ------------------------------------------------------------------------------ |
| Admin   | Usuario con permisos para ver, crear, modificar y eliminar productos           |
| Usuario | Usuario con permisos para consultar productos y usar el asistente del catálogo |

Cualquier otro rol que no esté permitido no puede acceder al sistema.

---

## Tabla: productos

La tabla `productos` almacena los datos principales del catálogo de productos.

| Campo       | Tipo de dato      | Descripción                              |
| ----------- | ----------------- | ---------------------------------------- |
| id          | SERIAL / INTEGER  | Identificador único del producto         |
| codigo      | VARCHAR           | Código interno del producto              |
| nombre      | VARCHAR           | Nombre del producto                      |
| descripcion | TEXT / VARCHAR    | Descripción general del producto         |
| precio      | NUMERIC / DECIMAL | Precio del producto                      |
| categoria   | VARCHAR           | Categoría a la que pertenece el producto |
| stock       | INTEGER           | Cantidad disponible del producto         |

---

## Estructura lógica

```txt
USUARIOS
------------------------------------------------
id | nombre | correo | contra | rol


PRODUCTOS
------------------------------------------------
id | codigo | nombre | descripcion | precio | categoria | stock
```

---

## Relación entre tablas

Actualmente, las tablas `usuarios` y `productos` no tienen una relación directa mediante llave foránea.

La tabla `usuarios` se utiliza para controlar el acceso al sistema mediante autenticación y roles.

La tabla `productos` se utiliza para almacenar y administrar el catálogo de productos.

---

## Uso dentro del sistema

### Usuarios

La tabla `usuarios` permite:

* Iniciar sesión con correo y contraseña.
* Identificar el rol del usuario.
* Permitir o restringir funciones según el rol.

### Productos

La tabla `productos` permite:

* Registrar nuevos productos.
* Listar productos existentes.
* Buscar productos por nombre.
* Modificar información de productos.
* Eliminar productos.
* Consultar información desde el asistente del catálogo.

---

## Ejemplo de registros de usuarios

| id | nombre        | correo                                        | contra | rol     |
| -- | ------------- | --------------------------------------------- | ------ | ------- |
| 1  | Administrador | [admin@gmail.com](mailto:admin@gmail.com)     | 1234   | Admin   |
| 2  | Usuario Demo  | [usuario@gmail.com](mailto:usuario@gmail.com) | 1234   | Usuario |

---

## Ejemplo de registros de productos

| id | codigo  | nombre          | descripcion                     | precio | categoria     | stock |
| -- | ------- | --------------- | ------------------------------- | ------ | ------------- | ----- |
| 1  | FER-001 | Fertilizante    | Fertilizante para cultivos      | 150    | Fertilizantes | 20    |
| 2  | SEM-001 | Semilla de maíz | Semilla para siembra            | 80     | Semillas      | 10    |
| 3  | HER-001 | Herbicida       | Producto para control de maleza | 120    | Herbicidas    | 0     |

---

## Consideraciones

* El campo `correo` se utiliza como dato principal para el inicio de sesión.
* El campo `rol` permite definir los permisos del usuario.
* El campo `stock` se utiliza también en el asistente del catálogo para clasificar productos como:

  * Sin stock
  * Stock bajo
  * Stock bueno
* La estructura puede ampliarse en futuras versiones para incluir más módulos, como proveedores, compras, ventas o historial de movimientos.
