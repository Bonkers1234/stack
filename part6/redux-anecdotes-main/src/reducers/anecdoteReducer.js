
import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'VOTE': {
//       const defaultAnecdote = state.find(a => a.id === action.payload.id)
//       const anecdoteChanged = {
//         ...defaultAnecdote,
//         votes: defaultAnecdote.votes + 1
//       }

//       return state.map(a => a.id !== anecdoteChanged.id ? a : anecdoteChanged)
//     }
//     case 'CREATE': {
//       return state.concat(asObject(action.payload.content))
//     }
//     default:
//       return state
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'CREATE',
//     payload: {
//       content
//     }
//   }
// }

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id
//     }
//   }
// }

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
    vote(state, action) {
      // const defaultAnecdote = state.find(a => a.id === action.payload)
      // const anecdoteChanged = {
      //   ...defaultAnecdote,
      //   votes: defaultAnecdote.votes + 1
      // }

      return state.map(a => a.id !== action.payload.id ? a : action.payload)  
    },
    create(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { vote, create, set } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(set(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(anecdote)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (newObject) => {
  return async dispatch => {
    const anecdoteToUpdate = {
      ...newObject,
      votes: newObject.votes + 1
    }
    const updatedAnecdote = await anecdotesService.vote(anecdoteToUpdate)
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdotesSlice.reducer