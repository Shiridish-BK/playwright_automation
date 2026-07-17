# Tech Stack
- Playwright
- Typescript
- Wiremock (Service Virtualization)
- Cucumber.js (BDD)

# Running tests
- To run all UI tests, run `npx playwright test --project=ui`
- To run all API tests, first enable WireMock server.
  - first run `npx wiremock --port 8089 --root-dir src/wiremock`
  - next `npx playwright test --project=api`
- To run feature files, `npm run test:bdd`