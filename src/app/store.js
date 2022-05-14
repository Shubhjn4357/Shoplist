import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './feature/shopReducer'


export default configureStore({
  reducer: {
    shoplist:shopReducer,
},
})