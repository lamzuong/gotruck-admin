const { createSlice } = require('@reduxjs/toolkit');

const initState = {
  user: null,
};

const auth = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    logInSuccess: (state, action) => {
      return { user: action.payload };
    },
    logOut: (state, action) => {
      return { user: null };
    },
  },
});
const { reducer, actions } = auth;
export const { logInSuccess, logOut } = actions;
export default reducer;
