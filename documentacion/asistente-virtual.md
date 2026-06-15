# Asistente del Catálogo

El sistema incluye un asistente básico para consultar información del catálogo de productos.

Este asistente permite al usuario realizar consultas rápidas sobre el stock, códigos y precios de los productos registrados en la base de datos.

---

## Objetivo del asistente

El objetivo del asistente es facilitar la consulta de productos sin necesidad de revisar manualmente toda la tabla.

El usuario puede seleccionar una opción y escribir una búsqueda para obtener información relacionada con los productos.

---

## Funciones principales

El asistente cuenta con tres funciones principales:

1. Consultar estado del stock.
2. Buscar código de producto por nombre.
3. Consultar precio por código o nombre.

---

## Consulta de stock

El asistente permite clasificar los productos según su cantidad disponible.

La clasificación utilizada es la siguiente:

| Estado      | Condición          |
| ----------- | ------------------ |
| Sin stock   | Stock igual a 0    |
| Stock bajo  | Stock entre 1 y 10 |
| Stock bueno | Stock mayor a 10   |

---

## Búsqueda de código por nombre

El asistente permite buscar productos escribiendo parte del nombre.

Si existen coincidencias, el sistema muestra los productos encontrados junto con su código.

Ejemplo:

```txt
Búsqueda: fert
```

Resultado esperado:

```txt
Productos encontrados:

- Fertilizante orgánico | Código: FER-001 | Stock: 20
- Fertilizante para maíz | Código: FER-002 | Stock: 8
```

---

## Consulta de precio por código o nombre

El asistente también permite consultar el precio de un producto utilizando su código o parte de su nombre.

Ejemplo:

```txt
Búsqueda: FER-001
```

Resultado esperado:

```txt
Productos encontrados:

- Fertilizante orgánico | Código: FER-001 | Precio: Q 150
```

---

## Tipo de búsqueda

La búsqueda funciona por coincidencias parciales.

Esto significa que no es necesario escribir el nombre completo del producto.
El sistema puede encontrar resultados si el texto ingresado coincide con parte del nombre o código del producto.

Ejemplo:

```txt
Si el producto se llama "Fertilizante orgánico", el usuario puede buscar "ferti" u "orgánico".
```

---

## Uso de datos

El asistente trabaja con los productos registrados en la base de datos.

Primero obtiene el listado de productos y luego filtra la información según la opción seleccionada por el usuario.

---

## Consideración importante

El asistente no utiliza una API externa de inteligencia artificial.

Se trata de un asistente básico desarrollado dentro del sistema, utilizando lógica de búsqueda y clasificación sobre los datos del catálogo.

---

## Beneficio del asistente

El asistente permite:

* Consultar productos más rápido.
* Identificar productos sin stock.
* Detectar productos con stock bajo.
* Buscar códigos sin revisar toda la tabla.
* Consultar precios de forma sencilla.
* Mejorar la experiencia del usuario dentro del sistema.

---

## Conclusión

El asistente del catálogo agrega una funcionalidad adicional al sistema, permitiendo que los usuarios consulten información importante de los productos de forma rápida y sencilla.

Esta función complementa el CRUD principal y mejora la utilidad del sistema para usuarios administradores y usuarios de consulta.
