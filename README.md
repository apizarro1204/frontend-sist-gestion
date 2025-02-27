# Frontend - Sistema de Gestión de Tareas

## Descripción

Este es el **frontend** de la aplicación web para gestionar tareas. Utiliza **React** y **Vite** para el desarrollo rápido y eficiente de la interfaz de usuario. Los usuarios pueden **registrarse**, **iniciar sesión**, **crear**, **editar** y **eliminar** tareas. La autenticación se maneja mediante **JWT**.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 14 o superior) [Descargar Node.js](https://nodejs.org/)
- **npm** (Node Package Manager), que generalmente se instala junto con Node.js

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/apizarro1204/frontend-sist-gestion.git
    ```

2. Accede al directorio del proyecto:

    ```bash
    cd frontend-sist-gestion
    ```

3. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```
4. Ejecuta el Proyecto

    ```bash
    npm run dev
    ```

Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en tu navegador en:

http://localhost:5173

## Estructura del proyecto

    ```bash
    /Frontend
    /src
        /components
        - Navbar.jsx
        - TaskList.jsx
        - TaskItem.jsx
        /pages
        - HomePage.jsx
        - LoginPage.jsx
        - CreateTaskPage.jsx
        /services
        - api.js
        - App.jsx
        - index.jsx
    /public
        - index.html
    - package.json
    - README.md
    ```
/components: Componentes reutilizables como Navbar, TaskList y TaskItem.
/pages: Contiene las páginas principales, como HomePage, LoginPage y CreateTaskPage.
/services: Contiene el archivo api.js para manejar las solicitudes al backend.

## Notificaciones
Notificaciones
Este proyecto utiliza react-toastify para mostrar notificaciones de éxito y error al crear, editar y eliminar tareas.

Personalización de Notificaciones
Las notificaciones pueden personalizarse en el componente HomePage.jsx. Actualmente, se muestra una notificación al usuario cuando las tareas se crean, actualizan o eliminan correctamente.

    

