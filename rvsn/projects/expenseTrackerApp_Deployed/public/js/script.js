/** user signUp */

const registerForm = document.querySelector(".registration-form");

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userObj = {
      name: document.getElementById("userName").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value,
    };

    console.log("userObj", userObj);
    axios
      .post("http://localhost:5000/user/register", userObj)
      .then((user) => {
        console.log(user.data);
        alert("successfully registered...");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert("email id already registered!");
      });
  });
}

/** user Login */

const loginForm = document.querySelector(".login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const loginObj = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };
    console.log("user", loginObj);

    axios
      .post("http://localhost:5000/user/login", loginObj)
      .then((user) => {
        console.log("currentUser", user.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}


