function concertPassPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let concertPromise = Math.random();
      if (concertPromise > 0.5) {
        resolve("Pass received");
      } else {
        reject("Pass not received");
      }
    }, 3000);
  });
}

concertPassPromise()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
