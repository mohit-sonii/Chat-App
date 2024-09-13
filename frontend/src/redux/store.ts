


import { configureStore } from "@reduxjs/toolkit";
import reducers from './reducer'

const store = configureStore({
   reducer: {
     'auth': reducers
   }
})

export default store