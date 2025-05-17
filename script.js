document.addEventListener("DOMContentLoaded", () => {
  const repoList = document.getElementById("repo-list");

  fetch("https://api.github.com/users/ishaanseth/repos")
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.textContent = repo.name;
        link.target = "_blank";

        const description = document.createElement("p");
        description.textContent = repo.description || "No description provided.";

        li.appendChild(link);
        li.appendChild(description);
        repoList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Error fetching repositories:", error);
      repoList.innerHTML = "<li>Unable to load repositories.</li>";
    });
});
