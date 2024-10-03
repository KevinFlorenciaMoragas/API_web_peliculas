Esta API está desarrollada en Node.js utilizando Express. Proporciona funcionalidades para la autenticación de usuarios, incluyendo registro, inicio de sesión, validación de usuarios y recuperación de contraseña a través de email.
Características

    Registro de usuarios
    Inicio de sesión
    Validación de usuario (JWT)
    Recuperación de contraseña mediante enlace enviado a email
    Almacenamiento seguro de contraseñas
    Almacenamiento de tablas relacionales
Tecnologías Utilizadas

    Node.js: Entorno de ejecución para JavaScript.
    Express: Framework para construir aplicaciones web en Node.js.
    MySQL: Base de datos SQL para almacenar información de usuarios.
    jsonwebtoken: Para crear y verificar tokens JWT.
    bcrypt: Para el hash seguro de contraseñas.
    nodemailer: Para el envío de correos electrónicos.

Instalación

    Clona este repositorio:

    bash

git clone https://github.com/kevinflorenciamoragas/api_web_peliculas.git

Navega al directorio del proyecto:

bash

cd api-autenticacion

Instala las dependencias:

bash

npm install

Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto y define las siguientes variables:

plaintext

PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
EMAIL_USER=tu_email
EMAIL_PASS=tu_contraseña_email

Inicia el servidor:

bash

    npm start

Endpoints
1. Registro de Usuario

    URL: /api/register
    Método: POST
    Body:

    json

    {
      "username": "usuario",
      "email": "usuario@example.com",
      "password": "contraseña"
    }

2. Inicio de Sesión

    URL: /api/auth/login
    Método: POST
    Body:

    json

{
  "email": "usuario@example.com",
  "password": "contraseña"
}

Respuesta:

json

    {
      "token": "tu_token_jwt"
    }

3. Validación de Usuario

    URL: /api/auth/validate
    Método: GET
    Headers: Authorization: Bearer tu_token_jwt

4. Recuperación de Contraseña

    URL: /api/auth/recover
    Método: POST
    Body:

    json

    {
      "email": "usuario@example.com"
    }

    Enviará un correo con un enlace para restablecer la contraseña.

Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor, abre un issue o un pull request.
Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
