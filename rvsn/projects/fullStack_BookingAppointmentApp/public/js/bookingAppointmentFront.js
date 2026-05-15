document.addEventListener("DOMContentLoaded", function () {
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

    // editBtn = document.createElement("button");
    // const editBtnText = document.createTextNode("edit");
    // editBtn.appendChild(editBtnText);
    // editBtn.type = "edit";
    // editBtn.className = "edit-btn";
    // // editBtn.addEventListener("click", editDetails);
    // // editBtn.onclick=editDetails;
    // newLi.appendChild(editBtn);

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

      /** 1st approach(using .post request) */
      // const currentUserId = {userId:curentUserDetails.id}   // here we have to store id as object because with post request we can only send sencond argument in the form of object
      // axios
      //   .post("http://localhost:4000/deleteUser", currentUserId)

      /** alt. aprroach(using .delete request) */
      axios
        .delete(`http://localhost:4000/deleteUser/${curentUserDetails.id}`)  // here we can pass id with url as dynamic value because with delete request we can not send 2nd argument 
        .then((res) => {
          console.log(res);
          ul.removeChild(curentUserDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
