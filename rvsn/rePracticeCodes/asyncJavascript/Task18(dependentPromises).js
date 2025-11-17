function checkCar(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            const carCheck=Math.random();
            if(carCheck>0.5){
                resolve("Car is ready");
            }else{
                reject("Error: Car needs maintenance");
            }
        }, 2000);
    })
}


function packForPicnic() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const luggagePack = Math.random();
      if (luggagePack > 0.5) {
        resolve("Packed everything for picnic");
      } else {
        reject("Error: Not have some essentials");
      }
    }, 1000);
  });
}


checkCar().then(carMsg=>{
    console.log(carMsg)
    return packForPicnic()
})
.then(packingMsg=>{
    console.log(packingMsg);
    console.log("Go for picnic");
})
.catch(err=>{
    console.log(err);
    console.log("Picnic cancelled");
})