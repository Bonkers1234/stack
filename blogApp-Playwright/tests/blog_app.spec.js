
const { test, describe, beforeEach, expect } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user.username, user.password)
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('first title')
      await page.getByLabel('author').fill('first author')
      await page.getByLabel('url').fill('first url')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('first title - first author ')).toBeVisible()
    })

    test('user can like a blog', async ({ page }) => {
      await createBlog(page, { title: 'first title', author: 'first author', url: 'first url' })
      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByText('likes 0 ')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      
      await expect(page.getByText('likes 1 ')).toBeVisible()
    })

    test('user can delete his blog', async ({ page }) => {
      await createBlog(page, { title: 'first title', author: 'first author', url: 'first url' })
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('first title - first author ')).toBeVisible()


      await page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'delete' }).click()

      await expect(page.getByText('first title - first author ')).not.toBeVisible()
    })

    test('delete button is only visible to the creator', async ({ page, request }) => {
      await createBlog(page, { title: 'first title', author: 'first author', url: 'first url' })
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('first title - first author ')).toBeVisible()
      
      await page.getByRole('button', { name: 'logout'}).click()
      await request.post('http://localhost:3001/api/users', {
        data: {
          name: 'testName2', 
          username: 'testUsername2',
          password: 'testPassword2'
        }
      }) 

      await loginWith(page, 'testUsername2', 'testPassword2')

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, { title: 'first title', author: 'first author', url: 'first url' })
        await createBlog(page, { title: 'second title', author: 'second author', url: 'second url' })
        await createBlog(page, { title: 'third title', author: 'third author', url: 'third url' })
      })

      test('blogs are sorted according to number of likes', async ({ page }) => {
        await likeBlog(page, 'third title - third author ', 3)
        await likeBlog(page, 'second title - second author ', 2)
        await likeBlog(page, 'first title - first author ', 1)

        await expect(
          page
            .getByText('third title - third author ')
            .locator('..')
            .getByText('likes 3 ')
        ).toBeVisible()
        await expect(
          page
            .getByText('second title - second author ')
            .locator('..')
            .getByText('likes 2 ')
        ).toBeVisible()
        await expect(
          page
            .getByText('first title - first author ')
            .locator('..')
            .getByText('likes 1 ')
        ).toBeVisible()

        const titles = await page.getByRole('button', { name: 'hide' }).all()

        for(let i = 0; i < titles.length; i++) {
          await expect(titles[i].locator('..').getByText(`likes ${titles.length - i} `)).toBeVisible()
        }
      })
    })
  })
})
