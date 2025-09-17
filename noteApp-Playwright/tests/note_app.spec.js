
const { test, expect, describe, beforeEach  } = require('@playwright/test')

const baseUrl = 'http://localhost:5173'

describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto(baseUrl)
  })

  test('front page can be opened', async ({ page }) => {  
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    // await page.getByRole('textbox').first().fill('TEST user')
    // await page.getByRole('textbox').last().fill('TEST password')
    await page.getByLabel('username').fill('TEST user')
    await page.getByLabel('password').fill('TEST password')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('TEST name logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByLabel('username').fill('TEST user')
    await page.getByLabel('password').fill('TEST password')
    await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })
})