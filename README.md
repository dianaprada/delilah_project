
# Bienvenido al delilah_project 👋

> Code Your Future Globant - Acámica
> Carrera Desarrollo Web Full Stack
> Proyecto 3: Creación de una API para el Delilah


## Configuración del servidor
Puerto: 8080
Descripción: Utilización de librería express para la configuración del servidor

# Instalación de dependencias
npm install

# Inicialización
npm start

## Configuración de base de datos
Conexión con base de datos: SQL a través de XAMPP

Los siguientes parámetros deben de configurarse en el archivo "config.js" que está dentro de la carpeta "config": 

Parametrización de la base de datos: {
    "username": "root",
    "password": "",
    "database": "delilahdb",
    "host": "localhost"
}

## Instrucciones 

1. Instalar XAMPP u otra solución de servidor web que permita la conexión de la base de datos e inicializar dicho servidor.
2. Debe de crearse una base de datos llamada "delilahdb" en phpmyadmin.
3. Utilizar el comando "npm install" para instalar todas las dependencias establecidas en el package.json
4. En la carpeta llamada "database" se encuentra una archivo de javascript para llenar la base de datos. Acceder a la ruta "...\delilah_project\src\database" desde la consola y ejecutar el comando "node fillData.js".
5. Utilizar el comando "npm run devStart" para inicializar el servidor
6. Con estos pasos el proyecto debería ejecutarse.
7. En el archivo Delilah_Resto.postman_collection.json, se encuentra la colección de postman con las diferentes acciones que requiere el proyecto.


👤 **Diana Patricia Pineda Prada**

* Github: [@dianaprada](https://github.com/dianaprada)


## 📝 Licencia

Copyright © 2021 [Diana Patricia Pineda Prada](https://github.com/dianaprada).

Este proyecto tiene la siguiente licencia: [MIT]