const commentModel = require('../model/comment');
const postModel = require('../model/post');


exports.postComment = (req,res,next)=>{
    const {comment,PostId} = req.body

    console.log("req.body",req.body)
    // console.log("comment",comment)
    commentModel.create({comment,PostId})
    .then((newComment)=>{
        console.log(newComment, "newComment");
        res.status(201).json(newComment);
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.getComments = (req,res,next)=>{
    const {postId} = req.params;

    commentModel.findAll({where:{PostId:postId}})
    .then((comments)=>{
        res.json(comments);
    })
    .catch((err)=>{
        console.log(err);
    })
}