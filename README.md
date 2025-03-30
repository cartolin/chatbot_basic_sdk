# Chatbot SDK

Este repositorio contiene un **Chatbot SDK** que permite integrar un chat interactivo basado en inteligencia artificial en cualquier sitio web de forma sencilla. El SDK está construido sobre una arquitectura de tres capas:

- **Chat-backend (NestJS):**  
  Gestiona la lógica del chat, la integración con la inteligencia artificial (via Langchain y API Deepseek) y el acceso a la base de datos.

- **Widget (Angular 19):**  
  Provee la interfaz gráfica del chat, la cual interactúa con el usuario y se comunica con el chat-backend.

- **SDK (Script Inyectable):**  
  Es un script ligero que se inyecta en cualquier página web. Este script configura y carga de forma asíncrona el widget del chat, facilitando su integración.

## Tabla de Contenidos

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Uso](#uso)

## Características

- **Fácil Integración:**  
  Basta con copiar y pegar un pequeño snippet en la página web del cliente.

- **Configuración Personalizable:**  
  Configura el SDK mediante un objeto global (`window.MySDKConfig`) para definir la URL del widget, parámetros de conexión, etc.

- **Comunicación entre Capas:**  
  Utiliza `postMessage` para la comunicación entre el widget (dentro del iframe) y el script del SDK.

- **Animaciones:**  
  Se integra [animate.css](https://animate.style/) para transiciones suaves al abrir y cerrar el chat.

## Arquitectura

El flujo de la aplicación es el siguiente:

1. **Script Inyectable (SDK):**  
   - Se carga en cualquier página web mediante un snippet.
   - Inyecta la burbuja (botón) en la esquina inferior.
   - Al hacer clic, muestra/oculta el contenedor del chat, el cual incluye un iframe que carga el widget Angular.

2. **Widget (Angular 19):**  
   - Se ejecuta en el iframe y proporciona la interfaz interactiva del chat.
   - Permite al usuario enviar mensajes y recibir respuestas.
   - Incluye un botón "X" para cerrar el chat, que envía un mensaje al SDK mediante `postMessage`.

3. **Chat-backend (NestJS):**  
   - Se encarga de procesar los mensajes, gestionar la lógica del chatbot, conectarse con la inteligencia artificial y la base de datos.
   - Provee endpoints (o WebSockets) para la comunicación con el widget.

## Instalación

### Requisitos

- Node.js (v14 o superior)
- npm o yarn

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/chatbot-sdk.git
cd chatbot-sdk
```

# Uso
Para inyectar el SDK en cualquier página web, se debe copiar y pegar el siguiente snippet en el HTML:
```bash
<script>
  (function () {
    // Configuración global para el SDK
    window.MySDKConfig = {
      widgetUrl: "http://localhost:4200", // URL donde se aloja tu widget Angular
      // Otros parámetros de configuración pueden agregarse aquí
    };

    // Inyección asíncrona del SDK
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://cdn.example.com/sdk/main.js"; // Actualiza esta URL con la ubicación real de tu bundle
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  })();
</script>
```
Nota: Durante pruebas locales, puedes apuntar a ./main.js si ambos archivos se encuentran en el mismo directorio, pero lo ideal es servir el archivo desde un servidor o CDN.
