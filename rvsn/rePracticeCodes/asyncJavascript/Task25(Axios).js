const postBtn = document.getElementById("post_request");
const getBtn = document.getElementById("get_request");
const updateBtn = document.getElementById("put_request");
const deleteBtn = document.getElementById("delete_request");

postBtn.addEventListener("click", postRequest);
getBtn.addEventListener("click", getRequest);
updateBtn.addEventListener("click", putRequest);
deleteBtn.addEventListener("click", deleteRequest);

function postRequest() {
  console.log("request posting.....");
  const Payload = { title: "work consistently ", completed: false };

  const Payload1 = { title: "work regularly", completed: true };

  axios.post(
    "https://crudcrud.com/api/f8a8b271fa2c4afaaa256ae5824954cc/workMech",
    Payload1
  )
  .then((res)=>{
    console.log(res.data)
  })
  setTimeout(() => {
    console.log("request Posted");

  }, 2000);

}

function getRequest() {
  const rcvdData = axios.get(
    "https://crudcrud.com/api/f8a8b271fa2c4afaaa256ae5824954cc/workMech"
  );
  rcvdData.then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      setTimeout(() => {
        console.log(res.data[i].title,i);
      }, i * 1000);
    }
  });
}


function putRequest() {
  const Payload = { title: "work consistently regularly", completed: true, timeRqrd: "5_hrs" };
  axios
    .put(
      "https://crudcrud.com/api/f8a8b271fa2c4afaaa256ae5824954cc/workMech",
      Payload
    )
    .then((res) => {
      console.log(res.data.title);
    });
}


function deleteRequest() {
  axios
    .delete(
      "https://crudcrud.com/api/f8a8b271fa2c4afaaa256ae5824954cc/workMech/693193eb66f90d03e8057ab9"
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err)=>{
      console.log(err)
    })
}
