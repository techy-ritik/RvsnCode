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
      .then((currentUser) => {
        console.log("currentUser", currentUser.data.user);
        alert(currentUser.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  });
}

/** password-eyeBtn */

const eyeBtn = document.querySelector(".eye-btn");
const registerPassword = document.querySelector(".password");
eyeBtn.addEventListener("click", () => {
  if (registerPassword.type == "password") {
    registerPassword.type = "text";
  } else {
    registerPassword.type = "password";
  }
});

