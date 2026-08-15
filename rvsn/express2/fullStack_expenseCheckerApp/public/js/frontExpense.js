const form = document.querySelector("#ExpenseForm");
const ul = document.querySelector("ul");

function addNewLi(expenseData) {
  const newLi = document.createElement("li");
  newLi.className = "expenseList";
  newLi.id = expenseData.id; 
  ul.appendChild(newLi);

  newLi.innerHTML = `<span class="expense-data">${expenseData.amount} -- ${expenseData.description} -- ${expenseData.category}</span>`;

  const dltBtn = document.createElement("button");
  const dltBtnText = document.createTextNode("Delete Expense");
  dltBtn.appendChild(dltBtnText);
  dltBtn.className = "delete-btn";
  dltBtn.addEventListener("click", deleteExpense);
  newLi.appendChild(dltBtn);

  const editBtn = document.createElement("button");
  const editBtnText = document.createTextNode("Edit Expense");
  editBtn.appendChild(editBtnText);
  editBtn.className = "edit-btn";
  editBtn.onclick = getEditExpense;
  newLi.appendChild(editBtn);
}

axios
  .get("http://localhost:5000/expenses")
  .then((expenses) => {
    console.log("expenses", expenses.data);
    expenses.data.forEach((expense) => {
      addNewLi(expense);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// console.log("form.action", form.action);

const addButton = document.getElementById("addExpense");
let idToUpdate;
let isEditing;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (isEditing) {
    const editExpenseObj = {
      xpId: idToUpdate,
      xpAmount: document.getElementById("amount").value,
      xpDesc: document.getElementById("description").value,
      xpCtgry: document.getElementById("category").value,
    };

    axios
      .put("http://localhost:5000/update-expense", editExpenseObj)
      .then((expense) => {
        console.log("expense updated..........");
        addNewLi(expense.data);

        addButton.textContent = "Add Expense";
        form.action = "/add-expense";
        form.method = "post";

        isEditing=false;

        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
    
  }else{
    // execution of Submit eventListener after hitting add expense button

    const expenseObject = {
      xpAmount: document.getElementById("amount").value,
      xpDesc: document.getElementById("description").value,
      xpCtgry: document.getElementById("category").value,
    };

    // console.log(expenseObject);
    axios
      .post("http://localhost:5000/add-expense", expenseObject)
      .then((expense) => {
        console.log("newExpense", expense);
        addNewLi(expense.data);

        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

function deleteExpense(event) {

  if (event.target.classList.contains("delete-btn")) {
    const currentExpense = event.target.parentElement;
    console.log("currentExpense", currentExpense);

    axios
      .delete(`http://localhost:5000/delete-expense/${currentExpense.id}`) 
      .then((res) => {
        currentExpense.remove();
        console.log("expense deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function getEditExpense(event) {
  if (event.target.matches(".edit-btn")) {
    const currentExpense = event.target.parentElement;

    axios
      .get(`http://localhost:5000/edit-expense/${currentExpense.id}`)
      .then((expense) => {
        const amountField = document.getElementById("amount");
        const descriptionField = document.getElementById("description");
        const categoryField = document.getElementById("category");
        amountField.value = expense.data.amount;
        descriptionField.value = expense.data.description;
        categoryField.value = expense.data.category;

        idToUpdate=currentExpense.id;

        // changes applied for updating the expense in form of expense.html
        addButton.textContent = "Update Expense";
        form.action = "/update-expense";
        form.method = "put";

        isEditing=true;    
        currentExpense.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

