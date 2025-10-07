
import { createSlice } from '@reduxjs/toolkit'

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
    anecdotesSet(state, action) {
      return action.payload
    },
    anecdoteVote(state, action) {
      const defaultAnecdote = state.find(a => a.id === action.payload)
      const anecdoteChanged = {
        ...defaultAnecdote,
        votes: defaultAnecdote.votes + 1
      }

      return state.map(a => a.id !== anecdoteChanged.id ? a : anecdoteChanged)  
    },
    anecdoteCreate(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { anecdoteVote, anecdoteCreate, anecdotesSet } = anecdotesSlice.actions
export default anecdotesSlice.reducer