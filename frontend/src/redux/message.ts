
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   message: [],
   chat: null
}

const messageSlice = createSlice({
   name: 'message',
   initialState,
   reducers: {
      currentMessages: (state, action) => {
         if (action.payload) {
            state.message = action.payload
         }
      },
      currentChat: (state, action) => {
         if (action.payload) {
            state.chat = action.payload
         }
      }
   }
})

export const { currentMessages, currentChat } = messageSlice.actions

export default messageSlice.reducer