# Anime Portal

A modern web application for exploring anime and manga, built with React, TypeScript, and Vite.

![GitHub Release](https://img.shields.io/github/v/release/dev-leva1/animeportal)
![GitHub top language](https://img.shields.io/github/languages/top/dev-leva1/animeportal)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fanimeportal.netlify.app%2F)

[README.ru.md](https://github.com/dev-leva1/animeportal/blob/main/README.ru.md)

![Feturest image](https://i.imgur.com/erE0V2B.png)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dev-leva1/animeportal.git
   cd animeportal
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
animeportal/
├── src/
│   ├── assets/         # Static assets (images, icons)
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Application pages
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── translations.ts # Language translations
├── public/             # Public assets
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Technologies Used

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **Emotion**: CSS-in-JS styling
- **React Router**: Client-side routing
- **Jikan API**: Anime and manga data source

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Jikan API](https://jikan.moe/) for providing anime and manga data
- [MyAnimeList](https://myanimelist.net/) as the original data source
