# PROJECT_STRUCTURE.md

This document defines the **required project structure** and the separation of concerns for **API routes** and **App Router pages**.

> Goal: keep files predictable, easy to find, and consistent across endpoints and pages.

---

## Top-level layout

Recommended structure (expand as needed):

```
app/
  api/
    ...route handlers (thin)
  (routes)/
    ...pages (thin)
server/
  ...business logic for API + server actions + data access
views/
  ...UI “screens” / page-level view components
components/
  ...reusable UI components
lib/
  ...shared utilities (formatters, validation, http helpers, etc.)
types/
  ...shared TypeScript types
```

**Rules of thumb**

- `app/**` should be **composition and routing**, not business logic.
- `server/**` should contain **business logic and side effects** (DB, email, Stripe, etc).
- `views/**` should contain **page-level UI**, not data fetching or auth logic.
- `common/**` should contain **shared React/UI code only**.
- Server-only helpers/utilities must live under `server/util/**`, not `common/**`.

---

## API structure (`app/api/**` + `server/**`)

### 1) Authentication is handled inside `app/api`

All API authentication and authorization checks must happen **in the route handler** (`app/api/.../route.ts`) before calling server logic.

- ✅ Verify caller identity (cookies/JWT/session)
- ✅ Validate permissions / roles
- ✅ Reject unauthorized requests early
- ✅ Pass only trusted data into `server/**`

**Never** hide auth checks inside `server/**` as a surprise dependency.

- Exception: shared _helpers_ for auth may live in `server/auth/*`, but the route handler must explicitly call them.

### 2) API route handlers are thin

Each API route handler must:

1. authenticate + authorize
2. validate + parse input
3. call a single server function
4. translate server result into an HTTP response

No business logic in `app/api/**`.

### 3) Server logic file placement + naming (required)

For each API endpoint:

- `app/api/{endpoint}/route.ts` is the thin route handler
- Business logic lives in:
  - `server/{endpoint}/{endpoint}.{method}.ts`

#### Examples

- `POST /api/contact`
  - Route handler: `app/api/contact/route.ts`
  - Logic: `server/contact/contact.post.ts`

- `GET /api/user`
  - Route handler: `app/api/user/route.ts`
  - Logic: `server/user/user.get.ts`

- `PATCH /api/subscription`
  - Route handler: `app/api/subscription/route.ts`
  - Logic: `server/subscription/subscription.patch.ts`

> **Method naming** must be lowercase: `get | post | put | patch | delete`.

### 4) Server function conventions

Each `server/{endpoint}/{endpoint}.{method}.ts` file should export a single function:

```ts
// server/contact/contact.post.ts
export async function contactPost(
  input: ContactPostInput,
): Promise<ContactPostResult> {
  // business logic + side effects live here
}
```

Recommended naming:

- `{endpoint}{MethodPascalCase}` as the function name:
  - `contactPost`, `userGet`, `subscriptionPatch`
- Use explicit `Input` and `Result` types:
  - `ContactPostInput`, `ContactPostResult`

### 5) Validation

Validation should happen at the boundary:

- API route handler validates request body/query params (recommended: Zod)
- `server/**` may assert invariants, but should not be the first line of defense

### 6) Data access + third-party clients

Put shared clients in `server/clients/*` or `server/lib/*`, for example:

- `server/clients/stripe.ts`
- `server/clients/dynamodb.ts`
- `server/clients/ses.ts`

Server logic files import from these clients instead of instantiating them repeatedly.

### 7) API folder examples

```
app/api/contact/route.ts
server/contact/contact.post.ts

app/api/user/route.ts
server/user/user.get.ts
server/user/user.patch.ts
```

If an endpoint supports multiple methods, keep **one file per method** in `server/**`.

---

## Pages structure (`app/**` + `views/**`)

### 1) Authentication is handled in `page.tsx`

For routes under `app/**`, authentication/authorization decisions must be done in the route’s `page.tsx`.

- ✅ redirect unauthenticated users
- ✅ block access for unauthorized roles/groups
- ✅ decide what data can be loaded

> The page is the “gatekeeper” for that route.

### 2) Server-side data is loaded in `page.tsx`

All server-side data fetching for a route happens in `page.tsx` (or functions called by it), not in the view component.

- ✅ call `server/**` functions from `page.tsx`
- ✅ pass serialized data into the view

### 3) Metadata is set in `page.tsx`

Use App Router conventions:

- export `metadata` or `generateMetadata` from the route file(s)
- avoid metadata definitions inside `views/**`

### 4) Display is handled in `views/**`

The UI rendered by a page should live under `views/`.

**Example**

- URL: `/forgot-password`
- Route file: `app/forgot-password/page.tsx`
- View component: `views/forgot-password/ForgotPasswordView.tsx`
- Page imports and renders the view eg:

```tsx
// app/forgot-password/page.tsx
import { ForgotPasswordView } from "@/views/forgot-password/ForgotPasswordView";

export const metadata = { title: "Forgot password" };

export default async function Page() {
  // auth checks (if any)
  // server-side data loading (if any)
  return <ForgotPasswordView />;
}
```

#### Required view naming convention

- Folder: `views/{route-segment}/`
- Component file: `{PascalCase}View.tsx`
- Component name: `{PascalCase}View`

Example:

- `views/forgot-password/ForgotPasswordView.tsx` → `export function ForgotPasswordView() { ... }`

### 5) Page composition rules

`page.tsx` may:

- do auth checks
- load server data
- compute props for the view
- define metadata
- render the view

`views/**` may:

- render UI
- manage client state (if marked as `"use client"`)
- use small UI components from `components/**`
- accept props passed from `page.tsx`

`views/**` must NOT:

- perform privileged server-side fetching
- contain auth decisions for protected routes
- reach into cookies/session directly (unless you explicitly decide the view is server-only and it’s still purely presentational)

### 6) Protected route example pattern

```tsx
// app/admin/page.tsx
import { redirect } from "next/navigation";
import { AdminView } from "@/views/admin/AdminView";
import { requireSession, requireGroup } from "@/server/auth/auth";

export const metadata = { title: "Admin" };

export default async function Page() {
  const session = await requireSession(); // auth
  requireGroup(session, "SUPER_ADMIN"); // authorization

  const data = await getAdminDashboardData(); // server-side load
  return <AdminView data={data} />;
}
```

---

## Route segment mapping guidance

### Hyphenated routes

If a route segment is hyphenated, keep the view folder hyphenated too.

- Route: `app/forgot-password/page.tsx`
- View: `views/forgot-password/ForgotPasswordView.tsx`

### Nested routes

Follow the same mapping structure.

- Route: `app/services/[slug]/page.tsx`
- View: `views/services/ServiceDetailView.tsx`

If a nested route has a distinct screen:

- Route: `app/services/[slug]/edit/page.tsx`
- View: `views/services/ServiceEditView.tsx`

---

## Index/barrel exports (optional but recommended)

To keep imports clean, you may add:

```
views/forgot-password/index.ts
```

```ts
export { ForgotPasswordView } from "./ForgotPasswordView";
```

Then in pages:

```tsx
import { ForgotPasswordView } from "@/views/forgot-password";
```

Keep barrel exports **small and local** (avoid giant global barrels that cause circular deps).

---

## Tests and co-location (recommended)

- Unit tests for server logic:
  - `server/{endpoint}/{endpoint}.{method}.test.ts`
- Component tests (if used):
  - `views/{route}/{filename}.test.tsx`

---

## Quick checklist (copy/paste)

### API route checklist

- [ ] `app/api/{endpoint}/route.ts` exists and is thin
- [ ] Auth + authorization happens in `route.ts`
- [ ] Input validation happens in `route.ts`
- [ ] Business logic lives in `server/{endpoint}/{endpoint}.{method}.ts`
- [ ] One method = one server file (`.get.ts`, `.post.ts`, etc.)

### Page checklist

- [ ] Auth + authorization decisions in `app/**/page.tsx`
- [ ] Server-side data loading in `page.tsx`
- [ ] Metadata defined in `page.tsx` (`metadata` or `generateMetadata`)
- [ ] UI in `views/**` and imported by `page.tsx`
- [ ] View component named `{PascalCase}View`

---

## Non-goals

- This doc does not prescribe database schema, UI libraries, or deployment details.
- This doc is strictly about **code organization** and **responsibility boundaries**.
