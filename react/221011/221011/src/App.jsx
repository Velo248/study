import { UserContext, UserDispatchContext } from "./feedbackContext";
import "./App.css";
import { useContext, useState } from "react";
import axios from "axios";

function App() {
  const userData = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  console.log(userData);
  const valueChangeHandle = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const userObj = {};
    userObj.email = formValue.email;
    userObj.password = formValue.password;
    userObj.token = 12345;
    sessionStorage.setItem("token", userObj.token);
    dispatch({
      type: "SIGN_IN",
      state: userData,
      payload: userObj,
    });
  };

  const handleSignOut = () => {
    const userObj = {};
    userObj.email = null;
    userObj.password = null;

    dispatch({
      type: "SIGN_OUT",
      state: userData,
      payload: userObj,
    });
    sessionStorage.clear();
  };

  return (
    <>
      {userData.token !== null ? (
        <>
          <div>{userData.email}</div>
          <div>{userData.token}</div>
          <button onClick={handleSignOut}>로그아웃</button>
        </>
      ) : (
        <div className="formContainer">
          <form onSubmit={handleSignin}>
            <input
              type="text"
              name="email"
              value={formValue.email}
              onChange={valueChangeHandle}
            ></input>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={valueChangeHandle}
            ></input>
            <button type="submit">로그인</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;

const checkUser = async (obj) => {
  const response = await axios.get("/userData.json");
  const { users } = response.data;
  const findUser = users.find((e) => e.email === obj.email) ?? null;
  if (!findUser) return { message: "그런 사람없다", code: false };
  if (findUser.password !== obj.password)
    return { message: "비번 틀렸다", code: false };

  const checkedUser = {};
  checkedUser.token = Math.floor(Math.random() * 10000);
  checkedUser.email = findUser.email;
  return { message: "로그인 성공", code: true, checkedUser };
};
