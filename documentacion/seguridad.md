# Seguridad del Sistema

Este documento describe las medidas de seguridad implementadas en el sistema de gestión de productos.

El sistema cuenta con autenticación mediante token JWT y control de acceso por roles.

---

## Autenticación

El sistema permite iniciar sesión utilizando correo y contraseña.

Cuando el usuario ingresa credenciales válidas, el backend genera un token JWT.

Este token se utiliza para validar las peticiones protegidas del sistema.

---

## Uso de JWT

JWT significa JSON Web Token.

En este sistema, el token se genera después de iniciar sesión correctamente.

El token contiene información básica del usuario, como:

* id
* nombre
* correo
* rol

---

## Flujo de autenticación

```txt
1. El usuario ingresa correo y contraseña.
2. El frontend envía los datos al backend.
3. El backend valida las credenciales en la base de datos.
4. Si las credenciales son correctas, el backend genera un token JWT.
5. El frontend guarda el token en localStorage.
6. El token se envía en las peticiones protegidas.
7. El backend valida el token antes de permitir el acceso.
```

---

## Envío del token

El token se envía desde el frontend al backend mediante el header de autorización.

```http
Authorization: Bearer token
```

Esto permite que el backend identifique al usuario que realiza la petición.

---

## Rutas protegidas

El sistema protege las rutas que requieren autenticación.

Las rutas protegidas verifican que exista un token válido antes de permitir el acceso.

Ejemplos de rutas protegidas:

```txt
GET /api/listado
GET /api/producto/:id
POST /api/crear
PUT /api/modificar/:id
DELETE /api/eliminar/:id
```

---

## Control de roles

Además de validar el token, el sistema verifica el rol del usuario.

Los roles permitidos son:

```txt
Admin
Usuario
```

---

## Permisos por rol

| Acción                      | Admin | Usuario |
| --------------------------- | ----- | ------- |
| Iniciar sesión              | Sí    | Sí      |
| Ver productos               | Sí    | Sí      |
| Buscar productos            | Sí    | Sí      |
| Crear productos             | Sí    | No      |
| Modificar productos         | Sí    | No      |
| Eliminar productos          | Sí    | No      |
| Usar asistente del catálogo | Sí    | Sí      |

---

## Middleware de autenticación

El backend utiliza un middleware para verificar el token JWT.

Este middleware revisa:

* Que el token exista.
* Que el token sea válido.
* Que el usuario pueda continuar con la petición.

Si el token no existe o no es válido, el sistema bloquea la solicitud.

---

## Middleware de administrador

Para las acciones administrativas, el sistema utiliza una validación adicional.

Esta validación permite que solo los usuarios con rol `Admin` puedan:

* Crear productos.
* Modificar productos.
* Eliminar productos.

Si un usuario con rol `Usuario` intenta realizar una acción administrativa, el sistema debe bloquear la petición.

---

## Protección en el frontend

El frontend también controla qué opciones se muestran según el rol del usuario.

Por ejemplo:

* El usuario Admin puede ver botones de crear, modificar y eliminar.
* El usuario normal solo puede consultar productos.
* Las rutas del frontend también están protegidas para evitar accesos no autorizados.

---

## Protección en el backend

Aunque el frontend oculte botones, la seguridad principal se encuentra en el backend.

Esto significa que, aunque alguien intentara llamar manualmente una ruta administrativa, el backend debe validar el token y el rol antes de ejecutar la acción.

---

## Validación de roles no autorizados

El sistema permite únicamente los roles definidos.

Si un usuario tiene un rol diferente a `Admin` o `Usuario`, el sistema no debe permitir el acceso.

Esto ayuda a evitar accesos incorrectos o no contemplados dentro del sistema.

---

## Consideraciones importantes

* El token JWT protege las rutas privadas.
* Las acciones administrativas están restringidas al rol Admin.
* El frontend muestra opciones según el rol del usuario.
* El backend valida los permisos antes de ejecutar operaciones importantes.
* El sistema evita que usuarios sin autorización modifiquen el catálogo.

---

## Recomendaciones para futuras mejoras

En futuras versiones se podrían agregar mejoras como:

* Encriptación de contraseñas con bcrypt.
* Uso de variables de entorno para datos sensibles.
* Expiración controlada del token JWT.
* Registro de auditoría para saber qué usuario creó, modificó o eliminó productos.
* Recuperación de contraseña.
* Módulo de gestión de usuarios.

---

## Conclusión

El sistema implementa seguridad básica mediante autenticación con JWT y control de roles.

Esto permite proteger las funciones principales del sistema y evitar que usuarios no autorizados puedan modificar la información del catálogo de productos.
