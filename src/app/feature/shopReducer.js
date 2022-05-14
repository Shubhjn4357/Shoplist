import { createSlice } from '@reduxjs/toolkit'
import {DummyData} from "../dummyData";
export const counterSlice = createSlice({
  name: 'shoplist',
  initialState: {
    value:DummyData,
    selected:[],
  },
  reducers: {
    AddShop: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload)
    },
    DeleteShop: (state,action) => {
      state.value=state.value.filter((item)=>{
          return item.id!==action.payload
        })
   
    },
    EditShop:(state,action)=>{
      state.selected=state.value.filter((item)=>{
          return item.id===action.payload
        })
    },
    SaveShop:(state,action)=>{
      const index=state.value.findIndex(x=>x.id===action.payload.id)
      state.value[index]=action.payload;
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { AddShop, DeleteShop,EditShop,SaveShop} = counterSlice.actions

export default counterSlice.reducer