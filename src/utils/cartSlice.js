import {createSlice} from '@reduxjs/toolkit'

const cartSlice=createSlice({
  name: 'cart',
  initialState:{
    items:['apple','banana']
  },
  reducers:{
    addItem: (state, action)=>{
      state.items.push(action.payload)
    },
    removeItem: (state, action)=>{
      state.items.pop(action.payload)
    },
    clearItems:(state, action)=>{
      state.items=[]
    }
  }
})


export const {addItem, removeItem, clearItems}=cartSlice.actions;
  
export default cartSlice.reducer;