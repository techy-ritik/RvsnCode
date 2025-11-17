// //Used callback for the correct ordering

// function buyBike(callback1, callback2, callback3) {
//   setTimeout(function () {
//     console.log("Bought Royal Enfield Himalayan");
//     callback1(callback2, callback3);
//   }, 2000);
// }

// function planTrip(callback1, callback2) {
//   setTimeout(function () {
//     console.log("Trip to Ladakh planned");

//     callback1(callback2);
//   }, 1000);
// }

// function reachLadakh(callback) {
//   setTimeout(function () {
//     console.log("Reached Ladakh");

//     callback();
//   }, 1000);
// }

// function visitPangongLake() {
//   setTimeout(function () {
//     console.log("Visited Pangong Lake");
//   }, 500);
// }

// buyBike(planTrip, reachLadakh, visitPangongLake);

// // modified with the use of promises

function buyBike() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("Bought Royal Enfield Himalayan");
    }, 2000);
  });
}

function planTrip() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("Trip to Ladakh planned");
    }, 1000);
  });
}

function reachLadakh() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("Reached Ladakh");
    }, 1000);
  });
}

function visitPangongLake() {
  setTimeout(function () {
    console.log("Visited Pangong Lake");
  }, 500);
}
  

buyBike()
  .then((res) => {
    console.log(res);
    planTrip().then((res) => {
      console.log(res);
      reachLadakh().then((res) => {
        console.log(res);
        visitPangongLake();
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
