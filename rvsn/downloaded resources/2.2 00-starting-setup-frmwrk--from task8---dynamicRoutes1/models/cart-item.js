const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const CartItem = sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    quantity:Sequelize.INTEGER
})

module.exports = CartItem;


// this model is required for establishing many to many relation between cart and products where it can store productId and cartId