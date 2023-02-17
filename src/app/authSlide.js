const { createSlice } = require('@reduxjs/toolkit');

const initState = {
  user: null,
  error: false,
};

const auth = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    logInSuccess: (state, action) => {
      return { user: action.payload, error: false };
    },
    logInFail: (state, action) => {
      return { user: null, error: true };
    },
    logOut: (state, action) => {
      return { user: null, error: false };
    },
  },
});
const { reducer, actions } = auth;
export const { logInSuccess, logInFail, logOut } = actions;
export default reducer;
