
const { test, describe, beforeEach, expect } = require('@playwright/test')
const { loginWith } = require('./helper')

const user = {
  name: 'testName',
  username: 'testUsername',
  password: 'testPassword'
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: user
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // login prototype before 'loginWith' consolidation
      await page.getByLabel('username').fill(user.username)
      await page.getByLabel('password').fill(user.password)
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText(`${user.name} logged in `)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, user.username, 'WRONG')

      const errorDiv = page.locator('.error')

      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText(`${user.name} logged in `)).not.toBeVisible()
    })
  })
})
