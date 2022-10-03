const userType = []
const userFriend = []

const container = document.getElementById("container")
const myProfile = document.getElementById("myProfile")
const friendList = document.getElementById("friendList")

async function getUser() {
    const res = await fetch("./users.json")
    const response = await res.json()
    const { user } = response
    let my = new User(user.id, user.username, user.age)
    my = newFriend(my, user.friends)

    userType.push(my)
}

function newFriend(f, friend) {
    userFriend.push(f.addFriend(friend))
    return f
}

function elementChangeHandle(e, str) {
    e.innerHTML += str
}

async function pageRender() {
    await getUser()
    const { id, username, age, friends } = { ...userType[0] }

    elementChangeHandle(myProfile, `
        <p>my name: ${username}</p>
        <p>my age: ${age}</p>
        <p>my id: ${id}</p>
    `)
    friends.forEach(e => {
        elementChangeHandle(friendList, `
            <div id="friends">
                <p>friend name: ${e.username}</p>
                <p>friend age: ${e.age}</p>
                <p>friend id: ${e.id}</p>
            </div>
        `)
    })
}

class User {
    constructor(id, username, age) {
        ErrorUtil.invalidVariable([id, username, age].every(v => v))
        ErrorUtil.invalidType([id, username, age], "string")
        this.id = id
        this.username = username
        this.age = age
        this.friends = []
    }

    addFriend(arr) {
        arr.forEach(e => {
            const { id, originId, username, age } = e
            ErrorUtil.invalidVariable([id, originId, username, age].every(v => v))
            ErrorUtil.invalidType([id, originId, username, age], "string")
            this.friends.push(e)
        })
        return this.friends
    }
}

const ErrorUtil = {
    invalidVariable: function (e) {
        if (!e) {
            console.log("Empty")
        }
    },
    invalidType: function (e, type) {
        e.forEach(element => {
            if (!(typeof element === type)) {
                console.log("invalid type")
            }
        });
    }
}

pageRender()