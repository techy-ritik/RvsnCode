//promise created

function bookSearchPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let bookSearch = Math.random();
        console.log(bookSearch)
        if (bookSearch > 0.5) {
          resolve("Book Found and Promise fullfiled");
        } else {
          reject("Book not Found and Promise not fullfiled");
        }
      }, 0);
      });
    
}



//promise handled

bookSearchPromise()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
