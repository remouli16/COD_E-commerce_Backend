# E-Commerce COD Backend API

A scalable and decoupled backend service designed specifically for Cash-on-Delivery (COD) e-commerce operations.

## Architecture & Tech Stack
- **Runtime Environment:** `Node.js`
- **Framework:** `Express.js` (Robust routing and middleware pipeline)
- **Database:** `MongoDB` (Mongoose ODM for schema validation and data modeling)
- **Authentication:** Stateless `JWT` (JSON Web Tokens) with refresh token rotation
- **Security:** `Helmet`, `CORS`, and `express-rate-limit` to prevent brute-force attacks

## Core Engineering Features
- **Dynamic Order Lifecycle:** Specialized state machine to handle COD states (`Pending` -> `Dispatched` -> `Delivered` / `Returned`).
- **Inventory Management:** Atomic operations via MongoDB `$inc` operator to prevent race conditions during concurrent checkouts.
- **Data Integrity:** Strict request validation using `Joi`/`Zod` before hitting the controller layer.
