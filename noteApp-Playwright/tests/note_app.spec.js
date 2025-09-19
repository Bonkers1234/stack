
const { test, expect, describe, beforeEach  } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

const user = {
    name: 'testName', 
    username: 'testUsername',
    password: 'testPassword'
  }

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: user
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {  
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    // await page.getByRole('button', { name: 'login' }).click()
    // // await page.getByRole('textbox').first().fill('TEST user')
    // // await page.getByRole('textbox').last().fill('TEST password')
    // await page.getByLabel('username').fill(user.username)
    // await page.getByLabel('password').fill(user.password)
    // await page.getByRole('button', { name: 'login' }).click()
    await loginWith(page, user.username, user.password)

    await expect(page.getByText('testName logged in')).toBeVisible()
  })

  test('login fails with wrong passowrd', async ({ page }) => {
    await loginWith(page, user.username, 'WRONG')

    const errorDiv = page.locator('.error')

    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText(`${user.name} logged in`)).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user.username, user.password)
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'another note by playwright')
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })
  })
})