const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require('./models/product');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})   // here .belongsTo() is used for establishing association between the two tables in which it means that Product table will be connected with the user table and will add an userId column in product table as foreign key which will be the primary key of the user table and it shows that how many product of the product table belongs to single user for which, through userId it is identified (it's like,- a single userId will be added with all the products row to which all those product belongs)
User.hasMany(Product);   // .hasMany() method works the same way as .belongsT() does, as it also establishes association between user and product table and it means that a user will have many Products from the product table i.e. one userId will be available in mutiple product row to which all those product belongs
        //               we can use anyone of the methods for the same work but we use both so that sequelize can generate helper functions for other method implimentations. And usually both are used together for complete association of tables
        //                here we have passed an object in .belongsTo() where we define rules for the association in which "constraints" is set true for the authenticity purpose which means the userId which is get added in the product table must be there in the user table and if unAvailable userId detected then database throws err and "onDelete" is set for -> when any user got deleted from the user table then the product containign the user's userId will also get deleted automatically


sequelize.sync({alter:true})       //  here when we use sequelize library with node.js then for creating table or for executing models where databse table is created, we have to run sequelize.sync inside app.js and also starts the server in then() as we know once we get the promise response of database creation or availability then only we can handle any data else there is now use of backend program
                                    // here we use '{alter:true}' for updating the changes which is to be done in the model in the schema which is to be made after once the table is created 
.then((res)=>{
    // console.log(res);
    app.listen(3000);   // we have added in then() of sync bcz we want to start the server once it get confirmed that the database is created and avaialable to handle data
})
.catch((err)=>{
    console.log(err);
})


