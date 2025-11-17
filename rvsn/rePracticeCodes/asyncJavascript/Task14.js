Promise.resolve("this is a type of sortHand promise").then(res=>{
    console.log(res);
})

const promise=new Promise(resolve=>{
    resolve("this is normal structure of promise")
})

promise.then(res=>{
    console.log(res)
})