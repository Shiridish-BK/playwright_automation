# npm install --save-dev wiremock
# create wiremock mappings folder
- Wiremock looks for 'mappings' folder
# Start Wiremock: 
- npx wiremock --port 8089 --root-dir src/wiremock
# Check the Admin API
- curl http://localhost:8089/__admin/mappings
# Invoke API (powershell)
- Invoke-RestMethod -Uri "http://localhost:8089/v1/payments" -Method Post -Headers @{ "Authorization" = "Bearer valid-test-token" } -ContentType "application/json" -Body '{"amount": 5000, "currency": "USD"}'
# Reload Wiremock fresh from mappings folder after any new changes or files additions
- Invoke-RestMethod -Uri "http://localhost:8089/__admin/reset" -Method Post
# For error scenarios
`try {
    Invoke-RestMethod -Uri "http://localhost:8089/v1/payments" -Method Post -Headers @{ "Authorization" = "Bearer wrong-token" } -ContentType "application/json" -Body '{"amount": 5000, "currency": "USD"}'
} catch {
    $_.Exception.Response.StatusCode
    $_.ErrorDetails.Message
}`

---
# Some key parameters
- urlPath
- url
- urlPattern

- equalTo
- doesNotMatch

- priority

- fixedDelayMilliseconds 