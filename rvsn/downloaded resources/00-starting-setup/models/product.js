const products = [];

module.exports = class product{
    constructor(t){
        this.title=t   // here "this" refers to the object which is created with the use of the contructor and "t" parameter get value from the addProduct form input which is sent back by the server and passed in while object creation
    }                   //  here title is the key set for the values that is getting stored in the object

    save(){   //  it is same as function but without function keyword
        products.push(this)  // so here when we push this in the array that means we are string complete object in it
    }

    static fetchAll(){   // static keyword is used here which assures that the method is called on the "products" class and don't touches the object
        return products;
    }
}    //  here actually class is created so that we can define required customized methods and which can we then use at different places