function orderFood(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            const foodDelivered=Math.random();
            if(foodDelivered>0.5){
                resolve("Food Delivered")
            }else{
                reject("Food not Delivered")
            }
        }, 2000);
    })
}

function orderDessert(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            const dessertDelivered=Math.random()
            if(dessertDelivered>0.5){
                resolve("Dessert Delivered")
            }else{
                reject("Dessert not Delivered")
            }
        }, 2000);
    })
}

orderFood().then((foodMsg)=>{
    console.log(foodMsg)
    return orderDessert();
}).then((dessertMsg)=>{
    console.log(dessertMsg);
    console.log("wish of Dream meal got fulfilled")
}).catch(err=>{
    console.log(err);
    console.log("wish failed");
})