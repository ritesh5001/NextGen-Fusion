# Command: test — Run Tests

## Unit + Integration Tests (Jest)

```bash
cd Frontend
npm test                  # run all tests once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

## End-to-End Tests (Playwright)

```bash
cd Frontend
npm run test:e2e          # headless
npm run test:e2e:ui       # Playwright UI mode
```

## Run Everything

```bash
cd Frontend && npm run test:all
```

## Type-Check (no emit)

```bash
cd Backend  && npx tsc --noEmit
cd Frontend && npx tsc --noEmit
```

## Lint

```bash
cd Frontend && npm run lint
```

## Before Committing

1. `npx tsc --noEmit` in both sub-projects — zero errors.
2. `npm test` in Frontend — all pass.
3. Manually verify the changed UI path in browser.
