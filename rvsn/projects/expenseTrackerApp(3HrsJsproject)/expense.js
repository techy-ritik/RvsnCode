const form = document.querySelector("#ExpenseForm");
const ul = document.querySelector("ul");
let storedCategory = document.getElementById("category").value;



//Submit function after hitting add expense button
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newLi = document.createElement("li");
  newLi.className = "expenseList";
  ul.appendChild(newLi);

  storedCategory = document.getElementById("category").value;

  const expenseObject = {
    xpAmount: document.getElementById("amount").value,
    xpDesc: document.getElementById("description").value,
    xpCtgry: document.getElementById("category").value, 
  };

  
  const serializedExpenseObject = JSON.stringify(expenseObject);
  localStorage.setItem(storedCategory, serializedExpenseObject);

  const deserializedExpenseObject = JSON.parse(
    localStorage.getItem(storedCategory)
  ); // fetching object from localStorage to use for outputing values of the keys of object

  newLi.innerHTML = `${deserializedExpenseObject.xpAmount} -- ${deserializedExpenseObject.xpCtgry} -- ${deserializedExpenseObject.xpDesc} -- `; // here object is used which is fetched from localStorage so the object name is deserializedExpenseObject

  const dltBtn = document.createElement("button");
  const dltBtnText = document.createTextNode("Delete Expense");
  dltBtn.appendChild(dltBtnText);
  dltBtn.className = "btn-danger";
  dltBtn.onclick = () => {
    dltBtn.parentElement.remove();
    localStorage.removeItem(storedCategory);
  };
  newLi.appendChild(dltBtn);

  const editBtn = document.createElement("button");
  const editBtnText = document.createTextNode("Edit Expense");
  editBtn.appendChild(editBtnText);
  editBtn.className = "edit-btn";
  editBtn.onclick = () => {
    console.log(editBtn.parentElement.firstChild);
    const expenseDetailsToEdit =
      editBtn.parentElement.firstChild.textContent.split(" -- ");
    document.getElementById("amount").value = expenseDetailsToEdit[0];
    document.getElementById("category").value = expenseDetailsToEdit[1];
    document.getElementById("description").value = expenseDetailsToEdit[2];
  };
  newLi.appendChild(editBtn);
});


// fetch and displays data prestored in the localStorage
const localStorageDataKeys = Object.keys(localStorage);
for (let i = 0; i < localStorageDataKeys.length; i++) {
  const newLi = document.createElement("li");
  newLi.className = "expenseList";
  ul.appendChild(newLi);

  const deserializedExpenseObject = JSON.parse(
    localStorage.getItem(localStorageDataKeys[i])
  );

  newLi.innerHTML = `${deserializedExpenseObject.xpAmount} -- ${deserializedExpenseObject.xpCtgry} -- ${deserializedExpenseObject.xpDesc} -- `;

  const dltBtn = document.createElement("button");
  const dltBtnText = document.createTextNode("Delete Expense");
  dltBtn.appendChild(dltBtnText);
  dltBtn.className = "btn-danger";
  dltBtn.onclick = () => {
    dltBtn.parentElement.remove();
    localStorage.removeItem(storedCategory);
  };
  newLi.appendChild(dltBtn);

  const editBtn = document.createElement("button");
  const editBtnText = document.createTextNode("Edit Expense");
  editBtn.appendChild(editBtnText);
  editBtn.className = "edit-btn";
  editBtn.onclick = () => {
    console.log(editBtn.parentElement.firstChild);
    const expenseDetailsToEdit =
      editBtn.parentElement.firstChild.textContent.split(" -- ");
    document.getElementById("amount").value = expenseDetailsToEdit[0];
    document.getElementById("category").value = expenseDetailsToEdit[1];
    document.getElementById("description").value = expenseDetailsToEdit[2];
  };
  newLi.appendChild(editBtn);
}