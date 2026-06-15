# Pruebas del Sistema

Este documento describe las pruebas realizadas al sistema de gestión de productos para verificar su funcionamiento.

El objetivo de estas pruebas es comprobar que las funciones principales del sistema trabajan correctamente, tanto en el frontend como en el backend.

---

## Pruebas de autenticación

| No. | Prueba                                      | Resultado esperado                                                    | Estado   |
| --- | ------------------------------------------- | --------------------------------------------------------------------- | -------- |
| 1   | Iniciar sesión con usuario administrador    | El sistema permite ingresar al panel principal                        | Correcto |
| 2   | Iniciar sesión con usuario normal           | El sistema permite ingresar al panel principal con permisos limitados | Correcto |
| 3   | Iniciar sesión con credenciales incorrectas | El sistema muestra un mensaje de error                                | Correcto |
| 4   | Intentar acceder sin token                  | El sistema redirige o bloquea el acceso                               | Correcto |
| 5   | Intentar ingresar con un rol no autorizado  | El sistema bloquea el acceso                                          | Correcto |

---

## Pruebas de productos

| No. | Prueba                                    | Resultado esperado                                               | Estado   |
| --- | ----------------------------------------- | ---------------------------------------------------------------- | -------- |
| 1   | Listar productos                          | El sistema muestra los productos registrados en la base de datos | Correcto |
| 2   | Buscar producto por nombre                | El sistema filtra los productos según el texto ingresado         | Correcto |
| 3   | Crear producto como administrador         | El sistema registra el nuevo producto correctamente              | Correcto |
| 4   | Modificar producto como administrador     | El sistema actualiza la información del producto                 | Correcto |
| 5   | Eliminar producto como administrador      | El sistema elimina el producto seleccionado                      | Correcto |
| 6   | Intentar crear producto con campos vacíos | El sistema muestra mensajes de validación                        | Correcto |
| 7   | Intentar ingresar precio negativo o cero  | El sistema muestra mensaje de error                              | Correcto |
| 8   | Intentar ingresar stock negativo          | El sistema muestra mensaje de error                              | Correcto |

---

## Pruebas de permisos por rol

| No. | Prueba                                                         | Resultado esperado                          | Estado   |
| --- | -------------------------------------------------------------- | ------------------------------------------- | -------- |
| 1   | Usuario Admin visualiza botones de crear, modificar y eliminar | Los botones se muestran correctamente       | Correcto |
| 2   | Usuario normal visualiza el listado de productos               | El usuario puede consultar productos        | Correcto |
| 3   | Usuario normal no puede crear productos                        | La opción no está disponible o es bloqueada | Correcto |
| 4   | Usuario normal no puede modificar productos                    | La opción no está disponible o es bloqueada | Correcto |
| 5   | Usuario normal no puede eliminar productos                     | La opción no está disponible o es bloqueada | Correcto |

---

## Pruebas del asistente del catálogo

| No. | Prueba                               | Resultado esperado                                                   | Estado   |
| --- | ------------------------------------ | -------------------------------------------------------------------- | -------- |
| 1   | Consultar productos sin stock        | El asistente muestra productos con stock igual a 0                   | Correcto |
| 2   | Consultar productos con stock bajo   | El asistente muestra productos con stock entre 1 y 10                | Correcto |
| 3   | Consultar productos con stock bueno  | El asistente muestra productos con stock mayor a 10                  | Correcto |
| 4   | Buscar código de producto por nombre | El asistente devuelve los productos relacionados y su código         | Correcto |
| 5   | Consultar precio por código o nombre | El asistente devuelve el precio del producto encontrado              | Correcto |
| 6   | Buscar un producto inexistente       | El asistente muestra un mensaje indicando que no encontró resultados | Correcto |

---

## Pruebas de interfaz

| No. | Prueba                                 | Resultado esperado                                             | Estado   |
| --- | -------------------------------------- | -------------------------------------------------------------- | -------- |
| 1   | Visualizar pantalla de login           | La pantalla se muestra correctamente con el logo y formulario  | Correcto |
| 2   | Visualizar pantalla principal          | Se muestran las opciones disponibles según el rol              | Correcto |
| 3   | Visualizar listado de productos        | La tabla se muestra correctamente                              | Correcto |
| 4   | Visualizar formulario de creación      | Los campos se muestran correctamente                           | Correcto |
| 5   | Mostrar mensajes de alerta             | El sistema muestra alertas de éxito, error o información       | Correcto |
| 6   | Mostrar confirmación antes de eliminar | El sistema solicita confirmación antes de eliminar un producto | Correcto |

---

## Pruebas de API

| No. | Endpoint             | Método | Resultado esperado                           | Estado   |
| --- | -------------------- | ------ | -------------------------------------------- | -------- |
| 1   | `/api/login`         | POST   | Devuelve token y datos del usuario           | Correcto |
| 2   | `/api/listado`       | GET    | Devuelve listado de productos                | Correcto |
| 3   | `/api/producto/:id`  | GET    | Devuelve un producto específico              | Correcto |
| 4   | `/api/crear`         | POST   | Crea un producto si el usuario es Admin      | Correcto |
| 5   | `/api/modificar/:id` | PUT    | Actualiza un producto si el usuario es Admin | Correcto |
| 6   | `/api/eliminar/:id`  | DELETE | Elimina un producto si el usuario es Admin   | Correcto |

---

## Observaciones

Durante las pruebas se verificó que el sistema permite administrar productos únicamente con el rol de administrador.

Los usuarios normales pueden consultar productos y utilizar el asistente del catálogo, pero no pueden modificar la información registrada.

También se comprobó que las rutas protegidas requieren un token válido para poder ser utilizadas.

---

## Conclusión de pruebas

Las pruebas realizadas muestran que el sistema cumple con las funciones principales solicitadas:

* Inicio de sesión.
* Control de roles.
* Listado de productos.
* Creación de productos.
* Modificación de productos.
* Eliminación de productos.
* Búsqueda de productos.
* Asistente básico del catálogo.

El sistema funciona correctamente para los roles definidos y mantiene protegidas las operaciones administrativas.
