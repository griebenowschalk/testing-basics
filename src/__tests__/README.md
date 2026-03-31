# Testing README (extends `notes.md`)

This doc is the "where do I find X?" index for tests in `src/__tests__/`.

Use `notes.md` for concepts (dummies/fakes/stubs/spies/mocks), and use this file to find concrete examples quickly.

## Quick Navigation by Method


| Method / Tool                                                           | Test files                                                                                                          |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Basic render assertions (`render`, `getByRole`)                         | `First.test.tsx`, `SimplePost.test.tsx`, `AppWithRoutes.test.tsx`                                                   |
| Query patterns (`getBy*` vs `queryBy*`)                                 | `SimplePost.test.tsx`                                                                                               |
| Scoped queries (`within`)                                               | `SimplePost.test.tsx`, `Post.test.tsx`, `PostNetwork.test.tsx`, `PostWithComment.test.tsx`, `ShoppingList.test.tsx` |
| User interactions (`@testing-library/user-event`)                       | `PostWithComment.test.tsx`, `ShoppingList.test.tsx`, `PostTDD.test.tsx`, `RoutesConfig.test.tsx`                    |
| Snapshot testing (`toMatchSnapshot`)                                    | `SimplePostSnap.test.tsx` (+ `__snapshots__/SimplePostSnap.test.tsx.snap`)                                          |
| Module mocking (`vi.mock`)                                              | `Post.test.tsx`, `RoutesConfig.test.tsx`, `AppWithRoutes.test.tsx`                                                  |
| Function spies (`vi.spyOn`)                                             | `Post.test.tsx`, `PostNetwork.test.tsx`, `ShoppingList.test.tsx`, `PostTDD.test.tsx`                                |
| Plain mocks (`vi.fn`)                                                   | `ShoppingList.test.tsx`                                                                                             |
| Hook testing (`renderHook`)                                             | `UseArray.test.tsx`                                                                                                 |
| Async/update coordination (`act`)                                       | `Post.test.tsx`, `PostNetwork.test.tsx`, `UseArray.test.tsx`, `PostTDD.test.tsx`                                    |
| Error assertion (`toThrow`)                                             | `ShoppingList1.test.tsx`                                                                                            |
| Error UI assertion (fallback rendering)                                 | `ShoppingList2.test.tsx`, `PostNetwork.test.tsx`                                                                    |
| Router testing (`createMemoryRouter`, `RouterProvider`, `MemoryRouter`) | `RoutesConfig.test.tsx`, `AppWithRoutes.test.tsx`                                                                   |
| Time control (`vi.setSystemTime`, `vi.useRealTimers`)                   | `PostTDD.test.tsx`                                                                                                  |
| Lifecycle hooks (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`)    | `PostNetwork.test.tsx`, `PostWithComment.test.tsx`, `PostTDD.test.tsx`                                             |
| Mock cleanup/reset (`vi.clearAllMocks`, `vi.restoreAllMocks`)           | `test/setup.ts`, `PostNetwork.test.tsx`                                                                              |
| Global DOM setup (`@testing-library/jest-dom`, `cleanup`)               | `test/setup.ts`                                                                                                      |
| `it.todo` / `it.skip` examples                                          | `SimplePost.test.tsx`, `AppWithRoutes.test.tsx`                                                                     |


## Test-by-Test Index

### Label Legend

- **Unit**: tests isolated logic with minimal external wiring (pure behavior, hooks, thrown errors, mocks/spies).
- **Component**: tests a rendered component's UI/state/interaction in isolation.
- **Integration**: tests multiple pieces working together (routing, network boundary, service + component contract).

### `First.test.tsx`

- **Goal**: sanity check component render.
- **Methods**: `render`, `getByRole`, `toBeInTheDocument`.
- **Label**: Component.

### `SimplePost.test.tsx`

- **Goal**: verify conditional rendering of likes and basic content.
- **Methods**: `render`, `screen.getBy*`, `screen.queryBy*`, `within`, nested `describe`, `it.todo`, `it.skip`.
- **Label**: Component.

### `SimplePostSnap.test.tsx`

- **Goal**: detect UI regressions via snapshot.
- **Methods**: `render(...).asFragment()`, `toMatchSnapshot`.
- **Label**: Component.

### `Post.test.tsx`

- **Goal**: test comment loading from data service abstraction.
- **Methods**:
  - `vi.mock` for full module replacement (`DataService`).
  - `vi.spyOn` + `mockResolvedValueOnce` for targeted override.
  - `act` for async render/effects.
  - `within` for comment container assertions.
- **Label**: Integration.

### `PostNetwork.test.tsx`

- **Goal**: verify network-driven comment loading and error states.
- **Methods**:
  - `vi.spyOn(axios, "get")`.
  - `mockResolvedValue` / `mockRejectedValue`.
  - MSW request interception via `setupServer` + `http.get` + `HttpResponse`.
  - server lifecycle hooks (`beforeAll`, `afterEach`, `afterAll`).
  - per-test mock cleanup with `vi.restoreAllMocks`.
  - call-argument assertions (`toHaveBeenCalledWith`, `mock.calls`).
  - async `act`.
- **Label**: Integration.

### `PostWithComment.test.tsx`

- **Goal**: verify user can type/submit comments and list updates.
- **Methods**: `userEvent.setup`, `user.type`, `user.click`, input and list assertions with `within`.
- **Label**: Component.

### `ShoppingList.test.tsx`

- **Goal**: compare local spy, module spy, external/global spy, and plain mock approaches.
- **Methods**:
  - wrapper-object local spy pattern.
  - module function spy via `vi.spyOn(Utils, ...)`.
  - global builtin spy (`vi.spyOn(Date, "now")`).
  - `vi.fn()` callback mock.
  - user click flow with `userEvent`.
- **Label**: Unit.

### `ShoppingList1.test.tsx`

- **Goal**: assert component throws on invalid input.
- **Methods**: `expect(() => render(...)).toThrow(...)`.
- **Label**: Unit.

### `ShoppingList2.test.tsx`

- **Goal**: assert error message rendered in UI for invalid input.
- **Methods**: render + error-role assertion.
- **Label**: Component.

### `UseArray.test.tsx`

- **Goal**: test custom hook behavior for number/string arrays.
- **Methods**: `renderHook`, `act`, mutation APIs (`push`, `remove`, `update`, `filter`) assertions.
- **Label**: Unit.

### `RoutesConfig.test.tsx`

- **Goal**: verify route resolution and navbar navigation behavior.
- **Methods**:
  - route component mocking with `vi.mock`.
  - `createMemoryRouter` + `RouterProvider` for direct path checks.
  - `userEvent` click navigation checks with `AppWithRoutes`.
- **Label**: Integration.

### `AppWithRoutes.test.tsx`

- **Goal**: verify app shell and default route rendering.
- **Methods**: `vi.mock`, `render`, skipped route test with `MemoryRouter`.
- **Label**: Integration.

### `PostTDD.test.tsx`

- **Goal**: verify loading/sorting comments and submit behavior with timestamp.
- **Methods**:
  - service spies (`vi.spyOn`).
  - `mockResolvedValueOnce`.
  - deterministic time (`vi.setSystemTime`, `vi.useRealTimers` in `afterEach`).
  - user interaction with `userEvent`.
  - async `act`.
- **Label**: Integration.

## Test Infra References

- `vitest.config.ts`: globals enabled, `jsdom` environment, and `setupFiles` points to `test/setup.ts`.
- `test/setup.ts`:
  - imports `@testing-library/jest-dom` matchers.
  - runs `cleanup()` after each test.
  - runs `vi.clearAllMocks()` after each test.
  - sets `global.TextEncoder`.

## MSW Status in This Repo

- Active MSW examples are in `PostNetwork.test.tsx` under `describe("Post test suite with msw", ...)`.
- Axios-spy and MSW styles both exist in the same file so you can compare approaches directly.
- Keep `onUnhandledRequest: "error"` in MSW suites to fail fast on missing handlers.

## Suggested Usage Pattern

- Need "how do we test hooks?" -> `UseArray.test.tsx`.
- Need "how do we test route navigation?" -> `RoutesConfig.test.tsx`.
- Need "mock vs spy examples?" -> `ShoppingList.test.tsx` and `Post.test.tsx`.
- Need "network success/error tests?" -> `PostNetwork.test.tsx`.
- Need "user interaction flow?" -> `PostWithComment.test.tsx` and `PostTDD.test.tsx`.

