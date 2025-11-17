// // resolved using promises

// function orderPizza() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const pizzaDelivered = Math.random() > 0.5;

//       if (pizzaDelivered) {
//         resolve("Pizza has been delivered!");
//       } else {
//         reject("Pizza delivery failed.");
//       }
//     }, 2000);
//   });
// }

// function orderDessert() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const dessertDelivered = Math.random() > 0.5;

//       if (dessertDelivered) {
//         resolve("Dessert has been delivered!");
//       } else {
//         reject("Dessert delivery failed.");
//       }
//     }, 1000);
//   });
// }

// orderPizza()
//   .then((result) => {
//     console.log(result);

//     return orderDessert();
//   })

//   .then((result) => {
//     console.log(result);
//   })

//   .catch((error) => {
//     console.log(error);
//   });

// modified with the use of async-await

async function foodParty() {
  try {
    function orderPizza() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const pizzaDelivered = Math.random() > 0.5;

          if (pizzaDelivered) {
            resolve("Pizza has been delivered!");
          } else {
            reject("Pizza delivery failed.");
          }
        }, 2000);
      });
    }

    function orderDessert() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const dessertDelivered = Math.random() > 0.5;

          if (dessertDelivered) {
            resolve("Dessert has been delivered!");
          } else {
            reject("Dessert delivery failed.");
          }
        }, 1000);
      });
    }

    const pizzaMsg=await orderPizza();
    console.log(pizzaMsg);

    const dessertMsg=await orderDessert();
    console.log(dessertMsg);
    console.log("Party all Night!!!")

  } catch (error) {
    console.log(error);
    console.log("no Party here_.~._");
  }
}


foodParty();