const userType = [];
const userFriend = [];

const container = document.getElementById("container");
const myProfile = document.getElementById("myProfile");
const friendList = document.getElementById("friendList");

async function getUser() {
    // const res = await fetch("./users.json");
    // const response = await res.json();
    // const { user } = response;
    // // 왜 이렇게 해야 하는거지?
    // // 너무 어렵게 접근하고 있다.
    // // 더 단순하게 try
    // // const my = new User(...)
    // // my.friends.push(new User(...))
    // // 이렇게 가도 되는거 아닌가?

    // const my = UserType.createUser([user.id, user.username, user.age, user.friends])
    // userType.push(my);
    // userFriend.push(my.friends)

    const res = await fetch("./users.json");
    const response = await res.json();
    const { user } = response;
    const my = new User(user.id, user.username, user.age, []);
    user.friends.forEach((f) => {
      my.friends.push(new User(f.id, f.username, f.age, [], f.originId));
    });

    userType.push(my);
    userFriend.push(my.friends);
    userFriend.every((f) => f instanceof User);
}

// 이 함수가 왜 필요한지 정확하게 잘 모르겠음.
// 이건 친구추가 기능을 염두했지만 일단은 놔둔 잔존물...

/*
function newFriend(f, friend) {
    userFriend.push(f.addFriend(friend));
    return f;
}
*/

function elementChangeHandle(e, str) {
    e.innerHTML += str;
}

async function pageRender() {
    await getUser();
    // 여기도 내가 의도한 대로 간다면 이렇게 접근 안해도 될 거임
    // { ...userType[0] } 이렇게 구조분해 할당 해야 하는건가?
    // const { id, username, age, friends } = userType[0]
    // 이렇게는 안되나?

    //아주 잘된다.
    const { id, username, age, friends } = userType[0];

    elementChangeHandle(
        myProfile,
        `
        <p>my name: ${username}</p>
        <p>my age: ${age}</p>
        <p>my id: ${id}</p>
    `
    );
    friends.forEach((e) => {
        elementChangeHandle(
            friendList,
            `
            <div id="friends">
                <p>friend name: ${e.username}</p>
                <p>friend age: ${e.age}</p>
                <p>friend id: ${e.id}</p>
            </div>
        `
        );
    });
}

class User {
    constructor(id, username, age, friends, originId) {
        // ErrorUtil의 활용은 매우 좋다.
        // 근데 friends의 array도 User가 되야하는게 아닌가
        // User class에 대한 타입 검사를 한다면 어떨까

        // class의 타입검사라는 것이 정확히 뭔지 이해가 안되서 따로 객체로 만들어서
        // User의 내용을 검사하고 User로 리턴했다. 맞나 모르겠다.

        ErrorUtil.invalidVariable([id, username, age].every((v) => v));
        ErrorUtil.invalidType([id, username, age], "string");
        this.id = id;
        this.username = username;
        this.age = age;
        this.friends = friends;
        this.originId = originId
    }
}

const ErrorUtil = {
    invalidVariable: function (e) {
        if (!e) {
            console.log("Empty");
        }
    },
    invalidType: function (e, type) {
        e.forEach((element) => {
            if (!(typeof element === type)) {
                console.log("invalid type");
            }
        });
    },
};

const UserType = {
    createUser: function(user) {
        const [id, username, age, friend] = user
        ErrorUtil.invalidVariable([id, username, age].every(v => v))
        ErrorUtil.invalidType([id, username, age], "string")
        friend.forEach(e => {
            const { id, originId, username, age } = e
            ErrorUtil.invalidVariable([id, originId, username, age].every((v) => v));
            ErrorUtil.invalidType([id, originId, username, age], "string");
        })

        return new User(id, username, age, friend)
    }
}

pageRender();
