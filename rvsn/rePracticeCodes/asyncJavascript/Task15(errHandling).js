function boardOnBus() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const boardOnBus = Math.random();
      if (boardOnBus > 0.5) {
        resolve("Got the bus");
      } else {
        reject("Error : Bus missed");
      }
    }, 3000);
  });
}

boardOnBus()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
                        