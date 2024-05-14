
# ATOM FE CHALLENGE TEMPLATE - BACKEND

## Comentarios sobre el desarrollo

Para el desarrollo del backend de la aplicación se ha utilizado Node.js con Express y Firebase Firestore para la base de datos asi como jsonwebtoken para la autenticación de usuarios y jest para la pruebas unitarias.

## Descripcion
El proyecto es un administrador de tareas, donde el usuario puede agregar, editar y eliminar tareas. Ademas de poder marcar las tareas como completadas.


## Frontend
Para el consumo de la api se ha utilizado Angular, puedes encontrar el repositorio del frontend en el siguiente enlace:
* [Frontend](https://github.com/29dalfonzo/atom-challenge-front)

## Live Demo
Puedes ver el demo de toda la aplicación en el siguiente enlace:
* [Demo](https://atom-challenge-dalfonzo.web.app/)

## Primeros Pasos

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerequisitos

* Node.js
* npm


clona el repositorio
```bash
git clone https://github.com/29dalfonzo/atom-challenge-backend.git
```

### Dependencias

* Express
* Firebase Admin
* jsonwebtoken
* jest

### Installing

* Descarga o clona este repositorio.
```
cd atom-challenge-backend
npm install
```

### Executing program

* Ejecuta el servidor de desarrollo con el siguiente comando:
```
npm run dev
```

## Development server

Ejecuta `npm run dev` para un servidor de desarrollo. La aplicación se volverá a cargar automáticamente si cambias algn archivo de origen.


## Build
Ejecuta `npm run build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Firebase Admin

Se ha utilizado Firebase Admin para la gestión de la base de datos, puedes encontrar más información sobre como configurar Firebase Admin en el siguiente enlace:
* [Firebase Admin](https://firebase.google.com/docs/admin/setup)

## RENDER
La api se encuentra desplegada en
[Render](https://render.com/)


## Authors

Daniel Alfonzo 
[29dalfonzo](https://29dalfonzo.netlify.app/)

## Version History

* 0.1
    * Initial Release
