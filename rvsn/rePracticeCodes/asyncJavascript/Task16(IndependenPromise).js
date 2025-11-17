const projectorPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const checkProjector = Math.random();
    if (checkProjector > 0.5) {
      resolve("Projector rented successfully");
    } else {
      reject("Error: Projectors out of stock");
    }
  }, 1000);
});

const pizzasPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const checkPizza = Math.random();
    if (checkPizza > 0.5) {
      resolve("Pizzas delivered at time");
    } else {
      reject("Error: Pizzas not delivered on time");
    }
  }, 2000);
});

const friendsPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const checkFriends = Math.random();
    if (checkFriends > 0.5) {
      resolve("Both friends available");
    } else {
      reject("Error: Both friends not available");
    }
  }, 3000);
});

Promise.all([projectorPromise, pizzasPromise, friendsPromise]).then((res) => {
  console.log(res);
})
.catch(err=>{
    console.log(err);
})