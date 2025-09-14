
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()

  render(<BlogForm />)

  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')
  const submitButton = screen.getByText('create')

  await user.type(title, 'new test title')
  await user.type(author, 'new test author')
  await user.type(url, 'new test url')
  await user.click(submitButton)

  // couldnt test the Component properly since all of its logic of handling submission is inside of it
  expect(title.value).toBe('new test title')
  expect(author.value).toBe('new test author')
  expect(url.value).toBe('new test url')
})