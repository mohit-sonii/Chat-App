


import { configureStore } from "@reduxjs/toolkit";
import reducers from './auth'
import messageReducer from './message'

const store = configureStore({
   reducer: {
      'auth': reducers,
      'message': messageReducer
   }
})

export default store