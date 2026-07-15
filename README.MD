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
- playwright.config.ts

# API + Service Virtualization
- Wiremock: 
  - great for simulating third-party vendors you don't control (Stripe, a payment gateway, an external SaaS) where there's no contract-sharing relationship possible. Also great for the failure-mode simulation (timeouts, rate limits, etc)
  - mappings folder with json stubs, PW API tests against mock
- Pact:
  - great for internal microservices your own org owns, where both sides can participate in the broker workflow. Pact is the tool for inter-team API correctness at scale.