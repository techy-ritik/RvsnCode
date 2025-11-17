// //Used callback for the correct ordering

// function boilWater(callback1, callback2, callback3) {

//  setTimeout(() => {

//   console.log("Water boiled");

//   callback1(callback2, callback3);

//  }, 2000);

// }

// function addCoffeePowder(callback1, callback2) {

//  setTimeout(() => {

//   console.log("Added coffee powder");

//   callback1(callback2);

//  }, 500);

// }

// function brewCoffee(callback) {

//  setTimeout(() => {

//   console.log("Brewed coffee");

//   callback();

//  }, 1000);

// }

// function haveCoffee() {

//  setTimeout(() => {

//   console.log("Enjoying my coffee");

//  }, 3000);

// }

// boilWater(addCoffeePowder, brewCoffee, haveCoffee);



// // modified with the use of promises

// function boilWater() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Water boiled");
//     }, 2000);
//   });
// }

// function addCoffeePowder() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Added coffee powder");
//     }, 500);
//   });
// }

// function brewCoffee() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Brewed coffee");
//     }, 1000);
//   });
// }

// function haveCoffee() {
//   setTimeout(() => {
//     console.log("Enjoying my coffee");
//   }, 3000);
// }

// //Here in all the promises which is returned, there is only one statement to be displayed, As there is no condition is applied for occurance of any event so there is no need handle the reject case and that's why i've not passed the reject parameter.

// boilWater()
//   .then((res) => {
//     console.log(res);
//     addCoffeePowder().then((res) => {
//       console.log(res);
//       brewCoffee().then((res) => {
//         console.log(res);
//         haveCoffee();
//       });
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });



const fn =()=>( new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
    resolve("Hlo");
  },0);
  
}));

fn()

console.log(2)
// promise1.then((res) => {
//   // console.log(res);
//   console.log(2)
// });