module.exports = {
    testDir: './tests',
    timeout: 30000,
    retries: 1,
    use:{
        baseURL: 'https://example.com',
        headless: true,
        screenshot: 'only-on-failure',
    },
    reporter: [['html']],
};