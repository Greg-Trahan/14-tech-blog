const comment = async (event) => {
  event.preventDefault();
  console.log(event.target);
  console.log(event.target.getAttribute("blog-id"));
  const comment = document.querySelector("#comment-text").value.trim();

  if (comment) {
    console.log(
      `event.target.getAttribute("blog-id") ${event.target.getAttribute(
        "blog-id"
      )}`
    );
    const response = await fetch(
      `/api/blog/${event.target.getAttribute("blog-id")}`,
      {
        method: "POST",
        body: JSON.stringify({
          content: comment,
          name: event.target.getAttribute("name-id"),
          blog_id: event.target.getAttribute("blog-id"),
          user_id: event.target.getAttribute("user-id"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      document.location.replace(
        `/api/blog/${event.target.getAttribute("blog-id")}`
      );
    } else {
      alert(response);
    }
  }
};

const editComment = async (event) => {
  const comment = document.querySelector("#comment-text").value.trim();
  const response = await fetch(
    `/api/blog/${event.target.getAttribute("blog-id")}`,
    {
      method: "PUT",
      body: JSON.stringify({
        comment_id: event.target.getAttribute("comment-id"),
        content: comment,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  document.location.replace(
    `/api/blog/${event.target.getAttribute("blog-id")}`
  );
};

const deleteComment = async (event) => {
  const response = await fetch(
    `/api/blog/${event.target.getAttribute("blog-id")}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        comment_id: event.target.getAttribute("comment-id"),
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  document.location.replace(
    `/api/blog/${event.target.getAttribute("blog-id")}`
  );
};

document.querySelectorAll(".edit-comment-btn").forEach((editCmt) => {
  editCmt.addEventListener("click", editComment);
});

document.querySelector("#comment-btn").addEventListener("click", comment);

document.querySelectorAll(".delete-comment-btn").forEach((deleteCmt) => {
  deleteCmt.addEventListener("click", deleteComment);
});
