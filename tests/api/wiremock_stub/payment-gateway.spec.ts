// SERVICE VIRTUALIZATION DEMO using WIREMOCK
// see README.MD for info

import { test, expect } from '@playwright/test';

const VALID_AUTH = { Authorization: 'Bearer valid-test-token' };

test.describe('Payment gateway integration w/ Wiremock stub', () => {
    test('successful payment gives 201', async ({ request }) => {
        const resp = await request.post('http://localhost:8089/v1/payments', {
            headers: VALID_AUTH,
            data: {amount: 5000, currency: 'USD'},
        });

        expect(resp.status()).toBe(201);
    })
});