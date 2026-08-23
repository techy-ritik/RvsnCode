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
        window.location.href = "/expense/expense-page"; // here with this, expense page opens after only successfull login
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  });
}

/** password-eyeBtn */

if (registerForm || loginForm) {
  const eyeBtn = document.querySelector(".eye-btn");
  const registerPassword = document.querySelector(".password");
  eyeBtn.addEventListener("click", () => {
    if (registerPassword.type == "password") {
      registerPassword.type = "text";
    } else {
      registerPassword.type = "password";
    }
  });
}

//==========================
/** expense management */
//=========================

const expenseForm = document.querySelector("#ExpenseForm");
const ul = document.querySelector("ul");

let idToUpdate = null;
let isEditing = false;

if (expenseForm) {
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
        .post("http://localhost:5000/expense/add-expense", expenseObject)
        .then((expense) => {
          console.log("newExpense", expense.data);

          addNewLi(expense.data);

          expenseForm.reset();
        })
        .catch((err) => {
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
        .put("http://localhost:5000/expense/update-expense", editExpenseObj)
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
          console.log(err);
        });
    }
  });

  /** get all expenses */

  axios
    .get("http://localhost:5000/expense/expenses")
    .then((expenses) => {
      console.log("expenses", expenses.data);

      expenses.data.forEach((expense) => {
        addNewLi(expense);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

/** expense data display on page */

function addNewLi(expenseData) {
  const newLi = document.createElement("li");
  newLi.className = "expenseList";
  newLi.id = expenseData.id;

  newLi.innerHTML = `<span class="expense-data">${expenseData.amount} -- ${expenseData.description} --  ${expenseData.category}</span>`;

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

  ul.appendChild(newLi);
}

/** delete expense */

function deleteExpense(event) {
  const currentExpense = event.target.parentElement;
  const expenseId = currentExpense.id;

  console.log("currentExpense", currentExpense);

  axios
    .delete(`http://localhost:5000/expense/delete-expense/${expenseId}`)
    .then((res) => {
      currentExpense.remove();
      console.log("expense deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

/** edit expense form display */

function getEditExpense(event) {
  const currentExpense = event.target.parentElement;
  const expenseId = currentExpense.id;

  axios
    .get(`http://localhost:5000/expense/edit-expense/${expenseId}`)
    .then((expense) => {
      console.log("expense to edit", expense.data);

      currentExpense.remove()
      
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
    });
}
