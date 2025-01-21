# FintualAPI

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Documentación

En este proyecto he utilizado *Angular 19*, la última versión estable, junto con la  librería *ngx-charts* para poder mostrar  el gráfico.

### Estructura de Archivos

Dentro de la carpeta *src/* los siguientes archivos se generan por defecto:
- main.server.ts: Punto de entrada principal para la versión server-side rendering (SSR) de la aplicación Angular.
- main.ts: Punto de entrada principal de la aplicación Angular para el cliente (browser). Se encarga de inicializar el módulo principal de la app.
- server.ts: Configuración del servidor de Angular Universal (SSR). Define cómo la aplicación maneja las solicitudes HTTP del servidor.
- styles.css: Archivo de estilos globales donde se definen los estilos base de la aplicación, no fue necesario utilizar estilos globales, se usaron en cada componente (ej. app.component.css).
- index.hmtl: Contiene la estructura HTML básica de la aplicación. Incluye la etiqueta <app-root></app-root> donde Angular inyecta los componentes.

Además, dentro de la carpeta *src/app/*, tenemos otros archivos importantes:

- app.component.ts: Componente principal de la aplicación, que contiene la lógica principal y gestiona el gráfico de ngx-charts.
- app.component.html: Plantilla HTML del componente principal, donde se define la estructura visual del gráfico y otros elementos.
- app.component.css: Estilos específicos del componente principal.
- fintual.service.ts: Servicio encargado de realizar peticiones HTTP a la API de Fintual para obtener los datos de los fondos de inversión.