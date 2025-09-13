
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> ', () => {
  const blog = {
    title: 'test title', 
    author: 'test author', 
    url: 'testUrl.com',
    likes: 5,
    user: {
      id: '123',
      username: 'testUsername',
      name: 'testName'
    }
  }

  const user = {
      id: '123',
      username: 'testUsername',
      name: 'testName'
    }

  test('displays only Title and Author by default', () => {
    render(<Blog blog={blog} user={user} />)

    const title = screen.queryByText('test title')
    const author = screen.queryByText('test author')
    const url = screen.queryByText('testUrl.com')
    const likes = screen.queryByText('5')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('when detail are shown, Url and Likes are rendered', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} user={user} />)

    const showButton = screen.getByText('view')
    await user.click(showButton)

    const url = screen.queryByText('testUrl.com')
    const likes = screen.queryByText('likes 5')

    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('if likeButton is clicked twice, event handler receives 2 calls', async () => {
    const user = userEvent.setup()
    const likeHandler = vi.fn()

    render(<Blog blog={blog} user={user} handleLikes={likeHandler} />)

    const showButton = screen.getByText('view')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
