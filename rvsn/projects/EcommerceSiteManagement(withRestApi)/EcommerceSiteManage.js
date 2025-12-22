const form = document.querySelector("form");
const ul = document.querySelector("ul");

const api = "https://crudcrud.com/api/c24421353f8f406fa65a09ba3a8e33e6";
let totalPrice = 0;
const totalValue = document.createElement("h3");
const body = document.querySelector("body");
body.appendChild(totalValue);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newProduct = {
    price: document.getElementById("price").value,
    itemName: document.getElementById("product").value,
  }; 

  axios
    .post(api + "/productList", newProduct)
    .then((res) => {
      itemView(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

axios
  .get(api + "/productList")
  .then((res) => {
    res.data.forEach((element) => {
      itemView(element);
    });
  })
  .catch((err) => {
    console.log(err);
  });


function itemView(productData) {
  const newLi = document.createElement("li");
  newLi.id = productData._id;

  newLi.innerText = `Rs. ${productData.price} - for ${productData.itemName} - `;
  const dltBtn = document.createElement("button");
  const dltBtnText = document.createTextNode("Delete");
  dltBtn.appendChild(dltBtnText);
  newLi.appendChild(dltBtn);
  dltBtn.type = "button";
  dltBtn.className = "delete";
  dltBtn.addEventListener("click", dltProduct);

  ul.appendChild(newLi);

  totalPrice += Number(productData.price);
  totalValue.innerText = `Total Value Worth of Products :- ${totalPrice}`;

  console.log(totalValue);
}

function dltProduct(event) {
  if (event.target.classList.contains("delete")) {
    const currentProduct = event.target.parentElement;
    const curentProductPrice = currentProduct.textContent.split(" - ");
    axios
      .delete(api + "/productList/" + currentProduct.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    ul.removeChild(currentProduct);
    totalPrice -= Number(curentProductPrice[0]);
    totalValue.innerText = `Total Value Worth of Products:- ${totalPrice}`;
  }
}

