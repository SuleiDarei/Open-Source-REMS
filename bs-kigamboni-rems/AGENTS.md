<!-- BEGIN:nextjs-agent-rules -->
# 🤖 AI Coding Agent Guidelines for BS Kigamboni REMS

Hello AI! You are assisting in building the BS Kigamboni Real Estate Management System (REMS). This is a modern, foolproof, multi-tenant web application. Read these rules carefully before generating any code.

## 1. Core Tech Stack
* **Framework:** Next.js (App Router only, no Pages router).
* **React:** React 19+ (React Compiler is enabled).
* **Language:** TypeScript (Strict mode enabled).
* **Database:** SQLite via `better-sqlite3`.
* **ORM:** Drizzle ORM.
* **Authentication:** NextAuth.js (Auth.js) v5.
* **Styling:** Tailwind CSS (Mobile-first, Dark/Light mode support).
* **Markdown Rendering:** `react-markdown`.

## 2. Next.js & React Architecture Rules
* **React Compiler is ON:** Do NOT use `useMemo`, `useCallback`, or `React.memo` unless explicitly necessary for a third-party library. The compiler handles memoization automatically.
* **Server Components by Default:** Always default to React Server Components (RSC). Only use `"use client"` at the very top of a file when you need interactivity (e.g., `useState`, `onClick`, `useEffect`, or browser APIs).
* **Data Fetching:** Fetch data directly in Server Components using async/await and Drizzle. Do NOT use `useEffect` for data fetching.
* **Mutations:** Use Next.js Server Actions for all database mutations (forms, button clicks). Place Server Actions in dedicated files (e.g., `src/actions/tenantActions.ts`) with `"use server"` at the top.
* **UI Components:** Keep client components as low in the tree as possible. Pass Server Component payloads as props to Client Components.

## 3. Database & Drizzle Rules
* **Schema Location:** The master database schema is located at `src/db/schema.ts`. Always refer to this file for table definitions.
* **No Raw SQL:** Always use Drizzle's query builder (e.g., `db.select().from(users)`). 
* **Amounts are Integers:** All financial amounts are stored as integers (Tanzanian Shillings) to prevent floating-point errors.
* **Nullable Auth Fields:** Remember that `email` and `passwordHash` in the `users` table are nullable to accommodate **Offline Tenants** (elderly users managed manually by Admins).

## 4. Specific Business Logic Context
When writing logic for the financial engine or property management, adhere to these rules:
* **Deferred Revenue Time-Lock:** Rent paid for *future* months (where `invoice.monthYear` > current month) must be excluded from the "Live Distributable Pool".
* **Expense Reimbursements:** If an expense `paidBy` is 'BUSINESS', it reduces the total pool. If `paidBy` is a shareholder ID, it reduces the total pool AND adds a credit to that shareholder's balance.
* **Bank Transfer Foolproofing:** Any payment with the method `BANK_TRANSFER` must be set to `status: 'PENDING_VERIFICATION'` and require an Admin to approve it before it hits the live ledger.
* **Minimum Lease Days:** 'STORE' and 'STALL' require a minimum lease of 90 days. 'HALL' requires a minimum lease of 1 day.

## 5. UI & Styling Rules
* **Tailwind:** Use Tailwind utility classes for all styling.
* **Responsiveness:** All dashboards and tables MUST be mobile-friendly. Use horizontal scrolling for wide data tables (`overflow-x-auto`) on small screens.
* **Loading States:** Use React `<Suspense>` boundaries with fallback skeletons (`fallback={<Skeleton />}`) for all asynchronous data fetching.
* **Forms:** Use native HTML5 validation paired with server-side validation inside Server Actions.

**When asked to build a feature, always prioritize simplicity, user-friendliness, and foolproof validation over complex visual animations.**
<!-- END:nextjs-agent-rules -->
