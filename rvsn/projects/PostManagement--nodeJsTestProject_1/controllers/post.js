const path = require("path");
const rootDir = require("../util/path");

const postModel = require("../model/post");

exports.getIndex = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/indexPage.html"));
};

exports.addPost = (req, res, next) => {
  console.log("post form data", req.body);

  postModel.create({
    postLink : req.body.postLink,
    postDesc : req.body.postDesc,
  })
  .then((newPost)=>{
    console.log("newPost", newPost);
    res.status(200).json(newPost);
  })
  .catch((err)=>{
    console.log(err);
  })
};


exports.getPosts=(req,res,next)=>{
  postModel.findAll()
  .then((posts)=>{
    console.log("all post", posts);
    res.json(posts);
  })
  .catch(err=>{
    console.log(err);
  })
}