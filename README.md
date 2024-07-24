# Clear Accounts

## Overview

The objective of this project is to track expenses among a group of friends, where you can ultimately see the balances
of each participant and determine the reimbursements necessary to equalize expenses.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mamolina01/accounts-clear
   cd accounts-clear
   ```

2. Copy the `.env.example` file to `.env.local` and fill in the values.

   ```bash
   cp .env.example .env.local
   ```

3. Setup database

   ```bash
   docker compose up -d
   npx prisma migrate dev
   yarn seed
   ```

4. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   Open http://localhost:3000 in your browser to view the project.
   ```

5. Run the Project

   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test

1. Run `yarn test:watch`

### Contributing

Contributions are welcome! Please open an issue or contact me for any changes or improvements.
