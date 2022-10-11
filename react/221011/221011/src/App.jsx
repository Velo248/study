import { useEffect } from 'react';
import UserContext, { Context } from './userContext';

import './App.css';
import { useState } from 'react';
import { useContext } from 'react';

function App() {
  const [isUser, setIsUser] = useState(null) //isUser를 div안에서 사용하고 싶은데 null이 지속발생한다. 시간차를 두어야하나?
  const { userSignOutEvent } = useContext(Context) //이렇게 들고오는 것이 잘못된건가?
  
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
