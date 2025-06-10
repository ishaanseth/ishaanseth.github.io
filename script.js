document.addEventListener("DOMContentLoaded", () => {
  const repoContainer = document.querySelector(".repo-container");

  fetch("https://api.github.com/users/ishaanseth/repos")
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("repo-card");

        const repoName = document.createElement("h3");
        repoName.textContent = repo.name;

        const repoDescription = document.createElement("p");
        repoDescription.textContent = repo.description || "No description provided.";

        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = "View Repository";
        repoLink.target = "_blank";

        repoCard.appendChild(repoName);
        repoCard.appendChild(repoDescription);
        repoCard.appendChild(repoLink);
        repoContainer.appendChild(repoCard);
      });
    })
    .catch(error => {
      console.error("Error fetching repositories:", error);
      repoContainer.innerHTML = "<p>Unable to load repositories.</p>";
    });
});
