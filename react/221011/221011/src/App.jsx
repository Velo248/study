import { useEffect } from 'react';
import UserContext, { Context } from './userContext';

import './App.css';
import { useState } from 'react';
import { useContext } from 'react';

function App() {
  const [isUser, setIsUser] = useState(null)
  const { userSignOutEvent } = useContext(Context)
  useEffect(() => {
    setIsUser(localStorage)
  }, [isUser])

  const handleSingout = () => { //이거 작동을 안한다..
    userSignOutEvent()
  }

  return (
    <div className='appContainer'>
        <UserContext>
          <div>
            {localStorage.getItem("email")}
            {localStorage.getItem("token")}
            <button onClick={handleSingout}>로그아웃</button>
          </div>
        </UserContext>
    </div>

  );
}

export default App;
