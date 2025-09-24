
const loginWith = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title').fill(blog.title)
  await page.getByLabel('author').fill(blog.author)
  await page.getByLabel('url').fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${blog.title} - ${blog.author} `).waitFor()
}

const likeBlog = async (page, text, likesNumber) => {
  // await page.getByRole('button', { name: 'view' }).click()
  await page.getByText(`${text}`).getByRole('button', { name: 'view' }).click()
  const likeButton = await page.getByText(`${text}`).locator('..').getByRole('button', { name: 'like' })
  for(let i = 0; i < likesNumber; i++) {
    await likeButton.click()
    await page
      .getByText(text)
      .locator('..')
      .getByText(`likes ${i + 1}`).waitFor()
  }
}

export { loginWith, createBlog, likeBlog }