
import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ',
  },
}, async ({ page }) => {
  await test.step('Login และตรวจสอบ Inventory', async () => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();
  });

  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    const backpack = page.locator('.inventory_item').filter({
      hasText: 'Sauce Labs Backpack',
    });

    const bikeLight = page.locator('.inventory_item').filter({
      hasText: 'Sauce Labs Bike Light',
    });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await bikeLight.getByRole('button', { name: 'Add to cart' }).click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('ตรวจสอบ Cart', async () => {
    await page.locator('.shopping_cart_link').click();

    await expect(
      page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })
    ).toBeVisible();

    await expect(
      page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' })
    ).toBeVisible();
  });

  await test.step('กรอก Checkout Information', async () => {
    await page.getByRole('button', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('50000');

    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await expect(
      page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })
    ).toBeVisible();

    await expect(
      page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Finish' }).click();
  });

  await test.step('ตรวจสอบ Order Complete', async () => {
    await expect(page).toHaveURL(/checkout-complete\.html/);

    await expect(
      page.getByText('Thank you for your order!', { exact: true })
    ).toBeVisible();
  });
});
