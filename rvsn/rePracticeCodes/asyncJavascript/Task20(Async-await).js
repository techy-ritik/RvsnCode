// // resolved using promises

// function checkWeather() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const isSunny = Math.random() > 0.5;

//       if (isSunny) {
//         resolve("Let us go for picnic");
//       } else {
//         reject("Error: It is cloudy");
//       }
//     }, 3000);
//   });
// }

// checkWeather()
//   .then((result) => {
//     console.log(result);
//   })

//   .catch((err) => {
//     console.log(err);
//   });

//modified with the use of async-await

async function weatherReport() {
  try {
    function checkWeather() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSunny = Math.random() > 0.5;

          if (isSunny) {
            resolve("Let us go for picnic");
          } else {
            reject("Error: It is cloudy");
          }
        }, 3000);
      });
    }

    const weatherMsg = await checkWeather();
    console.log(weatherMsg);
  } catch (error) {
    console.log(error);
  }
}

weatherReport();
