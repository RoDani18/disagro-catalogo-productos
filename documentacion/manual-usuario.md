# Manual de Usuario

Este documento explica cómo utilizar el sistema de gestión de productos de Disagro.

El sistema permite iniciar sesión, consultar productos, buscar productos, crear productos, modificar productos, eliminar productos y utilizar un asistente básico del catálogo.

---

## Acceso al sistema

Para ingresar al sistema, el usuario debe abrir la aplicación web desde el navegador.

La primera pantalla que se muestra es el inicio de sesión.

---

## Inicio de sesión

En la pantalla de login se deben ingresar las credenciales del usuario.

### Credenciales de prueba

| Rol     | Correo                                        | Contraseña |
| ------- | --------------------------------------------- | ---------- |
| Admin   | [admin@gmail.com](mailto:admin@gmail.com)     | 1234       |
| Usuario | [usuario@gmail.com](mailto:usuario@gmail.com) | 1234       |

---

## Roles del sistema

El sistema tiene dos tipos de usuario:

### Admin

El usuario administrador puede:

* Ver productos.
* Buscar productos.
* Crear productos.
* Modificar productos.
* Eliminar productos.
* Usar el asistente del catálogo.

### Usuario

El usuario normal puede:

* Ver productos.
* Buscar productos.
* Usar el asistente del catálogo.

El usuario normal no puede crear, modificar ni eliminar productos.

---

## Pantalla principal

Después de iniciar sesión, el sistema muestra la pantalla principal.

Desde esta pantalla se puede acceder a las funciones disponibles según el rol del usuario.

Las opciones principales son:

* Ver productos.
* Crear producto, solo para Admin.
* Asistente del catálogo.
* Cerrar sesión.

---

## Ver productos

La opción de ver productos muestra una tabla con la información registrada en el catálogo.

La tabla contiene los siguientes datos:

* Código.
* Nombre.
* Descripción.
* Precio.
* Categoría.
* Stock.

---

## Buscar productos

En la pantalla de listado existe un campo de búsqueda.

El usuario puede escribir parte del nombre de un producto y el sistema filtrará los resultados automáticamente.

Ejemplo:

```txt
fertilizante
```

El sistema mostrará los productos que coincidan con ese nombre.

---

## Crear producto

Esta función solo está disponible para el usuario Admin.

Para crear un producto se deben completar los siguientes campos:

* Código.
* Nombre.
* Descripción.
* Precio.
* Categoría.
* Stock.

Después de completar los datos, se presiona el botón Registrar Producto.

El sistema mostrará una confirmación antes de guardar el producto.

---

## Modificar producto

Esta función solo está disponible para el usuario Admin.

En el listado de productos, el administrador puede presionar el botón Modificar.

El sistema habilita los campos dentro de la tabla para editar la información del producto.

Luego se debe presionar el botón Guardar para aplicar los cambios.

---

## Eliminar producto

Esta función solo está disponible para el usuario Admin.

En el listado de productos, el administrador puede presionar el botón Eliminar.

Antes de eliminar el producto, el sistema muestra un mensaje de confirmación.

Si el administrador confirma la acción, el producto será eliminado del catálogo.

---

## Asistente del catálogo

El asistente del catálogo permite consultar información rápida sobre los productos.

El asistente permite:

* Consultar productos sin stock.
* Consultar productos con stock bajo.
* Consultar productos con stock bueno.
* Buscar códigos por nombre.
* Consultar precios por código o nombre.

---

## Mensajes del sistema

El sistema muestra mensajes para informar al usuario sobre las acciones realizadas.

Ejemplos:

* Producto creado correctamente.
* Producto actualizado correctamente.
* Producto eliminado correctamente.
* Error al cargar productos.
* Acceso no autorizado.

---

## Cierre de sesión

El usuario puede cerrar sesión desde la opción correspondiente en la pantalla principal.

Al cerrar sesión, se elimina la información guardada en el navegador y el usuario debe iniciar sesión nuevamente para acceder al sistema.

---

## Conclusión

El sistema permite gestionar productos de forma sencilla y segura.

Las funciones administrativas están protegidas para el rol Admin, mientras que el rol Usuario puede consultar información del catálogo sin modificar los datos.
