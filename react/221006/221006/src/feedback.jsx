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

    // const boardUpdateClickHandle = (key) => {
    //     const updateBoard = { ...boardList.find((board) => board.id === key) }
    //     updateBoard.title = window.prompt("새로운 제목", updateBoard.title)
    //     updateBoard.content = window.prompt("새로운 내용", updateBoard.content)

    //     const newArr = boardList.map(e => {
    //         if (e.id === updateBoard.id) {
    //             return new BoardType(updateBoard.id, updateBoard.title, updateBoard.content, updateBoard.user)
    //         }
    //         return e
    //     })

    //     setBoardList([...newArr])
    // }

    const handleFindBoardByKey = (key) => {
        const updateBoard = { ...boardList.find((board) => board.id === key) }
        return updateBoard
    }
    
    const handleFlagCloseChange = (checked) => () => setIsEditMode(checked)
    
    const handleFindbyKey = (list) => () => {
        setIsEditMode((prev) => !prev)
        setUpdateKey(list.id)
    }

    const handleCancelClick = () => {
        setIsEditMode(prev => !prev)
    }

    const handleUpdateSubmit = (data) => (e) => {
        e.preventDefault()
        setBoardList(prev => {
            prev.map((p) => {
                if(p.id === updateKey) {
                    return {
                        id: updateKey,
                        title: data.title,
                        content: data.content
                    }
                } else {
                    return p
                }
            })
        })
        console.log(boardList)
        debugger
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
                    여기 form을 컨트롤할 때는 form 태그를 사용하는게 좋음
                    form을 쓰면 button click시 button의 type은 submit
                    input은 value와 name 속성을 넣어주는 것이 좋음
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
                // <Update 
                //     data={handleFindBoardByKey(boardValue.editKey)}
                //     onFlagChangeEvent={handleFlagCloseChange(false)}
                //     />
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

// const Update = ({data, onFlagChangeEvent}) => {
//     const { id, title, content, user } = data

//     return (
//         <div>
//             <p>{title}</p>
//             <p>{content}</p>
//             <button onClick={onFlagChangeEvent()}>취소</button>
//         </div>
//     )
// }

const Update2 = ({ boardList, updateKey, onCancelButtonEvent, onSubmitEvent }) => {
    const data = Object.assign({}, boardList.find((b) => b.id === updateKey))
    const [updateState, setUpdateState] = useState({
        title: data.title,
        content: data.content
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateState(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <form onSubmit={onSubmitEvent(updateState)}>
            <p>{data.title}</p>
            <p>{data.content}</p>
            <input name="title" value={updateState.title} onChange={handleChange} />
            <input name="content" value={updateState.content} onChange={handleChange} />
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