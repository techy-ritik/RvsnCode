const postModel = require('./post');
const commentModel = require('./comment');


postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);


module.exports={
    postModel,
    commentModel
}