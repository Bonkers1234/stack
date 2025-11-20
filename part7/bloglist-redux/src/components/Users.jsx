
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUsers())
  },[dispatch])

  const users = useSelector(({ users }) => users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td><strong>Users</strong></td>
            <td><strong>blogs created</strong></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users