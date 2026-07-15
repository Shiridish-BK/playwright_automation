// SERVICE VIRTUALIZATION DEMO using WIREMOCK
// see README.MD for info on setting up wiremock, and starting the server before running these tests

import { test, expect } from '@playwright/test';

const VALID_AUTH = { Authorization: 'Bearer valid-test-token' };
const URL = 'http://localhost:8089/v1/payments';

test.describe('Payment gateway integration w/ Wiremock stub', () => {
    test('successful payment returns 201', async ({ request }) => {
        const resp = await request.post(URL, {
            headers: VALID_AUTH,
            data: { amount: 5000, currency: 'USD' },
        });

        expect(resp.status()).toBe(201);
        const body = await resp.json();
        expect(body.status).toBe('succeeded');

    })

    test('invalid bearer token returns 401 unauthorized', async ({ request }) => {
        const res = await request.post(URL, {
            headers: { Authorization: 'Bearer wrong-token' },
            data: { amount: 5000, currency: 'USD' },
        });

        expect(res.status()).toBe(401);
        const body = await res.json();
        expect(body.error).toBe('unauthorized');
    });

    test('rate limiting returns 429 with Retry-After header', async ({ request }) => {
        const res = await request.post(URL, {
            headers: { ...VALID_AUTH, 'X-Scenario': 'rate-limit' },
            data: { amount: 5000, currency: 'USD' },
        });

        expect(res.status()).toBe(429);
        expect(res.headers()['retry-after']).toBe('2');
        const body = await res.json();
        expect(body.error).toBe('rate_limited');

    });

    test('oversized amount is declined with a business-logic 422', async ({ request }) => {
        const res = await request.post('http://localhost:8089/v1/payments', {
            headers: VALID_AUTH,
            data: { amount: 5_000_000, currency: 'USD' },
        });

        expect(res.status()).toBe(422);
        const body = await res.json();
        expect(body.decline_code).toBe('insufficient_funds');
    });

    test('slow dependency triggers a client-side timeout, not a hang', async ({ request }) => {
        // WireMock delays 8s. We assert our own client gives up at 3s —
        // this is the actual thing under test: do WE fail fast, not whether
        // the mock is slow.
        await expect(
            request.post('http://localhost:8089/v1/payments', {
                headers: { ...VALID_AUTH, 'X-Scenario': 'timeout' },
                data: { amount: 5000, currency: 'USD' },
                timeout: 3000,
            })
        ).rejects.toThrow(/Timeout/i);
    });
});