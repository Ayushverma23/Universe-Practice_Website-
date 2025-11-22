# History of the Universe

A visually immersive website that chronicles the history of the universe, from the Big Bang to future predictions. This project features a premium, cosmic-themed design with interactive timelines and educational content about major scientific breakthroughs and research.

## Features

-   **Immersive Design**: Custom star fields and twinkling background effects to simulate deep space.
-   **Interactive Timeline**: A journey through the major epochs of the universe.
-   **Research & Breakthroughs**: Sections dedicated to major scientific discoveries and ongoing research.
-   **Failures & Challenges**: A look at scientific theories that didn't hold up and the challenges that remain.
-   **Responsive Layout**: Optimized for various screen sizes.

## Tech Stack

-   **Vite**: Next Generation Frontend Tooling for fast development and building.
-   **TypeScript**: Typed superset of JavaScript for better code quality and maintainability.
-   **Vanilla CSS**: Custom styling for maximum control over the visual presentation.
-   **HTML5**: Semantic markup.

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

-   Node.js (v14 or higher recommended)
-   npm (comes with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd history-of-universe
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:5173` (or the URL shown in the terminal).

### Building for Production

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
history-of-universe/
├── public/              # Static assets
├── src/
│   ├── components/      # TypeScript components
│   ├── data.ts          # Data for the timeline and sections
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles
├── index.html           # Main HTML file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## License

[MIT](LICENSE)
