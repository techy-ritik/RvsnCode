//======================
/** user management */
//======================

/** user signUp */
//---------------

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
      .post("http://localhost:5000/register", userObj)
      .then((user) => {
        console.log(user.data);
        alert("successfully registered...");
        window.location.href = "/login.html";
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert("email id already registered!");
      });
  });
}

/** user Login */
//------------------

const loginForm = document.querySelector(".login-form");

// let loggedInUserId;
if (loginForm) {
  let userType = null;
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const loginObj = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    };
    console.log("user", loginObj);

    axios
      .post("http://localhost:5000/login", loginObj)
      .then((currentUser) => {
        console.log("currentUser", currentUser.data);
        userType = currentUser.data.user.userType;
        localStorage.setItem("userType", userType);

        alert(currentUser.data.message);
        localStorage.setItem("token", currentUser.data.token);
        window.location.href = "/expense/expense-page"; // here with this, expense page opens after only successfull login
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  });

  /** forgot password handling */
  //----------------------------

  const passwordResetBtn = document.querySelector(".password-reset-btn");
  const passwordResetFormOverlayDiv = document.querySelector(
    ".password-reset-form-overlay",
  );
  const passwordResetFormPopupDiv = document.querySelector(
    ".password-reset-form-popup",
  );

  passwordResetBtn.addEventListener("click", () => {
    passwordResetFormOverlayDiv.classList.add("show");
    passwordResetFormPopupDiv.classList.add("show");
  });

  const closeResetFormBtn = document.querySelector(".close-reset-form-btn");

  closeResetFormBtn.addEventListener("click", () => {
    passwordResetFormOverlayDiv.classList.remove("show");
    passwordResetFormPopupDiv.classList.remove("show");
  });

  const ResetMailForm = document.querySelector(".password-reset-form");

  ResetMailForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const resetEmail = document.getElementById("resetEmail").value;
    console.log("resetFormEmail", resetEmail);

    const resetForm = await axios.post(
      "http://localhost:5000/password/forgotpassword",
      {
        resetEmail,
      },
    );

    passwordResetFormOverlayDiv.classList.remove("show");
    passwordResetFormPopupDiv.classList.remove("show");

    alert(resetForm.data.message);
  });
}

/** update reset password */
//---------------------

const passwordResetForm = document.querySelector(".resetPassword-form");

if (passwordResetForm) {
  passwordResetForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const urlPathSplit = window.location.pathname.split("/");

    const userUpdatedPasswordObj = {
      updatedPassword: document.getElementById("updated-passowrd").value,
      requestId: urlPathSplit.pop(),           // here it's assumed that the request id will be at the end
    };

    console.log(userUpdatedPasswordObj);

    const passwordUpdate = await axios.post(
      "http://localhost:5000/password/updatedPassword",
      userUpdatedPasswordObj,
    );

    alert(passwordUpdate.data.message);

    window.location.href = "/login.html";
  });
}

/** password-eyeBtn */
//--------------------

if (registerForm || loginForm || passwordResetForm) {
  console.log("eye button handling");
  const eyeBtn = document.querySelector(".eye-btn");
  const Password = document.querySelector(".password");
  eyeBtn.addEventListener("click", () => {
    if (Password.type == "password") {
      Password.type = "text";
    } else {
      Password.type = "password";
    }
  });
}

//==========================
/** expense management */
//=========================

const expenseForm = document.querySelector("#ExpenseForm");
const expenseListUl = document.querySelector("#expense-list");

const token = localStorage.getItem("token");
let idToUpdate = null;
let isEditing = false;

if (expenseForm) {
  /** Ai suggestion from desc input */
  //------------------------------------

  const expenseDesc = document.getElementById("description");
  let expensCategory = document.getElementById("category");

  expenseDesc.addEventListener("blur", async () => {
    try {
      const expenseDescValue = expenseDesc.value;

      console.log(expenseDescValue);
      const aiSuggestedCategory = await axios.post(
        "http://localhost:5000/ai/category-suggestion",
        { expenseDescValue },
      );

      expensCategory.value = aiSuggestedCategory.data;
    } catch (err) {
      console.log(err);
    }
  });
  //-------------------------------------------------------

  /** expense data handling operations */
  //-------------------------------------

  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    /**add new expense */
    if (isEditing == false) {
      const expenseObject = {
        xpAmount: document.getElementById("amount").value,
        xpDesc: document.getElementById("description").value,
        xpCtgry: document.getElementById("category").value,
      };

      axios
        .post("http://localhost:5000/expense/add-expense", expenseObject, {
          headers: { Authorization: token },
        })
        .then((expense) => {
          console.log("newExpense", expense.data);

          addNewLi(expense.data);

          expenseForm.reset();
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
    } else {
      /** update expense */
      const editExpenseObj = {
        xpId: idToUpdate,
        xpAmount: document.getElementById("amount").value,
        xpDesc: document.getElementById("description").value,
        xpCtgry: document.getElementById("category").value,
      };

      axios
        .put("http://localhost:5000/expense/update-expense", editExpenseObj, {
          headers: { Authorization: token },
        })
        .then((expense) => {
          console.log("expense updated..........");

          const updatedExpense = expense.data;
          // const oldExpense = document.getElementById(idToUpdate);
          // oldExpense.remove();

          addNewLi(updatedExpense);

          expenseForm.reset();

          isEditing = false;
          idToUpdate = null;

          document.getElementById("addExpense").textContent = "Add Expense";
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
    }
  });

  /** get all expenses of loggedIn user*/

  axios
    .get("http://localhost:5000/expense/user-expenses", {
      headers: { Authorization: token },
    })
    .then((expenses) => {
      console.log("expenses", expenses.data);

      expenses.data.forEach((expense) => {
        addNewLi(expense);
      });
    })
    .catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
}

/** expense data display on page */

function addNewLi(expenseData) {
  const newLi = document.createElement("li");
  newLi.className = "expenseList";
  newLi.id = expenseData.id;

  newLi.innerHTML = `<span class="expense-data"> Rs. ${expenseData.amount} -- ${expenseData.description} --  ${expenseData.category}</span>`;

  // delete-btn
  const dltBtn = document.createElement("button");
  dltBtn.textContent = "Delete Expense";
  dltBtn.className = "delete-btn";
  dltBtn.addEventListener("click", deleteExpense);
  newLi.appendChild(dltBtn);

  // edit-btn
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Expense";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", getEditExpense);
  newLi.appendChild(editBtn);

  expenseListUl.appendChild(newLi);
}

/** delete expense */

function deleteExpense(event) {
  const currentExpense = event.target.parentElement;
  const expenseId = currentExpense.id;

  console.log("currentExpense", currentExpense);

  axios
    .delete(`http://localhost:5000/expense/delete-expense/${expenseId}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      currentExpense.remove();
      alert(res.data.message);
      console.log("expense deleted");
    })
    .catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
}

/** edit expense form display */

function getEditExpense(event) {
  const currentExpense = event.target.parentElement;
  const expenseId = currentExpense.id;

  axios
    .get(`http://localhost:5000/expense/edit-expense/${expenseId}`, {
      headers: { Authorization: token },
    })
    .then((expense) => {
      console.log("expense to edit", expense.data);

      currentExpense.remove();

      const amountField = document.getElementById("amount");
      const descriptionField = document.getElementById("description");
      const categoryField = document.getElementById("category");

      amountField.value = expense.data.amount;
      descriptionField.value = expense.data.description;
      categoryField.value = expense.data.category;

      idToUpdate = expenseId; // Store ID of expense being edited
      isEditing = true;

      document.getElementById("addExpense").textContent = "Update Expense";
    })
    .catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
}

//==============================
// premium membership management
//==============================

/** buy membership page*/
userType = localStorage.getItem("userType");
console.log("userType", userType);

if (userType == "premium") {
  const userTypeValue = document.getElementById("userTypeValue");
  userTypeValue.textContent = "Premium User";

  const buyMembershipBtn = document.querySelector("#membersip-btn");
  buyMembershipBtn.style.display = "none";
} else if (userType == "non-premium") {
  const buyMembershipBtn = document.querySelector("#membersip-btn");
  buyMembershipBtn.onclick = () => {
    window.location.href = "/payments";
  };

  const userTypeDiv = document.getElementById("userType");
  userTypeDiv.style.display = "none";
}

/** Leaderboard display */
const leaderboardBtn = document.getElementById("leaderboard-btn");
leaderboardBtn.addEventListener("click", async () => {
  try {
    const leaderboardExpensesList = await axios.get(
      "http://localhost:5000/premium/leaderBoard",
      { headers: { Authorization: token } },
    );

    const leaderboardList = leaderboardExpensesList.data;

    console.log("allExpenses", leaderboardList);

    leaderboardDisplay(leaderboardList);
  } catch (err) {
    console.log(err);
  }
});

function leaderboardDisplay(leaderboardSortedExpenses) {
  console.log("leaderboard");
  const leaderboardOverlay = document.querySelector(".leaderboard-overlay");
  const leaderboardPopupDiv = document.querySelector(".leaderboard-popup");
  const leaderboardListUl = document.querySelector("#leaderboard-list");
  const leaderBoardCloseBtn = document.querySelector("#closeLeaderboardBtn");
  leaderboardSortedExpenses.forEach((expense) => {
    if (expense.totalExpense === null) {
      expense.totalExpense = 0;
    }
    console.log("expense", expense);
    const newLi = document.createElement("li");
    newLi.className = "userTotalExpenseList";
    newLi.id = expense.id;

    newLi.innerHTML = `<span> Name - ${expense.name} --->>> Total Expense - ₹${expense.totalExpense}</span>`;

    leaderboardListUl.appendChild(newLi);
  });
  leaderBoardCloseBtn.addEventListener("click", () => {
    leaderboardPopupDiv.classList.remove("show");
    leaderboardOverlay.classList.remove("show");
    leaderboardListUl.innerHTML = "";
  });
  leaderboardPopupDiv.classList.add("show"); // display leaderboard popUp
  leaderboardOverlay.classList.add("show");
}
