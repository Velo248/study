import './App.css';
import { useEffect, useState } from 'react';

//test data
const dev = [
  {
    id: Math.floor(Math.random() * 10000),
    title: "park",
    content: "블라블라블라1"
  },
  {
    id: Math.floor(Math.random() * 10000),
    title: "jae",
    content: "블라블라블라2"
  },
  {
    id: Math.floor(Math.random() * 10000),
    title: "hyun",
    content: "블라블라블라3"
  }
]

function App() {
  const [boardList, setBoardList] = useState([])
  const [userData, setUserData] = useState([])

  const [boardValue, setBoardValue] = useState({
    title: "",
    content: "",
  })

  const valueChangeHandle = (e) => {
    setBoardValue({
      ...boardValue,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const user = new User("temp-id-01", "velo")
    const board = initBorad(user)
    setUserData(user)
    setBoardList(board)
  }, [])


  //와씨 이거 안돼서 구글링 한참했다;;
  //해결 못한 문제, 추가하고나서 input을 빈내용으로 초기화하려는데 감이 안온다.
  const createHandle = () => {
    const newBoard = new BoardType(Math.floor(Math.random() * 10000), boardValue.title, boardValue.content, userData)
    setBoardList([...boardList, newBoard])
  }

  const boardClickHandle = (key) => {
    if(window.confirm("삭제?")) {
      const deletedArr = boardList.filter(e => e.id !== key)
      setBoardList(deletedArr)
    }
  }

  //주소를 바로 참조하는 걸로 아는데, 이거 바로 바꿔도 되나?
  const boardUpdateClickHandle = (key) => {
    const updateBoard = [...boardList.filter(e => e.id === key)]
    updateBoard[0].title = window.prompt("새로운 제목", updateBoard[0].title)
    updateBoard[0].content = window.prompt("새로운 내용", updateBoard[0].content)
    setBoardList([...boardList])
  }

  /*
  *원래 수정누르면 값 수정하는 input만들어 주려고 했는데 결국 실패, 감이 안옴
  
  const Update = (key) => {
    const updateBoard = boardList.filter(e => e.id === key)
    return (
      <div className='inputContainer'>
        <label htmlFor='title'>제목입력</label>
        <input type='text' name='updateTitle' placeholder={updateBoard.title} value={boardValue.updateTitle} onChange={valueChangeHandle}></input>
        <label htmlFor='title'>내용입력</label>
        <input type='text' name='updateContent' placeholder={updateBoard.content} value={boardValue.updateContent} onChange={valueChangeHandle}></input>
        <button onClick={createHandle}>새로운 글</button>
    </div>
    )
  }
  */

  return (
    <div className='mainContainer'>
      <div className='boardContainer'>
        {boardList.map((lists => (
          <div className='board' key={lists.id}>
            <p>제목: {lists.title}</p>
            <p>내용: {lists.content}</p>
            <p>쓴놈: {lists.user.username}</p>
            <button onClick={e => boardClickHandle(lists.id)}>삭제</button>
            <button onClick={e => boardUpdateClickHandle(lists.id)}>수정</button>
          </div>
        )))}
      </div>
      <div className='inputContainer'>
        <label htmlFor='title'>제목입력</label>
        <input type='text' name='title' value={boardValue.title} onChange={valueChangeHandle}></input>
        <label htmlFor='title'>내용입력</label>
        <input type='text' name='content' value={boardValue.content} onChange={valueChangeHandle}></input>
        <button onClick={createHandle}>새로운 글</button>
      </div>
    </div>
  );
}

export default App;

class User {
  constructor(userId, username) {
    ErrorUtil.invalidVariable([userId, username].every(v => v))
    ErrorUtil.invalidType([userId, username], "string")

    this.id = userId
    this.username = username
  }
}

class BoardType {
  constructor(id, title, content, user) {
    ErrorUtil.invalidVariable([title, content, user].every(v => v))
    ErrorUtil.invalidType([title, content], "string")

    this.id = id
    this.title = title
    this.content = content
    this.user = user
  }
}

//useEffect에 그냥 쓸까했는데 한줄이 이뻐서 뺌ㅋㅋ
function initBorad(user) {
  const arr = []
  dev.forEach(e => {
    arr.push(new BoardType(e.id, e.title, e.content, user))
  })

  return arr
}

const ErrorUtil = {
  invalidVariable: function (e) {
    if (!e) {
      console.log("Empty")
    }
  },
  
  invalidType: function (e, type) {
    e.forEach((element) => {
      if (!(typeof element === type)) {
        console.log("invalid type");
      }
    });
  },
}