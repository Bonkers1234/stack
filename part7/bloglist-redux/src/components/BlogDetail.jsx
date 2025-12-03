import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog } from '../reducers/blogsReducer'
import { Form, Button, InputGroup, Container, Row, Col } from 'react-bootstrap'


const BlogDetail = ({ user, handleLikes, handleDelete }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find(b => b.id === id))

  if(!user || !blog) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(commentBlog(blog.id, { comment }))
    setComment('')
  }

  const canRemove = user.username === blog.user.username

  return (
    <div>
      <div>
        <h2>{blog.title} - by {blog.author}</h2>
        <div>
          <a href={`https://${blog.url}`}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {canRemove && <button onClick={() => handleDelete(blog)}>delete</button>}
      </div>
      <div>
        <h3>Comments:</h3>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={3}>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <InputGroup className='my-1'>
                    <Form.Control type='text' value={comment} onChange={({ target }) => setComment(target.value)} />
                    <Button variant='primary' type='submit'>add comment</Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
        {blog.comments && <ul>
          {blog.comments.map(c => <li key={c}>{c}</li>)}
        </ul>}
      </div>
    </div>
  )
}

export default BlogDetail