import { useReducer, createContext, useEffect } from "react";
import { Reducer, UserInit } from "./reducer";

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(Reducer.reducer, UserInit);

  useEffect(() => {
    userDispatch({
      type: "CURRENT",
      state: userState,
      payload: {
        token: 123,
      },
    });
  }, [userState]);

  return (
    <UserDispatchContext.Provider value={userDispatch}>
      <UserContext.Provider value={userState}>{children}</UserContext.Provider>
    </UserDispatchContext.Provider>
  );
}

export default UserProvider;

// () => 2
// () => ()
// () => {}
