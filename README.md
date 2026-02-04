# Pico y Placa Predictor – Clean Architecture (Node.js)

This project is a Pico y Placa restriction predictor built with Node.js following Clean Architecture principles.
It determines whether a vehicle can be on the road based on license plate number, date, time, peak hours, holidays, and provides intelligent warning messages.

The application includes a simple web interface built with Express and automated unit tests.

---

## Features

* Pico y Placa restriction validation by day and plate number
* Peak hour enforcement
* Holiday exemption
* Intelligent warnings:

  * Upcoming restriction in minutes (red)
  * Restriction later the same day (yellow)
  * Restriction on another day (green)
* Clean Architecture layered design
* Web interface with Express
* Automated unit tests with Jest

---

## Project Structure

```
src/
 ├─ domain/          # Business rules (pure logic)
 ├─ application/    # Use cases
 └─ infrastructure/
     └─ web/         # Express web interface

tests/
README.md
```

---

## Business Rules

### Restricted days by plate digit

| Day       | Restricted digits |
| --------- | ----------------- |
| Monday    | 1, 2              |
| Tuesday   | 3, 4              |
| Wednesday | 5, 6              |
| Thursday  | 7, 8              |
| Friday    | 9, 0              |
| Saturday  | None              |
| Sunday    | None              |
| Holidays  | None              |

### Peak hours

* Morning: 06:00 – 09:30
* Afternoon: 16:00 – 20:00

*These schedules are in accordance with the peak hour and license plate restrictions regulations for the current year.*

---

## Installation

Clone the repository:

```bash
git clone https://github.com/SebasRo17/Pico-Placa-Predictor.git
```

Navigate into the project directory:

```bash
cd Pico-Placa-Predictor
```

Install dependencies:

```bash
npm install
```

---

## Running the Web Application

```bash
npm run dev
```

or

```bash
node src/infrastructure/web/server.js
```

Then open:

```
http://localhost:3000
```

---

## Running Tests

```bash
npm test
```

The business logic is fully covered by automated unit tests.

---

## Debug Logs (Development Practice)

As part of this practical exercise, debugging logs were intentionally kept in the application layer.

These logs demonstrate:

* Input validation flow
* Date and time parsing corrections
* Business rule evaluation
* Final decision tracing

They were used to clearly showcase the debugging and error correction process during development.

In a production environment, these logs would typically be removed or replaced with a proper logging system.

---

## Example Input

* Plate: `PDN-3635`
* Date: `2026-02-04`
* Time: `15:55`

The system will:

* Validate restriction
* Display status
* Provide intelligent warning messages

---

## Architecture Principles

* Separation of concerns
* Business logic independent from infrastructure
* Testable and maintainable design
* No framework coupling in domain layer

---

## Technologies

* Node.js (JavaScript)
* Express
* Jest

---

## Author

Sebastian Roblez