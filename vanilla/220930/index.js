const container = document.getElementById("container")
const form = document.getElementById('form');
const profiles = []

function addText(str) {
    container.innerHTML += str
}

async function getAll() {
    const res = await fetch("https://reqres.in/api/users")
    const response = await res.json();
    const { data } = response;
    data.forEach((e) => {
        profiles.push(new PersonInfomain(e.id, e.first_name, e.last_name, e.email, e.avatar)) 
    })
    profiles.forEach((e) => {
        addText(`
            <div key=${e.person.id} id="person">
                <p>${e.person.firstName}</p>
                <p>${e.person.lastName}</p>
                <p>${e.email}</p>
                <img src=${e.avatar}></img>
            </div>
        `)
    })
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const profile = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        avatar: "https://reqres.in/img/faces/1-image.jpg"
    }
    try {
        const res = await fetch("https://reqres.in/api/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile)
        })
        const response = await res.json();
        const { id, firstName, lastName, email, avatar } = response;
        const tempClass = new PersonInfomain(id, firstName, lastName, email, avatar)
        profiles.push(tempClass)

        addText(`
            <div key=${tempClass.id} id="person">
                <p>${tempClass.firstName}</p>
                <p>${tempClass.lastName}</p>
                <p>${tempClass.email}</p>
                <img src=${tempClass.avatar}></img>
            </div>
        `)
    }
    catch (e){
        throw new Error("Error")
    }
    form.reset()
})

class Person {
    constructor(id, firstName, lastName) {
        ErrorUtil.check([firstName, lastName].every(e => e))
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }
}
class Product {
}
class PersonInfomain {
    constructor(id, firstName, lastName, email, avatar) {
        this.person = new Person(id, firstName, lastName)
        ErrorUtil.check([email, avatar].every(e => e))
        this.email = email
        this.avatar = avatar
        this.product = []
    }

    asArray() {
        return [this.person.id]
    }
}

const ErrorUtil = {
    check: function(data) {
        if(!data) {
            console.log("stop")
            debugger
        }
    }
}
getAll()