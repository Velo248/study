import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [userData, setUserData] = useState([])
  const [userFriend, setUserFriend] = useState([])

  useEffect(() => {
    (async () => {
      const user = await getUser()
      setUserData(user)
      setUserFriend(user[0].friends)
    })()
  }, [])

  return (
    <div>
      <div className='profileContainer'>
        {userData.map((e => (
          <div className='profile' key={e.id}>
            <p>{e.username}</p>
            <p>{e.age}</p>
            <p>{e.id}</p>
          </div>
        )))}
      </div>
      <div className='friendsContainer'>
        {userFriend.map((e) => (
          <div className='friend' key={e.id}>
            <p>{e.username}</p>
            <p>{e.age}</p>
            <p>{e.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

async function getUser() {
  const response = await axios.get("/users.json")
  const { user } = await response.data
  const my = new UserType(user.id, user.username, user.age, user.friends, user.originId)
  const arr = []
  arr.push(my)

  return arr
}

class UserType {
  constructor(id, username, age, friends, originId) {
    this.id = id
    this.username = username
    this.age = age
    this.friends = friends
    this.originId = originId
  }
}