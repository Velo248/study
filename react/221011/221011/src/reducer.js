const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const CURRENT = "CURRENT";
const Reducer = {};

const UserInit = {};
UserInit.token = null;
UserInit.email = null;

Reducer.reducer = function (state, action) {
  const { email, token } = action.payload;

  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        email: email,
        token: token,
      };
    }
    case SIGN_OUT:
      return {
        ...state,
        email: null,
        token: null,
      };
    case CURRENT:
      return {
        ...state,
        token: token,
      };
    default:
      return state;
  }
};

export { Reducer, UserInit };
