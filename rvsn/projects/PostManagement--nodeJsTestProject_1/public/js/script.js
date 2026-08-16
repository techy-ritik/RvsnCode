const postFormDiv = document.querySelector(".postFormDiv");
const postForm = document.querySelector(".postForm");
const commentForm = document.querySelector(".commentForm");

function showPosts(allPost) {
  const postsUl = document.querySelector(".allPosts");

  allPost.forEach((post) => {
    const newLi = document.createElement("li");
    newLi.className = "post";
    newLi.dataset.postId = post.id;

    newLi.innerHTML = `
      <img src="${post.postLink}" alt="Post Image" class="post-img">
      <p class="post-desc">${post.postDesc}</p>
    `;

    const cmntBtn = document.createElement("button");
    cmntBtn.type = "button";
    cmntBtn.className = "comment-btn";
    cmntBtn.textContent = "💬 Comments";

    cmntBtn.addEventListener("click", () => {
      comment(post.id);
    });

    newLi.appendChild(cmntBtn);

    const commentsContainer = document.createElement("div");
    commentsContainer.className = "comments-container";
    commentsContainer.style.display = "none";

    commentsContainer.innerHTML = `
      <h3 class="comments-title">Comments</h3>
      <div class="comments-list"></div>
    `;

    newLi.appendChild(commentsContainer);

    const newCommentForm = document.createElement("form");
    newCommentForm.className = "post-comment-form";
    newCommentForm.style.display = "none";

    newCommentForm.innerHTML = `
      <input
        type="text"
        name="comment"
        class="comment-input"
        placeholder="Write a comment..."
        required
      >

      <button type="submit" class="send-comment-btn">
        Send
      </button>
    `;

    newCommentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const commentInput = newCommentForm.querySelector(".comment-input");

      const commentObj = {
        comment: commentInput.value,
        PostId: post.id,
      };

      console.log("commentObj", commentObj);

      axios
        .post("http://localhost:4000/add-comment", commentObj)
        .then((newComment) => {
          console.log(newComment.data);

          commentInput.value = "";

          getComments(post.id, newLi);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    newLi.appendChild(newCommentForm);

    postsUl.appendChild(newLi);
  });
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const postObj = {
    postLink: document.getElementById("postLink").value,
    postDesc: document.getElementById("postDesc").value,
  };

  console.log("postObj", postObj);

  axios
    .post("http://localhost:4000/add-post", postObj)
    .then((newPost) => {
      console.log("newPost", newPost.data);
      showPosts([newPost.data]);
    })
    .catch((err) => {
      console.log(err);
    });
});

axios
  .get("http://localhost:4000/get-posts")
  .then((posts) => {
    console.log("all post", posts.data);
    showPosts(posts.data);
  })
  .catch((err) => {
    console.log(err);
  });

function comment(postId) {
  const postContainer = document.querySelector(
    `.post[data-post-id="${postId}"]`,
  );

  if (!postContainer) {
    return;
  }

  const commentsContainer = postContainer.querySelector(".comments-container");

  const currentCommentForm = postContainer.querySelector(".post-comment-form");

  if (commentsContainer.style.display === "none") {
    commentsContainer.style.display = "block";
    currentCommentForm.style.display = "flex";

    getComments(postId, postContainer);
  } else {
    commentsContainer.style.display = "none";
    currentCommentForm.style.display = "none";
  }
}

function getComments(postId, postContainer) {
  axios
    .get(`http://localhost:4000/comments/${postId}`)
    .then((allComments) => {
      console.log(`Comments for post ${postId}:`, allComments.data);

      showComments(allComments.data, postContainer);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showComments(allComments, postContainer) {
  const commentsList = postContainer.querySelector(".comments-list");

  commentsList.innerHTML = "";

  if (!allComments || allComments.length === 0) {
    const noComments = document.createElement("p");

    noComments.className = "no-comments";
    noComments.textContent = "No comments yet.";

    commentsList.appendChild(noComments);

    return;
  }

  allComments.forEach((comment) => {
    const commentDiv = document.createElement("div");

    commentDiv.className = "comment";

    commentDiv.innerHTML = `
      <span class="comment-icon">👤</span>
      <p class="comment-text">${comment.comment}</p>
    `;

    commentsList.appendChild(commentDiv);
  });
}

commentForm.style.display = "none";
