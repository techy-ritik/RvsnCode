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
      requestId: urlPathSplit.pop(), // here it's assumed that the request id will be at the end
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

const token = localStorage.getItem("token");
let idToUpdate = null;
let isEditing = false;

if (expenseForm) {
  /** Ai suggestion from description input */
  //-------------------------------------------

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

          const nextPage = document.getElementById("nextpage");
          if (!nextPage) {
            const currentPageNum =
              document.getElementById("currentPage").textContent;
            getExpenseData(currentPageNum);
          }
          alert("Expense added Successfully..!");

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

          const currentPageNum =
            document.getElementById("currentPage").textContent;
          getExpenseData(currentPageNum);

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

  /** get 1st page expenses of loggedIn user*/
  //--------------------------------------

  const currentPage = 1;

  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get(`http://localhost:5000/expense/user-expenses?page=${currentPage}`, {
        headers: { Authorization: token },
      })
      .then((expenseData) => {
        console.log("expenses", expenseData);

        pagination(expenseData.data);

        expenseDisplay(expenseData.data.expenses);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

/** pagination of expenses */
//---------------------------

function pagination({
  currentPage,
  prevPage,
  nextPage,
  currentIsLastPage,
  totalPage,
}) {
  // console.log(
  //   "prevPage",
  //   prevPage + "\n" + "current page",
  //   currentPage + "\n" + "next page",
  //   nextPage + "\n" + "current page is the last page",
  //   currentIsLastPage,
  // );
  const expenseTablePaginationDiv = document.querySelector(".pagination");
  if (currentIsLastPage == true) {
    if (prevPage != 0) {
      expenseTablePaginationDiv.innerHTML = `<button id="prevPage" onclick="getExpenseData(${prevPage})">${prevPage}</button> <button id="currentPage" onclick="getExpenseData(${currentPage})"  >${currentPage}</button>`;
    } else {
      expenseTablePaginationDiv.innerHTML = `<button id="currentPage" onclick="getExpenseData(${currentPage})">${currentPage}</button>`;
    }
  } else {
    if (currentPage == 1) {
      expenseTablePaginationDiv.innerHTML = `<button id="currentPage" onclick="getExpenseData(${currentPage})">${currentPage}</button> <button id="nextpage" onclick="getExpenseData(${nextPage})" >${nextPage}</button>`;
    }
    if (currentPage != 1) {
      expenseTablePaginationDiv.innerHTML = `<button id="prevPage" onclick="getExpenseData(${prevPage})">${prevPage}</button> <button id="currentPage" onclick="getExpenseData(${currentPage})"  >${currentPage}</button> <button id="nextpage" onclick="getExpenseData(${nextPage})" >${nextPage}</button>`;
    }
    if (nextPage != totalPage) {

      const dots = document.createElement("span");
      dots.textContent = "• • •";
      dots.className = "pagination-dots";
      expenseTablePaginationDiv.appendChild(dots);

      const lastPageBtn = document.createElement("button");
      lastPageBtn.textContent = totalPage;
      lastPageBtn.id = "lastPage";
      lastPageBtn.addEventListener("click", () => {
        getExpenseData(totalPage);
      });
      expenseTablePaginationDiv.appendChild(lastPageBtn);
    }
  }
}

/** get expense data by page number, on button click*/
//---------------------------------------------------

function getExpenseData(pageNum) {
  axios
    .get(`http://localhost:5000/expense/user-expenses?page=${pageNum}`, {
      headers: { Authorization: token },
    })
    .then((expenseData) => {
      console.log("expenses", expenseData);

      pagination(expenseData.data);
      expenseDisplay(expenseData.data.expenses);
    })
    .catch((err) => {
      console.log(err);
    });
}

/** expense data display on page */

function expenseDisplay(expenses) {
  const tBody = document.querySelector("#expense-table-body");

  if (tBody.innerHTML) {
    console.log("old tr available");
    tBody.innerHTML = "";
  }

  expenses.forEach((expense, index) => {
    const newRow = document.createElement("tr");
    newRow.id = `${expense.id}`;
    newRow.innerHTML = `
        <td>₹${expense.amount}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td class="expense-actions">
            <button 
                class="edit-btn"
                type="button"
            >
                Edit
            </button>

            <button 
                class="delete-btn"
                type="button"
            >
                Delete
            </button>
        </td>
    `;

    const editBtn = newRow.querySelector(".edit-btn");
    editBtn.addEventListener("click", getEditExpense);

    const deleteBtn = newRow.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteExpense);

    tBody.appendChild(newRow);
  });
}

/** delete expense */
//--------------------

function deleteExpense(event) {
  const currentExpenseTr = event.target.parentElement.parentElement;
  const expenseId = currentExpenseTr.id;

  axios
    .delete(`http://localhost:5000/expense/delete-expense/${expenseId}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      currentExpenseTr.remove();
      alert(res.data.message);
      const currentPageNum = document.getElementById("currentPage").textContent;
      getExpenseData(currentPageNum);
      console.log("expense deleted");
    })
    .catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
}

/** edit expense form display */
//------------------------------

function getEditExpense(event) {
  const currentExpenseTr = event.target.parentElement.parentElement;
  const expenseId = currentExpenseTr.id;

  // console.log("expense Id",currentExpenseTr.id)
  axios
    .get(`http://localhost:5000/expense/edit-expense/${expenseId}`, {
      headers: { Authorization: token },
    })
    .then((expense) => {
      // console.log("expense to edit", expense.data);

      currentExpenseTr.remove();

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
      console.log(err);
      alert(err.response.data.message);
    });
}

//==============================
// premium membership management
//==============================

userType = localStorage.getItem("userType");
// console.log("userType", userType);
const reportDownloadBtn = document.querySelector("#tableDownloadBtn");

/** premium member */
//-------------------------
if (userType == "premium") {
  const userTypeValue = document.getElementById("userTypeValue");
  userTypeValue.textContent = "Premium User";

  const buyMembershipBtn = document.querySelector("#membersip-btn");
  buyMembershipBtn.style.display = "none";

  reportDownloadBtn.addEventListener("click", () => {
    downloadTableReport();
  });
}

/** non premium member */
//------------------------

/** buy membership page*/
else if (userType == "non-premium") {
  const buyMembershipBtn = document.querySelector("#membersip-btn");
  buyMembershipBtn.onclick = () => {
    window.location.href = "/payments";
  };

  const userTypeDiv = document.getElementById("userType");
  userTypeDiv.style.display = "none";

  reportDownloadBtn.addEventListener("click", () => {
    alert("buy membership to use this feature !");
  });
}

function downloadTableReport() {
  const tr = document.querySelectorAll("tr");

  // console.log("tr",tr);
  const tableData = [];

  tr.forEach((row) => {
    const rowCell = row.querySelectorAll("th,td");
    // console.log("rowCell",rowCell)
    const rowData = [];

    rowCell.forEach((cell, index) => {
      if (index === 3) {
        return;
      }
      let cellValue = cell.textContent.trim();

      cellValue = cellValue.replace(/"/g, '""'); //here in this way we are basically replacing every available double quotes in two double quotes for safe csv style formatting

      cellValue = `"${cellValue}"`; // now we have added double quotes to an overall value of the cell which will make a single string of complete cell value

      rowData.push(cellValue);
    });

    tableData.push(rowData.join(",")); // it will join every available element of the rowData separating them with , and store it in tableData as a single string element
  });

  const csvContent = tableData.join("\n"); // it will join every available element of the tableData separating them with \n(i.e. new line) and store it in csvContent as a single string

  console.log("csvContent", csvContent);

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  }); // it's the object, containing csvContent which is treated as file by the browser

  const tempUrl = URL.createObjectURL(blob); // here now we have url for the downloadable file object

  const tempAnchorTag = document.createElement("a");
  tempAnchorTag.href = tempUrl;
  tempAnchorTag.download = "Expense.csv"; // here like this we set name of the file to be downloaded
  document.body.appendChild(tempAnchorTag);

  tempAnchorTag.click(); // here when it is called, the tempAnchorTag url link get auto clicked after the creation

  document.body.removeChild(tempAnchorTag); // as we don't need the temporarily added anchor tag now so we have removed it after the click

  URL.revokeObjectURL(tempUrl); // as the url we have created is for meant for one time download of the data so we will also revoke the url
}

/** Leaderboard display */
//-------------------------
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
