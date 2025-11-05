# Breve CLI ☕

**Breve CLI** es una herramienta de línea de comandos diseñada para acelerar el desarrollo de aplicaciones backend con **Express.js y TypeScript**. Olvídate de la configuración repetitiva y la creación manual de archivos. Con Breve, puedes generar un proyecto completo o componentes específicos con un solo comando, permitiéndote enfocarte en lo que realmente importa: la lógica de tu aplicación.

## ¿Por qué Breve?

El objetivo de Breve es simple: hacer que el inicio y la expansión de un proyecto Express + TypeScript sea una tarea **rápida, consistente y sin fricciones**. Inspirado en los generadores de código de frameworks como Angular o NestJS, Breve trae esa misma potencia y conveniencia al ecosistema de Express.

## ✨ Características Principales

*   **Creación de Proyectos:** Genera un nuevo proyecto Express con una estructura de carpetas organizada, TypeScript preconfigurado y scripts esenciales listos para usar.
*   **Generación de Módulos:** Crea un módulo completo con su controlador, router y servicio, y lo registra automáticamente en la ruta principal de la aplicación.
*   **Generador de Componentes:** Genera archivos individuales como controladores, routers, DTOs, middlewares y más, a partir de plantillas personalizables.
*   **Integración con ORM:** Soporte opcional para configurar Prisma durante la creación del proyecto.
*   **Basado en Plantillas:** La estructura y el contenido de los archivos generados se basan en plantillas, lo que facilita su personalización y adaptación a tus necesidades.

## 🚀 Cómo Empezar

Para comenzar a usar Breve CLI, solo necesitas tener Node.js instalado.

1.  **Instala el CLI de forma global:**
    ```bash
    npm install -g breve-cli
    ```

2.  **Crea un nuevo proyecto:**
    ```bash
    breve new mi-super-api
    ```

3.  **Navega a tu proyecto y ejecuta:**
    ```bash
    cd mi-super-api
    npm install
    npm run dev
    ```

¡Y listo! Tu servidor de desarrollo estará corriendo en `http://localhost:3000`.

## ⚙️ Comandos Disponibles

### Crear un nuevo proyecto

```bash
breve new <nombre-del-proyecto>
```

Opcionalmente, puedes integrar Prisma desde el inicio:

```bash
breve new <nombre-del-proyecto> --orm prisma
```

### Generar componentes

Usa el comando `generate` para crear rápidamente los bloques de construcción de tu aplicación.

*   **Crear un módulo completo (recomendado):**
    ```bash
    breve generate module users
    ```
    Esto creará un controlador, servicio y router para `users` y registrará la ruta `/api/users`.

*   **Crear un componente individual:**
    ```bash
    breve generate <tipo> <nombre>
    ```
    Donde `<tipo>` puede ser: `controller`, `router`, `middleware`, `dto`, `model`, `type`.

## 🤝 Contribuciones

Las contribuciones son siempre bienvenidas. Si tienes ideas para mejorar Breve CLI, no dudes en abrir un *issue* o enviar un *pull request*.