import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    liked: (state, action) => {
      if(!state.user.movie){
        state.user.movie = [];
        state.user.movie.push(action.payload);
      } else {
        state.user.movie.push(action.payload);
      }
    },
    followed: (state, action) => {
      if(!state.user.person){
        state.user.person = [];
        state.user.person.push(action.payload);
      } else {
        state.user.person.push(action.payload);
      }
    },
    remove: (state, action) => {
      state.user.person.pop(action.payload);
    },
  },
});

export const { login, logout, liked, followed, remove } = userSlice.actions;

export default userSlice.reducer;
