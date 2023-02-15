const postNewBlog = async (event) => {
  event.preventDefault();
  console.log(event);

  const title = document.querySelector("#blog-title").value.trim();
  const content = document.querySelector("#blog-content").value.trim();

  if (title && content) {
    const response = await fetch("/api/dashboard", {
      method: "POST",
      body: JSON.stringify({ blog_title: title, description: content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Please enter both a title and your post");
    }
  }
};

const editBlog = async (event) => {
  const title = document.querySelector("#blog-title").value.trim();
  const content = document.querySelector("#blog-content").value.trim();

  console.log(title);
  console.log(content);
  console.log(event.target.getAttribute("data-id"));

  const response = await fetch(
    `/api/dashboard/${event.target.getAttribute("data-id")}`,
    {
      method: "PUT",
      body: JSON.stringify({ blog_title: title, description: content }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const result = await response.json();
  console.log(result);
  document.location.replace("/dashboard");
};

const deleteBlog = async (event) => {
  console.log(event.target);
  console.log(event.target.getAttribute("data-id"));
  const response = await fetch(
    `/api/dashboard/${event.target.getAttribute("data-id")}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  document.location.replace("/dashboard");
};

document.querySelector(".blog-form").addEventListener("submit", postNewBlog);

document.querySelectorAll(".edit-blog-btn").forEach((editBtn) => {
  editBtn.addEventListener("click", editBlog);
});

document.querySelectorAll(".delete-blog-btn").forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", deleteBlog);
});
