const ul = document.querySelector("ul");
let btn = document.createElement("button");
let editBtn = document.createElement("button");
const form = document.querySelector("form");
form.addEventListener("submit", handleFormSubmit);

let editUserId = null;

function liDetails(userData) {
  const newLi = document.createElement("li");
  newLi.className = "user";
  newLi.id = userData.id;
  newLi.innerText = `${userData.userName} - ${userData.email} - ${userData.phoneNo} - `;

  btn = document.createElement("button");
  const btnText = document.createTextNode("delete");
  btn.appendChild(btnText);
  btn.type = "delete";
  btn.className = "delete-btn";
  btn.addEventListener("click", deleteDetails);
  // btn.onclick=deleteDetails;
  newLi.appendChild(btn);

  ul.appendChild(newLi);
}
axios
  .get("http://localhost:4000/user")
  .then((res) => {
    console.log("res.data", res.data);
    res.data.forEach((addedUserData) => {
      liDetails(addedUserData);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function handleFormSubmit(event) {
  event.preventDefault();

  console.log("editUserId-", editUserId);

  const newUser = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  axios
    .post("http://localhost:4000/addUser", newUser)
    .then((res) => {
      console.log("post res.data", res.data);
      const currentAddedUser = res.data[res.data.length - 1];
      liDetails(currentAddedUser);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteDetails(event) {
  if (event.target.classList.contains("delete-btn")) {
    const curentUserDetails = event.target.parentElement;
    console.log("curentUserDetails", curentUserDetails);

    axios
      .delete(`http://localhost:4000/deleteUser/${curentUserDetails.id}`)
      .then((res) => {
        console.log(res);
        ul.removeChild(curentUserDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
