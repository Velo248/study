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
    const [isEditMode, setIsEditMode] = useState(false)
    const [boardValue, setBoardValue] = useState({
        title: "",
        content: "",
        editKey: "",
    })
    const [updateKey, setUpdateKey] = useState(null)

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

    const handleCreateBoard = (e) => {
        e.preventDefault()
        const newBoard = new BoardType(Math.floor(Math.random() * 10000), boardValue.title, boardValue.content, userData)
        setBoardList([...boardList, newBoard])

        setBoardValue({ ...boardValue, title: "", content: "" })
    }

    const boardClickHandle = (data) => () => {
        if (window.confirm("삭제?")) {
            const deletedArr = boardList.filter(e => e.id !== data.id)
            setBoardList(deletedArr)
        }
    }
    
    const handleFindbyKey = (list) => () => {
        setIsEditMode((prev) => !prev)
        setUpdateKey(list.id)
    }

    const handleCancelClick = () => {
        setIsEditMode(prev => !prev)
    }

    const handleUpdateSubmit = (data) => (e) => {
        e.preventDefault()
        handleCancelClick()
        const newArr = boardList.map(e => {
            if(e.id === data.id) {
                return new BoardType(data.id, data.title, data.content, userData)
            }
            return e
        })

        setBoardList([...newArr])
    }

    return (
        <div className='mainContainer'>
            {!isEditMode ? 
                (<div>
                    <div className='boardContainer'>
                        {boardList.map((lists => (
                        <div className='board' key={lists.id}>
                            <p>제목: {lists.title}</p>
                            <p>내용: {lists.content}</p>
                            <p>쓴놈: {lists.user.username}</p>
                            <button onClick={boardClickHandle(lists)}>삭제</button>
                            <button onClick={handleFindbyKey(lists)}>수정</button>
                        </div>
                        )))}
                    </div>
                    <div className='inputContainer'>
                        <form onSubmit={handleCreateBoard}>
                            <label htmlFor='title'>제목입력</label>
                            <input type='text' name='title' value={boardValue.title} onChange={valueChangeHandle}></input>
                            <label htmlFor='title'>내용입력</label>
                            <input type='text' name='content' value={boardValue.content} onChange={valueChangeHandle}></input>
                            <button type='submit'>새로운 글</button>
                        </form>
                    </div>
                </div>
            ) : (
                <Update2 
                    boardList={boardList} 
                    updateKey={updateKey} 
                    onCancelButtonEvent={handleCancelClick} 
                    onSubmitEvent={handleUpdateSubmit} 
                />
            )}
        </div>
    );
}

const Update2 = ({ boardList, updateKey, onCancelButtonEvent, onSubmitEvent }) => {
    const data = { ...boardList.find((board) => board.id === updateKey) }
    const [updateState, setUpdateState] = useState({
        title: data.title,
        content: data.content,
        id: data.id,
    })

    const valueChangeHandle = (e) => {
        setUpdateState({
            ...updateState,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={onSubmitEvent(updateState)}>
            <p>{data.title}</p>
            <p>{data.content}</p>
            <input name="title" value={updateState.title} onChange={valueChangeHandle} />
            <input name="content" value={updateState.content} onChange={valueChangeHandle} />
            <button onClick={onCancelButtonEvent}>취소</button>
            <button type="submit">Submit</button>
        </form>
    )
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