import { useState } from "react";
import { useReducer } from "react";
import { Reducer, UserInit } from "./reducer";
import axios from "axios";
import { createContext } from "react";
import { useEffect } from "react";

export const Context = createContext({})

function UserContext ({ children }) {
    //임마는 이메일이랑 토큰만 들고있기
    const [userState, dispatch] = useReducer(
        Reducer.reducer,
        UserInit
    )

    const [isUser, setIsUser] = useState(null)

    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })

    const valueChangeHandle = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value,
        })
    }
    const checkUser = async (obj) => {
        return axios.get("/userData.json")
            .then(response => response.data)
            .then(data => {
                const { users } = data
                const findUser = users.find(e => e.email === obj.email) ?? null
                if(!findUser) 
                    return { message: "그런 사람없다", code: false }
                if(findUser.password !== obj.password) 
                    return { message: "비번 틀렸다", code: false }

                const checkedUser = {}
                
                checkedUser.token = Math.floor(Math.random() * 10000)
                checkedUser.email = findUser.email

                return { message: "로그인 성공", code: true, checkedUser}
            })
    }

    const handleSigninClick = async (e) => {
        e.preventDefault()
        const userObj = {}
        userObj.email = formValue.email
        userObj.password = formValue.password
        
        const response = await checkUser(userObj)
        if(!response.code) {
            return alert(response.message)
        }

        const userHasTokenObj = {}
        userHasTokenObj.email = response.checkedUser.email
        userHasTokenObj.token = response.checkedUser.token

        dispatch({
            type: "SIGN_IN",
            state: userState,
            action: userHasTokenObj
        })

        localStorage.setItem("email", userHasTokenObj.email)
        localStorage.setItem("token", userHasTokenObj.token)
    }

    const userSignOutEvent = () => { //얘를 어케 보내주지??
        console.log("tt")
        const obj = {}
        obj.email = null
        obj.token = null

        dispatch({
            type: "SIGN_OUT",
            state: userState,
            action: obj
        })

        localStorage.clear()
    }

    useEffect(() => {
        setIsUser(localStorage.length)
    }, [isUser])

    const 어케올리는걸까 = {
        userSignOutEvent, dispatch
    }
    return (
        <Context.Provider value={어케올리는걸까}>
            {!isUser ? (
                <div className="mainContainer">
                    <div className="contextContainer">
                        <form onSubmit={handleSigninClick}>
                            <label htmlFor='email'>이메일</label>
                            <input type='text' name='email' value={formValue.email} onChange={valueChangeHandle}></input>
                            <label htmlFor='password'>비밀번호</label>
                            <input type='password' name='password' value={formValue.password} onChange={valueChangeHandle}></input>
                            <button type='submit'>로그인</button>
                        </form>
                    </div>
                </div>
            ) : (
                children //이친구가 app에 div를 가르키는게 아닌가?
            )}
        </Context.Provider>
    )
}

export default UserContext