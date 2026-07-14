const body = document.querySelector("body");
const createTableFormPopup = document.querySelector(".popup");
const tableForm = document.querySelector(".tableForm");

const newTableBtn = document.querySelector(".btn");
newTableBtn.addEventListener("click", () => {
  createTableFormPopup.style.display = "flex";
});

const formCloseBtn = document.querySelector(".close");
formCloseBtn.addEventListener("click", () => {
  createTableFormPopup.style.display = "none";
  tableForm.reset();

  const fieldNameInput = document.querySelectorAll("#fieldName");
  const typeSelect = document.querySelectorAll("#type");

  fieldNameInput.forEach((input, index) => {
    if (index > 0) {
      input.remove();
      typeSelect[index].remove();
    }
  });
});

const addFieldBtn = document.querySelector(".addFieldBtn");
const fieldData = document.querySelector(".fieldData");

addFieldBtn.onclick = () => {
  // const newField = fieldData.cloneNode(true);

  const fieldNameDiv = document.querySelector(".fieldName");
  const fieldNameInput = document.querySelector("#fieldName");
  const newFieldNameInput = fieldNameInput.cloneNode(true);
  newFieldNameInput.value = "";
  fieldNameDiv.appendChild(newFieldNameInput);

  const typeDiv = document.querySelector(".type");
  const typeSelect = document.querySelector("#type");
  const newTypeSelect = typeSelect.cloneNode(true);
  typeDiv.appendChild(newTypeSelect);
};

function addTableToNav(tableName) {
  const nav = document.querySelector("nav");
  const tableBtn = document.createElement("button");
  const tableBtnText = document.createTextNode(tableName);
  tableBtn.appendChild(tableBtnText);
  tableBtn.id = tableName;
  tableBtn.className = "table-btn";
  tableBtn.addEventListener("click", getTableRecord);

  nav.insertBefore(tableBtn, newTableBtn);
}

function showTableRecord(tableFields, fieldsData) {
  const previousTable = document.querySelector(".table-container");
  if (previousTable) {
    previousTable.remove();
  }

  const div = document.createElement("div");
  div.className = "table-container";

  const tableHead = document.createElement("h1");
  const tableHeadText = document.createTextNode(currentTable);
  tableHead.appendChild(tableHeadText);
  div.appendChild(tableHead);

  const table = document.createElement("table");
  const tHead = document.createElement("thead");
  const tBody = document.createElement("tbody");
  const trHead = document.createElement("tr");
  tHead.appendChild(trHead);
  table.appendChild(tHead);
  table.appendChild(tBody);
  table.id = "dynamicTable";
  div.appendChild(table);

  const insrtRcrdBtn = document.createElement("button");
  insrtRcrdBtn.textContent = "Insert Record";
  insrtRcrdBtn.className = "insert-record-btn";
  insrtRcrdBtn.addEventListener("click", insertRecord);
  div.appendChild(insrtRcrdBtn);

  console.log("tableFields", tableFields);
  tableFields.forEach((field) => {
    console.log("field", field);
    const th = document.createElement("th");
    const thText = document.createTextNode(field);
    th.appendChild(thText);
    trHead.appendChild(th);
  });

  console.log("fieldsData", fieldsData);
  fieldsData.forEach((currentFieldData) => {
    const trBody = document.createElement("tr");
    trBody.id = currentFieldData.id;
    tBody.appendChild(trBody);
    tableFields.forEach((field) => {
      console.log("currentFieldData", currentFieldData[field]);
      const td = document.createElement("td");
      const tdText = document.createTextNode(currentFieldData[field]);
      td.appendChild(tdText);
      trBody.appendChild(td);
    });
    const td = document.createElement("td");
    const deleteRecordBtn = document.createElement("button");
    const deleteRecordBtnText = document.createTextNode("Delete");
    deleteRecordBtn.appendChild(deleteRecordBtnText);
    deleteRecordBtn.className = "delete-record";
    td.appendChild(deleteRecordBtn);
    td.addEventListener("click", deleteRecord);
    trBody.appendChild(td);
  });

  const deleteTableBtn = document.createElement("button");
  const deleteTableBtnText = document.createTextNode("Delete Table");
  deleteTableBtn.appendChild(deleteTableBtnText);
  deleteTableBtn.className = "delete-table";
  deleteTableBtn.addEventListener("click", deleteTable);
  div.appendChild(deleteTableBtn);

  body.insertBefore(div, createTableFormPopup);
}

axios
  .get("http://localhost:4000/get-tables")
  .then((tables) => {
    console.log("tables", tables.data);
    tables.data.forEach((table) => {
      addTableToNav(table);
    });
  })
  .catch((err) => {
    console.log(err);
  });

tableForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fieldNameInput = document.querySelectorAll("#fieldName");
  const typeSelect = document.querySelectorAll("#type");

  const fieldNameInputArr = [...fieldNameInput]; // here we are storing fielNameInput as array with the help of spread operator so that we can use array method :- forEach() looping on it
  const typeSelectArr = [...typeSelect];

  console.log("fieldNameInput", fieldNameInputArr);
  console.log("typeSelect", typeSelectArr);
  const createTableObj = {
    tableName: document.getElementById("tableName").value,
    fields: [],
  };

  fieldNameInputArr.forEach((input, index) => {
    createTableObj.fields.push({
      fieldName: input.value,
      type: typeSelectArr[index].value,
    });
  });
  console.log("createTablebj", createTableObj);

  axios
    .post("http://localhost:4000/create-table", createTableObj)
    .then((createdTable) => {
      console.log("result", createdTable.data);
      addTableToNav(createdTable.data);
      alert("Table Created Successfully...");
    })
    .catch((err) => {
      console.log(err);
    });

  createTableFormPopup.style.display = "none";

  tableForm.reset();

  fieldNameInput.forEach((input, index) => {
    if (index > 0) {
      input.remove();
      typeSelect[index].remove();
    }
  });
});

let currentTableFields;
let currentTable;
function getTableRecord(event) {
  if (event.target.classList.contains("table-btn")) {
    console.log("table record function", event.target.textContent);
    currentTable = event.target.textContent;

    axios
      .get(`http://localhost:4000/table-records/${currentTable}`)
      .then((tableRecords) => {
        // console.log("tableRecords",tableColumns.data)

        console.log("tableRecords", tableRecords);
        currentTableFields = tableRecords.data.fields.slice(1); // we are using slice() method of array for copying elements from index 1
        const fieldsData = tableRecords.data.fieldsData;
        console.log("fieldsData", fieldsData);
        showTableRecord(currentTableFields, fieldsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const recordFormDiv = document.querySelector(".recordFormPopup");
function insertRecord() {
  const recordForm = document.querySelector(".insertRecord");

  const closeBtn = document.querySelector(".closeRecordForm");
  closeBtn.addEventListener("click", () => {
    recordFormDiv.style.display = "none";
  });

  const allFields = document.querySelector(".allFields");
  if (allFields) {
    allFields.remove();
  }

  const addRcrdBtn = document.querySelector(".addRecordBtn");
  const fieldsDiv = document.createElement("div");
  fieldsDiv.className = "allFields";
  recordForm.insertBefore(fieldsDiv, addRcrdBtn);

  currentTableFields.forEach((field, index) => {
    if (index < currentTableFields.length - 2) {
      const label = document.createElement("label");
      label.htmlFor = field;
      const input = document.createElement("input");
      input.id = field;
      input.className = "fieldRecord";
      input.placeholder=field;
      label.textContent = field;

      fieldsDiv.appendChild(label);
      fieldsDiv.appendChild(input);
    }
  });

  recordForm.addEventListener("submit", addRecord);

  recordFormDiv.style.display = "flex";
}

function addRecord(event) {
  event.preventDefault();

  const inputFields = document.querySelectorAll(".fieldRecord");
  console.log("fields", inputFields);

  const recordObj = {};
  recordObj.currentTable = currentTable;
  inputFields.forEach((input) => {
    // console.log(input.id,":- ",input.value)
    recordObj[input.id] = input.value;
  });
  console.log("records object", recordObj);

  axios
    .post("http://localhost:4000/insert-record", recordObj)
    .then((currentRecord) => {
      console.log("result", currentRecord.data);

      const currentTableFields = currentRecord.data.fields.slice(1);
      const currentRecordData = currentRecord.data.record;

      console.log("currentRecordData", currentRecordData);

      const tBody = document.querySelector("tBody");
      const trBody = document.createElement("tr");
      trBody.id = currentRecordData.id;
      tBody.appendChild(trBody);
      currentTableFields.forEach((field) => {
        console.log("currentFieldData", currentRecordData[field]);
        const td = document.createElement("td");
        const tdText = document.createTextNode(currentRecordData[field]);
        td.appendChild(tdText);
        trBody.appendChild(td);
      });
      const td = document.createElement("td");
      const deleteRecordBtn = document.createElement("button");
      const deleteRecordBtnText = document.createTextNode("Delete");
      deleteRecordBtn.appendChild(deleteRecordBtnText);
      deleteRecordBtn.className = "delete-record";
      td.appendChild(deleteRecordBtn);
      td.addEventListener("click", deleteRecord);
      trBody.appendChild(td);
    })
    .catch((err) => {
      console.log(err);
    });

  recordFormDiv.style.display = "none";
}

function deleteRecord(event) {
  if (event.target.classList.contains("delete-record")) {
    const currentTr = event.target.parentElement.parentElement;
    console.log("currentTr", currentTr);
    console.log("currentTable", currentTable);
    axios
      .delete(
        `http://localhost:4000/delete-record/${currentTr.id}/${currentTable}`,
      )
      .then((result) => {
        currentTr.remove();
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function deleteTable() {
  console.log("currentTable", currentTable);
  axios
    .delete(`http://localhost:4000/delete-table/${currentTable}`)
    .then((result) => {
      console.log(result.data);

      const currentTableDiv = document.querySelector(".table-container");
      currentTableDiv.remove();
      const currentTableInNav = document.querySelector(`#${currentTable}`);
      currentTableInNav.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
