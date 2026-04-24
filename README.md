# 🧬 ADN Mutante — Detector de Mutantes

<p align="center">
  <img src="public/Logoadn.png" alt="Logo ADN" width="120" />
</p>

<p align="center">
  <b>Aplicación Angular 21 que analiza secuencias de ADN y detecta si pertenecen a un mutante.</b>
</p>

<p align="center">
  <img src="public/ismutant.png" alt="Mutante detectado" width="640" />
</p>

---

## ✨ ¿De qué trata el proyecto?

El proyecto recibe una matriz **N x N** con letras `A`, `T`, `C`, `G` representando una cadena de ADN.
Un humano es **mutante** si encuentra **más de una secuencia de 4 letras iguales** de forma:

- ➡️ Horizontal
- ⬇️ Vertical
- ↘️ Diagonal

La interfaz resalta visualmente las células mutantes encontradas y muestra un resultado animado indicando si el ADN es mutante o humano.

---

## 🧩 Estructura

```
src/app/
├── components/
│   ├── banner/     → Banner de resultado (mutante / humano)
│   ├── grid/       → Visualización de la matriz de ADN
│   ├── header/     → Encabezado de la app
│   ├── input/      → Formulario para ingresar la secuencia
│   └── result/     → Vista final con las células resaltadas
├── app.routes.ts
├── app.config.ts
└── app.ts
```

---

## 🛠️ Stack

- [Angular 21](https://angular.dev/) (standalone components)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) para tests
- TypeScript 5.9

---

## 🚀 Cómo arrancar el proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar el servidor de desarrollo

```bash
npm start
```

Abrir el navegador en 👉 [http://localhost:4200](http://localhost:4200)

La app recarga automáticamente al guardar cambios en el código.

---

## 📦 Comandos disponibles

| Comando            | Descripción                                                   |
| ------------------ | ------------------------------------------------------------- |
| `npm start`        | Inicia el servidor de desarrollo en `http://localhost:4200`  |
| `npm run build`    | Compila la app para producción en `dist/`                     |
| `npm run watch`    | Build en modo desarrollo con recompilación automática         |
| `npm test`         | Ejecuta los tests unitarios con Vitest                        |
| `npm run ng`       | Acceso directo al CLI de Angular                              |

---

## 🧪 Generar componentes

```bash
npm run ng -- generate component nombre-del-componente
```

Para ver todos los schematics disponibles:

```bash
npm run ng -- generate --help
```

---

## 🏗️ Build de producción

```bash
npm run build
```

Los artefactos quedan optimizados en la carpeta `dist/`.

---

<p align="center">🧬 Santiago Lozano
</p>
