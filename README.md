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

## Screenshots

**Menu**

<img width="2556" height="1966" alt="CleanShot 2026-03-07 at 15 24 19@2x" src="https://github.com/user-attachments/assets/40fdcb53-990c-4d54-826e-fc56e0d2516d" />

**Cart**

<img width="2556" height="1966" alt="CleanShot 2026-03-07 at 15 24 32@2x" src="https://github.com/user-attachments/assets/8f933ac1-5587-4142-b98a-c6cc9c96fb12" />

**History**

<img width="2556" height="1966" alt="CleanShot 2026-03-07 at 15 24 56@2x" src="https://github.com/user-attachments/assets/91c751d0-a2d7-4d42-a0d4-b134d70f0a83" />
