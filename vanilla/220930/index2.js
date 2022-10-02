const container = document.getElementById("container");
const form = document.getElementById("form");

function addElement(htmlStr) {
  container.innerHTML += htmlStr;
}

async function getAll() {
  const res = await fetch("https://reqres.in/api/users");
  const response = await res.json();
  const { data } = response;
  data.forEach((e) => {
    addElement(`
    <div id="person">
        <p>${e.first_name}</p>
        <p>${e.email}</p>
        <img src=${e.avatar}></img>
    </div>
`);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const profile = {
    firstName: formData.get("first-name"),
    email: formData.get("email"),
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  };
  try {
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    const response = await res.json();
    const { firstName, email, avatar } = response;
    addElement(`
        <div id="person">
            <p>${firstName}</p>
            <p>${email}</p>
            <img src=${avatar}></img>
        </div>
    `);
  } catch (e) {
    throw new Error("Error");
  }
});
getAll();