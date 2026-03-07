# Food Order System

A modern food ordering web application built with Next.js.

## How to Run & Test

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Run Tests
```bash
pnpm test
```

## Project Structure

There are three pages under `app/` directory which are `menu`, `cart` and `history`.

```
food-order-system/
└── app/
    ├── cart/
    │   └── page.tsx
    ├── history/
    │   └── page.tsx
    └── menu/
        └── page.tsx
```

## Packages Used

### State Management
- **zustand**

### UI Components & Styling
- **tailwindcss**
- **shadcn** - UI component library (built on Base UI + Tailwind)

### Testing
- **vitest**
- **react-testing-library**
