import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages:[],
    loading:false,
    error:null,
    hasMore:true,
    page:1
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        addMessage:(state,action) => {
            state.messages.push(action.payload)
        },
        setMessages:(state,action) => {
            state.messages = action.payload;            
        },
        addMessages:(state,action)=>{
            state.messages.unshift(...action.payload);
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload;
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setError:(state,action)=>{
            state.error = action.payload;
        },
        incrementPage: (state) => {
            state.page += 1;
        },
        resetPage: (state) => {
            state.page = 1;
        },
        clearChat: (state) => {
            state.messages = [];
            state.page = 1;
            state.hasMore = true;
            state.error = null;
        }
    }
})

export const {
  addMessage,
  setMessages,
  addMessages,
  setLoading,
  setError,
  setHasMore,
  incrementPage,
  resetPage,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;