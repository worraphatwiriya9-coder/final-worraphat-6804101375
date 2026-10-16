
import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ',
  },
}, async ({ page }) => {
  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);

    const backpack = page.locator('.inventory_item').filter({
      hasText: 'Sauce Labs Backpack',
    });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });

  await test.step('ตรวจสอบ Last Name is required', async () => {
    await page.locator('[data-test="firstName"]').fill('John');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');
  });

  await test.step('ตรวจสอบ Postal Code is required', async () => {
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    await page.locator('[data-test="postalCode"]').fill('50000');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await expect(
      page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page).toHaveURL(/checkout-complete\.html/);

    await expect(
      page.getByText('Thank you for your order!', { exact: true })
    ).toBeVisible();
  });
});
