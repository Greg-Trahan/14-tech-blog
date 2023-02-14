const comment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment-text").value.trim();

  if (comment) {
    const response = await fetch("/api/blog/:id", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/:id");
    } else {
      alert(response);
    }
  }
};

const editComment = async () => {
  const response = await fetch("/api/blog/:id", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  document.location.replace("/:id");
};

const deleteComment = async () => {
  const response = await fetch("/api/blog/:id", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  document.location.replace("/:id");
};

document
  .querySelector("#edit-comment-btn")
  .addEventListener("click", editComment);
document.querySelector("#comment-btn").addEventListener("click", comment);
document
  .querySelector("#delete-comment-btn")
  .addEventListener("click", deleteComment);
