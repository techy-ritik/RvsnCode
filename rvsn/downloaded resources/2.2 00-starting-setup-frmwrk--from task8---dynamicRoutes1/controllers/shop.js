const Product = require("../models/product");
const Cart = require("../models/cart");
const cartItem = require("../models/cart-item");

console.log("Product", Product);
exports.getIndex = (req, res, next) => {
  Product.findAll() //  here this findAll() method fetches all the saved product from the table(model) and we can set conditions also like where,like etc. in for of object inside paraenthysis, as we execute in sql queries
    .then((products) => {
      // we can use .then and .catch for handling fetched data from database with promises here as we have exported promise from the database util with the sql database
      console.log("products", products);
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  /** below method(with use of sql queries execution) used before sequelize */

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     // we can use .then and .catch for handling fetched data from database with promises here as we have exported promise from the database util with the sql database
  //     // here we are using array destructuring as when output the fetched data in for of result in then block then we have to separately store the array's elements like 'const rows = res[0]; and cosnt fieldData = res[1]; ' but with array destructuring we can directly pullout those data in the passed arguments like 1st arg. get index 0 element stored and so on
  //     console.log("rows", rows);
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      //  so here products will carry the actual products data which is saved in the table
      console.log("products", products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  /** below method(with use of sql queries execution) used before sequelize */

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     // here we are using array destructuring as when output the fetched data in for of result in then block then we have to separately store the array's elements like 'const rows = res[0]; and cosnt fieldData = res[1]; ' but with array destructuring we can directly pullout those data in the passed arguments like 1st arg. get index 0 element stored and so on
  //     //  so here rows will carry the actual products data which is saved in the table and fieldData will carry the metaData(cahracterisctic of each column about conditions that is set for the columns)
  //     console.log("rows", rows);
  //     console.log("fieldData", fieldData);
  //     res.render("shop/product-list", {
  //       prods: rows,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // we use req.params to extract values from the dynamic part available in the url and the productId is the variable to be set same as which is used in the route so that we can extract it's value
  console.log("prodId", prodId);

  /** aproach 1(using findByPK method of sequelize) */
  Product.findByPk(prodId) // here we use findByPk() inbuilt method of sequelize to fetch single product from database
    .then((product) => {
      console.log("product of getProduct", product);
      res.render("shop/product-detail", {
        // as res.render specially desgined for ejs files so when we call it we don't need to enter full path, as it always look into views folder so we just need to enter folder and file name inside of views
        product: product, // here product is the key which is set so that it can be accessed in the view
        pageTitle: product.title,
        path: "/products", // sending path variable like this for active navigation links works only with ejs.
      });
    })
    .catch((err) => {
      console.log(err);
    });

  /** alt. aproach(using findAll() with where condition of sequelize) */
  // Product.findAll({ where: { id: prodId } })
  //   .then((products) => {
  //     console.log("product of getProduct", products);
  //     res.render("shop/product-detail", {
  //       // as res.render specially desgined for ejs files so when we call it we don't need to enter full path, as it always look into views folder so we just need to enter folder and file name inside of views
  //       product: products[0], // here product is the key which is set so that it can be accessed in the view
  //       //  here when we use findAll() method for fetching data then it always responds with an array, whether there is single product or multiple, so we have to extract first element from the array by using index 0.
  //       pageTitle: products[0].title,
  //       path: "/products", // sending path variable like this for active navigation links works only with ejs.
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //
  //
  /** below method(with use of sql queries execution) used before sequelize */

  // Product.findById(prodId)
  //   .then(([product]) => {
  //     console.log("product of getProduct", product);
  //     res.render("shop/product-detail", {
  //       // as res.render specially desgined for ejs files so when we call it we don't need to enter full path, as it always look into views folder so we just need to enter folder and file name inside of views
  //       product: product[0], // here product is the key which is set so that it can be accessed in the view
  //       // as when we pass only product then it still in array form and the product object get wrapped inside that array so we ahve to pass that object with index 0 as there will be only only element inside that product array
  //       pageTitle: product[0].title,
  //       path: "/products", // sending path variable like this for active navigation links works only with ejs.
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getCart = (req, res, next) => {
  console.log("inside getCart");
  console.log("req.user.getCart", req.user.getCart);
  //* we cannot get cart data through req.user.cart as because we can't access the cart as proeprty so we have to fetch data through .getCart() magic method only
  req.user //  here we are using req.user so that we can get only those cart which belongs to the loggedIn user as we know req.user object has been created for that purpose itself
    .getCart() // here magic method .getCart() is used (which is provided by sequelize after establishing relation between user and the cart) for fetching cart table as we can't use cart directly 'req.user.cart' for getting it's data and it is used with the req.user object so it fetches those data only which belongs to the current loggedIn user
    .then((cartData) => {
      // we are getting response of the .getCart here in cartData which is actually the instance of cart model so we can use magic method associated from the association of user and cart models
      console.log("cartData", cartData);
      return cartData
        .getProducts() //  here we are using magic method .getProducts for fetching cart products, by using it with the response(in the cartData) we recieved in .then() block and as cart model is in Association with product model through cartItem so the sequelize will check the cartItem model also for the Products data
        .then((products) => {
          // here the recieved response(products) in .then() will have product details from instance of product model of those items which is available in cartItem model
          // here the 'products' argument will have the data from the cartItem also as because when call .getProducts here then it fetches data from the junction table(cartItem) also, so it stores all the data of the cartItem separately as an object with other fields of the product(e.g. product : {id:1,title:pen,cartItem:{cartId:1,productId:1,quantity:3}})
          console.log("getCartProducts", products); // here we are getting output as the product details are stored inside datavalues object which is inside the array i.e.->(products[datavalues{product fields}]) so in normal js we have to use product[0].datavalues.title for getting title or any detials of the product but as we use sequelize here so in sequelize it uses getter method internally by which we can acces any product field directly with reference to product like->(product[0].title) so we are passing the products array directly for rendering where all field can be accessed directly
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          });
        }) //  we can also use nested .then() block for getting response from the promise which we returning in previous .then() but it is better to do it in chained .then() when we return any promise in previous .then()
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; // here as the user is hitting add to cart through form for any particular product so the req.body contain input data of that form of single product only and productId is the name of the input value for id of that item which can be extracted and used here
  console.log(prodId);

  let fetchedCart; // we have to create this variable to store the accessed cart in it so that it can we used for applying magic methods with accessed cart refernece for adding new product in the cart or for using the it anywhere required within the scope of this middleware
  let newQuantity = 1; // for storing quntity for new product which is to be added in the cart we have to set newQuantity which get increased if the product is already in the cart and we add more of it again
  req.user
    .getCart() // here we are basically getting access to the cart of the loggedIn user by calling it through this magic method so that we can manage the data in the cart, and by handling response in the .then() we can also use cart for calling other magic methods for implimentation of add product to the cart
    .then((cart) => {
      fetchedCart = cart; //  here accessed cart got stored in the fetchedCart variable and now it can be used further anywhere within this middleware scope
      return cart.getProducts({ where: { id: prodId } }); //  here basically we are checking whether the product which we are going to add in cart is already available in the cart or not, for which, sequelize internally try to fetch that product from the Product table, for that -> it checks for the accessed cartId in the cartItem and the corresponding productId of that row with passed prodId and if both matches correctly then it further fetch that product details from the products table as an array and if it fails to match in the cartItem then it returns the empty array and depending on the availability of the product, addProduct functionaility will be implimented in next .then() where the response for this promise will get handled
    })
    .then((products) => {
      //  here as we know the magic methods return the product in array form which will contain either no product(empty array) if that product is not yet added in the cart or only single product which is fetched using prodId as per sequelize internal execution
      let product;
      if (products.length > 0) {
        // as we are recieving either empty or single element in the array so for extracting recieved product from array, it should have any element, that means it should have array length > 0 so, that's why this if condition is added for storing extracted product in separate variable otherwise the product variable get undefined for empty value if we try to store product element without if condition then it will run for empty array also and get undefined
        product = products[0];
      }

      if (product) {
        // here we are adding if condition for quantity increment when product is available in the cart for that we have to get old available quantity of that product
        const oldQunatity = product.cartItem.quantity;
        newQuantity = oldQunatity + 1;
        return product; //  here we are returning the product so that the correct existing product get passed in the next chained .then() block and further code not get executed which is for new product when product is not available in the cartItem
      }

      return Product.findByPk(prodId); // here if the product is not available in the cart then we will fetch that product from the product table and then it got added in the cart while handling this promise response in the .then()
      //  // here we are using nested .then() becuase with this we can access and use variables that has been initiated in it's outer scope i.e. upper .then() block without manually returning(passing) from there ; and it has received the fetched product by prodId through product argument
      // .then((product)=>{
      //   return fetchedCart.addProduct(product, {
      //     through: { quantity: newQuantity },
      //   }); // here we are using magic method .addProduct for adding single product row in the junction table(cartItem), which is provided by sequelize for many to many associations, in which we pass the fetched product in the pranthesis and, as we also have extra field quantity in the cartItem(junction table), so to add quantity of the product in that, we have to pass it separateley with 'through' keyword because we use 'through' for managing junction table between thr cart and product association

      // })
      // .catch((err)=>{
      //   //  as here we are returning the Product.findByPk promise so we can skip to add .catch() for handling err for the nested .then() as when we return the promise the outer .catch() can handle the err of nested .then() also but if we don't return it and we call the methods normally then outer .then() doesn't know about inner .then(), in that case we have to add .catch() with nested .then() for handling it's err
      //   console.log(err);
      // });
    })
    .then((product) => {
      //  initially we were using this .addProduct magic method for adding new product in cartItem and incrementing quantity for existing product separately for that we ahve to run this method two times and also ahev to use nested .then() for new product as above but here we can handle both the case under single .then() chained block as
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      }); //  here when we use this .addProduct() magic method then it adds new record in the junction table with through keyword and also when we wants to update some field of already existing record then it also does that like here it's updating the quantity of the existing product
    })
    .then(() => {
      console.log("cart updated with product");
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  console.log("inside postCartDeleteProduct");
  const prodId = req.body.productId;
  console.log("prodId to delete", prodId);

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy(); // here like this we can delete product from only cartItem(junction table) and not from the products table and with that the produc will get only removed from cart page and not from products page
    })
    .then(() => {
      console.log("product deleted from cart");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
  // here for deleting product from the cart we are first accessing the cart through req.user.getCart and then we are fetching product thorugh .getProducts() from product table and when we destroy the fetched tproduct then it will delete it from the cartItem(junction table) also

  /** alt. approach(functionality) done by self(not added by trainer) for deleting product only from cart page and not from products page by fetching product directly from cartItem without accessing cartitem through cart and product model junction mode*/
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     const fetchedCartId = cart.id;
  //     console.log("cartId", fetchedCartId);
  //     return cartItem.findOne({
  //       where: { productId: prodId, cartId: fetchedCartId },
  //     }); // here we are using findOne() method of sequelize to fetch single row(product) from the cartItem using id other than primaryKey
  //   })
  //   .then((product) => {
  //     // console.log("product to delete", product);
  //     return product.destroy();
  //   })
  //   .then(() => {
  //     console.log("product deleted from cart");
  //     res.redirect('/cart')
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

/** quantity adjustment functionality added by self choice(not added by trainer) */
exports.cartProductQuantity = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return fetchedCart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      // console.log("fetchedProductsForIncrease", products);
      const oldQuantity = products[0].cartItem.quantity;

      let newQuantity;
      const action = req.body.action; // we are accessing button type by extracting it through req.body from recieved data of the client side in which name of button is set as 'action' and value as incrrease for '+' and decrease for '-', so with the use of this we can handle quantity adjustment on click of the "+" or "-" button
      console.log("action", action);
      if (action == "decrease") {
        if (oldQuantity <= 1) {
          return products[0].cartItem.destroy(); // here like this we can delete product from only cartItem(junction table) and not from the products table and with that the produc will get only removed from cart page and not from products page
        }
        newQuantity = oldQuantity - 1;
      } else {
        newQuantity = oldQuantity + 1;
      }
      return fetchedCart.addProduct(products[0], {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      console.log("quanity updated!!");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      // console.log("fetched Cart products", products);

      return req.user
        .createOrder() // here we are creating new order by using magic method .createOrder() provided by sequelize after establishing association between user and order model and which is associated with the current logedIn user and the products added for this user in the cart will get stored in the orderItems(junction table) just like cartItem
        .then((order) => {
          //  whenever we hit order now button in cart page a new order will get created and it's instance get returned here in this .then() block

          return order.addProducts(
            products.map((product) => {
              // here for adding products to the orderPage(orderItem(junction table)) we have to pass fetched products array with some modification(product quantity inside orderItem object key) added in it, for that, we have used .map() method which gives new copy of array where we can modify data without changing the original array
              product.orderItem = { quantity: product.cartItem.quantity }; // this is the new key of orderItem object added in each product element containing quantity inside
              // console.log("modified product element", product);
              return product; // we have to return each traversed product, so that modified element get passed in the .addProducts() as we are using .map() method whose functionality is to return the copied array after modification
            }),
          );
          //  here we are storing all the product from the products array which is fetched from the cart in the orderItem and there we need quantity field also to be added which cannot be directly get added from products array as the quantity are stored inside 'cartItem' key of each element(product object) and as here the junction table name is orderItem so it's not going to check for quantity in cartItem so we need to add a new key as orderItem having quantity stored inside it. so we are using .map() here for traversing through all the product element of the array and a new key as orderItem object same as cartItem containing quantity inside get added in product element and then new copy of each product with orderItem added in it get passed in .addProducts() where it store every field data of orderItem(junction table) by getting data from each product element of products array and for quantiy(which is not directly available as key of product object) it looks for orderItem(same name as of junction table name) and after getting quantiy inside orderItem object it extracts and store in the orderItem(junction table).
        })
        .catch((err) => {
          console.log(err);
        });
      //here we are using nested .then() block so that it'll be convenient to use 'products' recieved in the one level upper .then() block
    })
    .then((Products) => {
      // here .then() will contain all the added products of the orderItem table which is recieved from the return of order.addProducts()
      // console.log("added order products:", Products);

      return fetchedCart.setProducts(null); // we use .setProducts(null) sequelize method to clear the complete table and here we are using it to clear the cartItem table after all the products of cartItem get stored in the orderItem table before recieiving response in this .then() block
    })
    .then(() => {
      console.log("products added in orderItems");
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] }) // here we are adding '{include:['products']}' while fetching orders array which include products array of each order which have product list and orderItems inside it, and here we are using products(association name generated by Sequelize due to belongsToMany association Order and Product) bcz an order can have multiple products so sequelize converts it to plural form, and we can use this feature only if the product(included model) is in association with the order
    // here when we use include then sequelize internally permorms joins between product and order for fetching product list data for each order as we know when we call .getOrders() then we get an array of order and we can also use .getProducts() for fetching products of each order by using looping and traversing through the orders array as we are doing earlier for getting cart products after accessing cart but as there is only one cart so it's worth to use .getProducts() but as here we are getting multiple order so with .getProducts() it's time consuming as there will be query runnning for each order which somewhat slows the process also so that's why we are using include feature, as with this we can fetch products(it'll also be an array of all product under one order) data for each order with single query which use joins
    .then((orders) => {
      console.log("orders", orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/** initially worked with fileSystem database and now after adding sql database fileSystem is removed so I've commented it for the added comment notes*/

// const Product = require("../models/product");
// const Cart = require("../models/cart");

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: "/products",
//     });
//   });
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId; // we use req.params to extract values from the dynamic part available in the url and the productId is the variable to be set same as which is used in the route so that we can extract it's value
//   console.log("prodId", prodId);
//   Product.findById(prodId, (foundProduct) => {
//     // here id is sent back to findById by passing prodId and product data received through callback function which is defined here and got stored in the foundProduct
//     console.log("foundProduct", foundProduct);
//     res.render("shop/product-detail", {
//       // as res.render specially desgined for ejs files so when we call it we don't need to enter full path, as it always look into views folder so we just need to enter folder and file name inside of views
//       product: foundProduct, // here product is the key which is set so that it can be accessed in the view
//       pageTitle: foundProduct.title,
//       path: "/products", // sending path variable like this for active navigation links works only with ejs.
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "Shop",
//       path: "/",
//     });
//   });
// };

// exports.getCart = (req, res, next) => {
//   console.log("inside getCart");
//   Cart.getCart((cart) => {
//     Product.fetchAll((adminProducts) => {
//       // we have to call product model also to display some more details of the product in the cart which is not available in the cart database
//       const cartProducts = [];
//       for (let product of adminProducts) {
//         const cartProductData = cart.products.find(
//           (prod) => prod.id === product.id,
//         ); // here it will check through all the product of the adminProduct and try to match that product in the cart, and if it finds that product in the cart then return it and will get stored in cartProductData at each loop iteration
//         if (cartProductData) {
//           //  and now if condition will be validated as true if the product found and if it is not found and nothing returned then if condition will be false
//           cartProducts.push({ productData: product, qty: cartProductData.qty }); //   here now cartProducts will store all those product of the adminProduct database file which is available in cart also but as the qty data is only available in cart databse so we have to pass qty separately through cartProductData as this is the product we are extracting with find method at each loop iteration
//         }
//       }
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: cartProducts,
//       });
//     });
//   });
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId; // here as the user is hitting add to cart through form for any particular product so the req.body contain input data of that form of single product only and productId is the name of the input value for id of that item which can be extracted and used here
//   console.log(prodId);

//   Product.findById(prodId, (foundProduct) => {
//     //  as we are storing product id and product price in the cart model(database) so we have to extract price by fetching the single product of that particular id
//     Cart.addProduct(prodId, foundProduct.price);
//     res.redirect("/cart");
//   }); // here for passing product price we have to fetch single product from the id for that we have to call findById and then we can pass id and price in the addProduct method of cart model
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   console.log("inside postCartDeleteProduct");
//   const prodId = req.body.productId;
//   // const ProdPrice = req.body.productPrice;      // we could have also extracted the product price by passing it through the form hidden input

//   Product.findById(prodId, (product) => {
//     // with this approch we can get product price without depending on the client side for sending the price data and it's good to remove dependency on client side for data, as much possible as it can be
//     Cart.deleteCartProductById(prodId, product.price);
//     res.redirect("/cart");
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//   });
// };

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
