# Documentación de Endpoints

La API del sistema permite gestionar productos, iniciar sesión y controlar el acceso mediante roles.

## URL base

```txt
http://localhost:3001/api
```

## Autenticación

### Iniciar sesión

```http
POST /login
```

Permite iniciar sesión con correo y contraseña.

### Body

```json
{
  "correo": "admin@gmail.com",
  "password": "1234"
}
```

### Respuesta esperada

```json
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "jwt_token",
  "usuario": {
    "id": 1,
    "nombre": "Administrador",
    "correo": "admin@gmail.com",
    "rol": "Admin"
  }
}
```

---

## Productos

### Listar productos

```http
GET /listado
```

Devuelve el listado de productos registrados.

**Roles permitidos:** Admin y Usuario.

---

### Obtener producto por ID

```http
GET /producto/:id
```

Devuelve la información de un producto específico.

**Ejemplo:**

```http
GET /producto/1
```

**Roles permitidos:** Admin y Usuario.

---

### Crear producto

```http
POST /crear
```

Permite registrar un nuevo producto.

**Rol permitido:** Admin.

### Body

```json
{
  "codigo": "FER-001",
  "nombre": "Fertilizante",
  "descripcion": "Fertilizante para cultivos",
  "precio": 150,
  "categoria": "Fertilizantes",
  "stock": 20
}
```

---

### Modificar producto

```http
PUT /modificar/:id
```

Permite actualizar la información de un producto existente.

**Ejemplo:**

```http
PUT /modificar/1
```

**Rol permitido:** Admin.

### Body

```json
{
  "codigo": "FER-001",
  "nombre": "Fertilizante actualizado",
  "descripcion": "Producto actualizado",
  "precio": 175,
  "categoria": "Fertilizantes",
  "stock": 25
}
```

---

### Eliminar producto

```http
DELETE /eliminar/:id
```

Permite eliminar un producto del catálogo.

**Ejemplo:**

```http
DELETE /eliminar/1
```

**Rol permitido:** Admin.

---

## Control de acceso por roles

| Función            | Admin | Usuario |
| ------------------ | ----- | ------- |
| Iniciar sesión     | Sí    | Sí      |
| Ver productos      | Sí    | Sí      |
| Buscar productos   | Sí    | Sí      |
| Crear producto     | Sí    | No      |
| Modificar producto | Sí    | No      |
| Eliminar producto  | Sí    | No      |
| Usar asistente IA  | Sí    | Sí      |

---

## Uso de token JWT

Las rutas protegidas requieren enviar el token JWT en el header de autorización.

```http
Authorization: Bearer token
```

El token se obtiene al iniciar sesión correctamente.

---

## Notas

* Las rutas de creación, modificación y eliminación están protegidas para el rol Admin.
* Los usuarios con rol Usuario pueden consultar productos, pero no pueden modificar el catálogo.
* Los roles no autorizados no tienen acceso al sistema.
