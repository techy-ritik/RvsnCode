document.addEventListener("DOMContentLoaded", function () {
  const ul = document.querySelector("ul");
  let btn = document.createElement("button");
  let editBtn = document.createElement("button");
  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);

  api = "https://crudcrud.com/api/6700db501c024302b222fc289fe3b3e2";

  let editUserId = null;

  function liDetails(userData) {
    const newLi = document.createElement("li");
    newLi.className = "user";
    newLi.id = userData._id;
    newLi.innerText = `${userData.username} - ${userData.email} - ${userData.phone} - `;

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
  }

  axios
    .get(api + "/appointmentData")
    .then((res) => {
      console.log(res.data);
      res.data.forEach((addedUserData) => {
        liDetails(addedUserData);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  function handleFormSubmit(event) {
    event.preventDefault();

    console.log("editUserId-", editUserId)

    const newUser = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    //   let newUser_serialized = JSON.stringify(newUser);
    //   // console.log(username.value); // it's getting value bcz browser auto craetess a global variable userrname that references the element with id="username"
    //   localStorage.setItem(email.value, newUser_serialized);

    if (editUserId) {
      axios
        .put(api + "/appointmentData/" + editUserId, newUser)

        newUser.id = editUserId;
        // console.log("newUser",newUser);
        liDetails(newUser);
    } else {
      axios
        .post(api + "/appointmentData", newUser)
        .then((res) => {
          // console.log(res.data);
          var addedUserData = res.data;
          liDetails(addedUserData);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    editUserId = null;
    //   let newUser_deserialized = JSON.parse(localStorage.getItem(email.value));
  }

  function deleteDetails(event) {
    if (event.target.classList.contains("delete-btn")) {
      const curentUserDetails = event.target.parentElement;
      console.log(curentUserDetails.id);

      axios
        .delete(api + "/appointmentData/" + curentUserDetails.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
        curentUserDetails.firstChild.textContent.split(" - ");
      //  console.log(curentUserDetailsArr)
      const userNameInput = document.getElementById("username");
      userNameInput.setAttribute("value", curentUserDetailsArr[0]);
      const emailInput = document.getElementById("email");
      emailInput.setAttribute("value", curentUserDetailsArr[1]);
      const phoneInput = document.getElementById("phone");
      phoneInput.setAttribute("value", curentUserDetailsArr[2]);

      editUserId = curentUserDetails.id;

      // axios
      //   .delete(api + "/appointmentData/" + curentUserDetails.id)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      ul.removeChild(curentUserDetails);
      // localStorage.removeItem(curentUserDetailsArr[1]);
    }
  }
});
