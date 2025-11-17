//  //resolved with promises

// function boardBusAt10() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const busArrivesAt10 = Math.random() > 0.5;

//       if (busArrivesAt10) {
//         resolve("Board the bus");
//       } else {
//         reject("Error: Bus is late.");
//       }
//     }, 3000);
//   });
// }

// boardBusAt10()
//   .then((result) => {
//     console.log(result);
//   })

//   .catch((err) => {
//     console.log(err);
//   });

//modified with the use of async-await

async function busBoarding() {
  try {
    function boardBusAt10() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const busArrivesAt10 = Math.random() > 0.5;

          if (busArrivesAt10) {
            resolve("Board the bus");
          } else {
            reject("Error: Bus is late.");
          }
        }, 3000);
      });
    }

    const boardMsg = await boardBusAt10();
    console.log(boardMsg);
  } catch (error) {
    console.log(error);
  }
}

busBoarding();

// //use of await for settimeout based timed events


// async function timedEvents() {
//   console.log("event a");

//   const b = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("event b");
//     }, 2000);
//   });
//   console.log(b);

//   const c = await new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve("event c")
//     }, 3000);
//   })
//   console.log(c);

//   console.log("event d");
// }

// timedEvents();