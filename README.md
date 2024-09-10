# Deli
El sitio se encuentra hosteado en https://fudo-deli.vercel.app/

## Instructivo para correr el proyecto localmente

### Backend
- Configurar las variables de ambiente en el archivo `.env`
  - PORT: Puerto en el que se va a correr el proyecto
  - MAILGUN_API_KEY: API KEY que provee mailgun
  - MAILGUN_DOMAIN: Dominio que provee mailgun
  - JWT_SECRET: Secreto para generar el token
- Dirigirse al directorio backend: `cd backend`
- Instalar las dependencias: `npm install`
- Correr los tests: `npm run test`
- Correr el proyecto: `npm run dev`


### Frontend
- Configurar la variable de ambiente en el archivo `.env`
  - VITE_SERVER_URL: URL del servidor (si el puerto es el 3000: http://localhost:3000)
- Dirigirse al directorio frontend: `cd frontend`
- Instalar las dependencias: `npm install`
- Correr el proyecto: `npm run dev`
