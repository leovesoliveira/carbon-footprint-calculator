# Carbon Footprint Calculator | Backend

API for calculating your carbon footprint, built with [NestJS](https://nestjs.com/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer recommended)

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/leovesoliveira/carbon-footprint-calculator.git
```

```sh
cd carbon-footprint-calculator/backend
```

2. **Install dependencies:**

```sh
npm install
```

### Running the Application

Start the development server:

```bash
npm run start:dev
```

### Running Tests

#### Unit Tests

```bash
npm run test
```

#### End-to-End Tests

```bash
npm run test:e2e
```

## Project Structure

```
backend/
├── src/
│   ├── adapters/       # Http and database adapters
│   ├── domain/         # Business logics, entity and value objects
│   ├── handlers/       # Domain handlers
│   ├── ports/          # Contracts for handlers and adapters
│   ├── app.module.ts   # NestJS modules setup
│   └──main.ts          # App entry point
```

### API Endpoints

#### Health Check

- **GET** `/health`
  - Response:
    ```json
    { "message": "Health Check Ok!" }
    ```

#### Calculate Carbon Footprint

- **POST** `/calculate`
  - Request body:
    ```json
    {
      "housing": {
        "electricity": { "value": "1000", "unit": "kWh/yr" },
        "naturalGas": { "value": "300", "unit": "therms/yr" },
        "fuelOil": { "value": "500", "unit": "litres/yr" },
        "lpg": { "value": "200", "unit": "litres/yr" },
        "waste": { "value": "10", "unit": "kg/week" },
        "water": { "value": "120", "unit": "litres/day" }
      },
      "travel": {
        "vehicle": { "value": "10000", "unit": "km/yr" },
        "bus": { "value": "500", "unit": "km/yr" },
        "metro": { "value": "300", "unit": "km/yr" },
        "taxi": { "value": "100", "unit": "km/yr" },
        "rail": { "value": "200", "unit": "km/yr" },
        "flight": { "value": "1500", "unit": "km/yr" }
      }
    }
    ```
  - Response:
    ```json
    {
      "housing": {
        "totalEmissions": { "value": "1075.00", "unit": "kg CO2e/yr" }
      },
      "travel": {
        "totalEmissions": { "value": "210.00", "unit": "kg CO2e/yr" }
      },
      "totalEmissions": { "value": "1285.00", "unit": "kg CO2e/yr" }
    }
    ```

---
