const createTableFormPopup = document.querySelector(".popup");
const tableForm = document.querySelector(".tableForm");

const newTableBtn = document.querySelector(".btn");
newTableBtn.addEventListener("click", () => {
  createTableFormPopup.style.display = "flex";
});

const formCloseBtn = document.querySelector(".close");
formCloseBtn.addEventListener("click", () => {
  createTableFormPopup.style.display = "none";
});

const addFieldBtn = document.querySelector(".addFieldBtn");
let fieldData = document.querySelector(".fieldData");

addFieldBtn.onclick = () => {
  const newField = fieldData.cloneNode(true);
  newField.querySelector("#fieldNames").value = "";

  tableForm.insertBefore(newField,addFieldBtn);
};

tableForm.addEventListener("submit", (event) => {
  event.preventDefault();
    fieldData = [...document.querySelectorAll(".fieldData")];   // here we are string fieldData as array with the help of spread operator so that we can use .map because .map works with arrays only
    
  const createTableObj = {
    tableName: document.getElementById("tableName").value,
    fields: fieldData.map(field =>({                   //  here .map return the array of object containing the fieldName and type and get stored in fields
          fieldName: field.querySelector("#fieldNames").value,
          type: field.querySelector("#type").value,   
      }))
  };
  console.log("createTablebj", createTableObj.fields);

  axios.post("http://localhost:4000/create-table",createTableObj)
  .then((createdTable)=>{
    console.log("result",createdTable.data);
    const nav = document.querySelector('nav');
    const tableBtn = document.createElement('button')
    const tableBtnText = document.createTextNode(createdTable.data);
    tableBtn.appendChild(tableBtnText);
    tableBtn.className = 'table-btn';
    tableBtn.addEventListener('click',getTableRecord)

    nav.insertBefore(tableBtn, newTableBtn);

  })
  .catch((err)=>{
    console.log(err);
  })
});

function getTableRecord(){
  
}