const { createSlice } = require('@reduxjs/toolkit');

const initState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const auth = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    logInSuccess: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { user: JSON.parse(localStorage.getItem('user')) };
    },
    logOut: (state, action) => {
      localStorage.removeItem('user');
      return { user: null };
    },
  },
});
const { reducer, actions } = auth;
export const { logInSuccess, logOut } = actions;
export default reducer;
