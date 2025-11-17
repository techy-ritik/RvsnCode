// // resolved using promises

// function checkCar() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const carReady = Math.random() > 0.5;

//       if (carReady) {
//         resolve("Car is ready");
//       } else {
//         reject("Error: Car needs maintenance");
//       }
//     }, 2000);
//   });
// }

// function packForPicnic() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const itemsPacked = Math.random() > 0.5;

//       if (itemsPacked) {
//         resolve("Packed everything for picnic");
//       } else {
//         reject("Error: Not have some essentials");
//       }
//     }, 1000);
//   });
// }

// checkCar()
//   .then((result) => {
//     console.log(result);

//     return packForPicnic();
//   })

//   .then((result) => {
//     console.log(result);
//   })

//   .catch((error) => {
//     console.log(error);
//   });

// modified with the use of async-await

async function vacationTrip() {
  try {
    function checkCar() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const carReady = Math.random() > 0.5;

          if (carReady) {
            resolve("Car is ready");
          } else {
            reject("Error: Car needs maintenance");
          }
        }, 2000);
      });
    }

    function packForPicnic() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const itemsPacked = Math.random() > 0.1;

          if (itemsPacked) {
            resolve("Packed everything for picnic");
          } else {
            reject("Error: Not have some essentials");
          }
        }, 1000);
      });
    }

    const carMsg=await checkCar();
    console.log(carMsg);
    const packingMsg=await packForPicnic();
    console.log(packingMsg);
    console.log("Vacation utilized nicely .''.")
      
  } catch (error) {
    console.log(error);
    console.log("vacation wasted ..@#$")
  }
}

vacationTrip();