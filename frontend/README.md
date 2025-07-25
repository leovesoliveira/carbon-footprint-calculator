# Carbon Footprint Calculator | Frontend

Responsive web application for calculating your carbon footprint, built with **React**, **TypeScript**, **Vite**, **MUI**, **Tailwind CSS**, and **Zustand**.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/leovesoliveira/carbon-footprint-calculator.git
   cd carbon-footprint-calculator/frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

```sh
npm run test
```

## Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # React Components (Atomic Design Structure)
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Services contracts and implementations
│   ├── shared/            # Shared types and constants
│   ├── stores/            # Zustand stores for state management
│   ├── index.css          # Tailwind CSS entry
│   ├── main.tsx           # App entry point
│   └── setupTests.ts      # Test setup
└── index.html             # HTML entry point
```

## API

The frontend expects a [backend](https://github.com/leovesoliveira/carbon-footprint-calculator/tree/main/backend) API running at `http://localhost:3000` with a `/calculate` endpoint that accepts a POST request with the following payload:

## Customization

- **Styling:** Uses both [Material UI](https://mui.com/) and [Tailwind CSS](https://tailwindcss.com/).
- **State Management:** Uses [Zustand](https://zustand-demo.pmnd.rs/).
- **Forms:** Uses [React Hook Form](https://react-hook-form.com/).

---
