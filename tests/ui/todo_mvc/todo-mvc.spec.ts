import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
});

const TODO_ITEMS = [
    "First item",
    "second item",
    "third item"
];

test.describe('Create', () => {
    test('add new todo item', async ({ page }) => {
        addTodo(page, TODO_ITEMS[0]);

        // Verify one item in list
        await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS[0]);

        //Add another item
        addTodo(page, TODO_ITEMS[1]);
        //verify two items in list
        await expect(page.getByTestId('todo-title')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);

        //verify localstorage
        await verifyLocalStorageCount(page, 2)
    });

    test('input field should be cleared after adding item', async ({ page }) => {
        await addTodo(page, TODO_ITEMS[0]);

        await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty();

    });

    test('should append at the bottom of list', async ({ page }) => {
        await addTodo(page, TODO_ITEMS[0]);
        await addTodo(page, TODO_ITEMS[1]);
        await addTodo(page, TODO_ITEMS[2]);

        await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
    })
});


test.describe('mark all as complete', () => {
    //Before
    test.beforeEach(async ({ page }) => {
        await addAllDefaultTodos(page, TODO_ITEMS);
    });

    test('mark all complete should check all items', async ({ page }) => {
        //click mark all complete checkbox
        await page.getByLabel('Mark all as complete').click();

        //verify all items are commpelted
        await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);

        await verifyCompletedLocalStorageCount(page, 3);
    })

    test('complete all checkbox state should update based on items checked status', async ({ page }) => {
        const markAllChkbox = page.getByLabel("Mark all as complete");
        await markAllChkbox.check();
        await expect(markAllChkbox).toBeChecked();
        await verifyCompletedLocalStorageCount(page, 3);

        //uncheck a todo
        await page.getByLabel('Toggle Todo').nth(0).uncheck();

        await expect(markAllChkbox).not.toBeChecked();

    });
});

test.describe('Editing', () => {
    test.beforeEach(async ({ page }) => {
        await addAllDefaultTodos(page, TODO_ITEMS);
    });

    test('able to edit', async ({ page }) => {
        //edit row one
        await page.getByTestId('todo-title').nth(0).dblclick();
        await page.getByLabel('Edit').nth(0).fill('edited first');

        await expect(page.getByTestId('todo-title').nth(0)).toHaveText('edited first');
    });
});




// HELPERS
async function addTodo(page: Page, item: string) {
    const inputNewTodo = page.getByPlaceholder('What needs to be done?');
    await inputNewTodo.fill(item);
    await inputNewTodo.press('Enter');
}

async function addAllDefaultTodos(page: Page, defaultList: string[]): Promise<void> {
    for (const item of defaultList) {
        await addTodo(page, item);
    }
}

async function verifyLocalStorageCount(page: Page, expected: number): Promise<void> {
    await page.waitForFunction((expectedPrm) => {
        //comparision needs to happen inside the polled function so it retries until matched upto timeout
        return JSON.parse(localStorage['react-todos']).length === expectedPrm;
    }, expected);
}

async function verifyCompletedLocalStorageCount(page: Page, expected: number): Promise<void> {

    await page.waitForFunction((exp) => {
        return JSON.parse(localStorage['react-todos']).filter((item: any) => item.completed === true).length === exp;
    }, expected);
}
