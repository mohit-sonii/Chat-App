import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { conversationData } from '@/utils/interface'

interface InitialValues {
   authenticated: boolean
   userData: conversationData | null
}

const initialState: InitialValues = {
   authenticated: false,
   userData: null
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login: (state, action: PayloadAction<conversationData | null>) => {
         state.authenticated = true
         state.userData = action.payload
      },
      logout: (state) => {
         state.authenticated = false
         state.userData = null
      },
      currentUser: (state, action: PayloadAction<conversationData | null>) => {
         if (action.payload) {
            state.authenticated = true
            state.userData = action.payload
         }
      },

   }
})

export const { login, logout, currentUser } = authSlice.actions

export default authSlice.reducer