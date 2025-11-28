
import axios from 'axios'
const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: localStorage.getItem('loggedBlogappUser')
        ? `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        : null
    }
  }
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response.data
}

const addComment = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config())
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  addComment
}