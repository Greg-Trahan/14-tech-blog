const postNewBlog = async (event) => {
  event.preventDefault();
  console.log(event);

  const title = document.querySelector("#blog-title").value.trim();
  const content = document.querySelector("#blog-content").value.trim();

  console.log(title);
  console.log(content);

  if (title && content) {
    console.log(title);
    console.log(content);
    const response = await fetch("/api/dashboard", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // document.location.replace("/api/dashboard");
    } else {
      alert("Please enter both a title and your post");
    }
  }
};

const editBlog = async (event) => {
  console.log(event.target);
  const response = await fetch("/api/blog/:id", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  document.location.replace("/api/blog");
  console.log("Hello!");
};

const deleteBlog = async (event) => {
  console.log(event.target);
  console.log(event.target.getAttribute("data-id"));
  const response = await fetch("/api/blog/:id", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  document.location.replace("/:id");
};

document.querySelector(".blog-form").addEventListener("submit", postNewBlog);

document.querySelector("#edit-blog-btn").addEventListener("click", editBlog);

document
  .querySelector("#delete-blog-btn")
  .addEventListener("click", deleteBlog);
