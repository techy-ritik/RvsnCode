function loanSanctionPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        let loanSanction = Math.random();
        if(loanSanction>0.5){
            resolve("Loan sanctioned")
        }else{
            reject("Loan not sanctioned");
        }
    }, 3000);
  });
}


loanSanctionPromise()
.then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err);
})
