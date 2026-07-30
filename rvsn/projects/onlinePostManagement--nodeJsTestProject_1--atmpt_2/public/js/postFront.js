const postFormDiv = document.querySelector(".postFormDiv");
const postForm = document.querySelector(".postForm");
const commentForm = document.querySelector(".commentForm");

function showPosts(allPost){
    const postsUl = document.querySelector(".allPosts");

    allPost.forEach(post => {
        const newLi = document.createElement('li');
        newLi.className = 'post';

        newLi.innerHTML = `
            <img src="${post.postLink}" alt="Post Image" class="post-img">
            <p class="post-desc">${post.postDesc}</p>
        `;
        const cmntBtn = document.createElement("button");
        cmntBtn.type = "button";
        cmntBtn.className = "comment-btn";
        cmntBtn.textContent = "💬 Comment";
        cmntBtn.addEventListener('click',addComment);
        newLi.appendChild(cmntBtn);

        postsUl.appendChild(newLi);
    });
}


postForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const postObj = {
      postLink: document.getElementById("postLink").value,
      postDesc: document.getElementById("postDesc").value,
    };

    console.log("postObj",postObj)

    axios.post("http://localhost:4000/add-post",postObj)
    .then((newPost)=>{
        console.log("newPost",newPost.data);
        showPosts([newPost.data]);
    })
    .catch(err=>{
        console.log(err);
    })
})


axios.get('http://localhost:4000/get-posts')
.then((posts)=>{
    console.log("all post",posts.data);
    showPosts(posts.data)
})
.catch((err)=>{
    console.log(err);
})

function addComment(){
    commentForm.style.display = 'flex';
}