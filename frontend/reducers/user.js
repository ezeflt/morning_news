import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    /**
     * Description :
     * add user to user local storage
     * 
     * @param {object} state the local storage value
     * @param {any} action the User that the user wants to add
     */
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },

    /**
     * Description :
     * clear the local storage
     * 
     * @param {object} state value local storage
     */
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
