# Tech Stack
- Playwright
- Typescript
- Wiremock (Service Virtualization)

# TS
- Arrow functions vs regular functions
- Type coercion (== vs ====)
- Destructure
- Spread
- Array methods: filter(), map(), reduce()
- Async, Await, Promise
- tsconfig.json

# UI Tests w/ Playwright
- Fixtures
- POM
- beforeEach(), afterEach()

To run all UI tests on local, run `npx playwright test --project=ui`

# API + Service Virtualization
- Wiremock: 
  - great for simulating third-party vendors you don't control (Stripe, a payment gateway, an external SaaS) where there's no contract-sharing relationship possible. Also great for the failure-mode simulation (timeouts, rate limits, etc)
  - mappings folder with json stubs, PW API tests against mock

To run all wiremock stubbed API tests on local:
- first run `npx wiremock --port 8089 --root-dir src/wiremock`
- next `npx playwright test --project=api`

# playwright.config.ts
- projects: ui and api
- workers
