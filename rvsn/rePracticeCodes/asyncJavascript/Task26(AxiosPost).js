const ul = document.querySelector("ul");
let btn = document.createElement("button");
let editBtn = document.createElement("button");


function handleFormSubmit(event) {
  event.preventDefault();

  const newUser = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  //   let newUser_serialized = JSON.stringify(newUser);
  //   // console.log(username.value); // it's getting value bcz browser auto craetess a global variable userrname that references the element with id="username"
  //   localStorage.setItem(email.value, newUser_serialized);

  axios
    .post(
      "https://crudcrud.com/api/bc66b26d0db34f20ae0a6e61f5d245d0/appointmentData",
      newUser
    )
    .then((res) => {
      console.log(res.data);
      var addedUserData = res.data;
        const newLi = document.createElement("li");
        newLi.className = "user";

      newLi.innerText = `${addedUserData.username} ${addedUserData.email} ${addedUserData.phone} - `;

        btn = document.createElement("button");
        const btnText = document.createTextNode("delete");
        btn.appendChild(btnText);
        btn.type = "delete";
        btn.className = "delete-btn";
        btn.addEventListener("click", deleteDetails);
        // btn.onclick=deleteDetails;
        newLi.appendChild(btn);

        editBtn = document.createElement("button");
        const editBtnText = document.createTextNode("edit");
        editBtn.appendChild(editBtnText);
        editBtn.type = "edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", editDetails);
        // editBtn.onclick=editDetails;
        newLi.appendChild(editBtn);

        ul.appendChild(newLi);
    })
    .catch((err) => {
      console.log(err);
    });

  //   let newUser_deserialized = JSON.parse(localStorage.getItem(email.value));

}


function deleteDetails(event) {
  if (event.target.classList.contains("delete-btn")) {
    const curentUserDetails = event.target.parentElement;
    ul.removeChild(curentUserDetails);
    // localStorage.removeItem(email.value);
  }
}

function editDetails(event) {
  if (event.target.classList.contains("edit-btn")) {
    const form = document.querySelector("form");
    form.reset();
    const curentUserDetails = event.target.parentElement;
    const curentUserDetailsArr =
      curentUserDetails.firstChild.textContent.split(" ");
    // console.log(curentUserDetailsArr)
    const userNameInput = document.getElementById("username");
    userNameInput.setAttribute("value", curentUserDetailsArr[0]);
    const emailInput = document.getElementById("email");
    emailInput.setAttribute("value", curentUserDetailsArr[1]);
    const phoneInput = document.getElementById("phone");
    phoneInput.setAttribute("value", curentUserDetailsArr[2]);
    ul.removeChild(curentUserDetails);
    // localStorage.removeItem(curentUserDetailsArr[1]);
  }
}
