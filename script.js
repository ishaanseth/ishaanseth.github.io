function getRepoIcon(name, description) {
  constsearchText = (name + ' ' + (description || '')).toLowerCase();

  // Using simple emojis as placeholders for now.
  // Later, these could be replaced with SVG URLs or classes for an icon font.
  if (searchText.includes('python')) return '🐍';
  if (searchText.includes('javascript') || searchText.includes('js')) return '💛'; // Yellow heart for JS
  if (searchText.includes('html')) return '📄';
  if (searchText.includes('css')) return '🎨';
  if (searchText.includes('portfolio')) return '💼';
  if (searchText.includes('api')) return '🔗';
  if (searchText.includes('data')) return '📊';
  if (searchText.includes('flutter')) return '📱';
  if (searchText.includes('dart')) return '🎯';
  if (searchText.includes('react')) return '⚛️'; // React atom symbol
  if (searchText.includes('node')) return '🟩'; // Green square for Node.js

  return '📁'; // Default folder icon
}

document.addEventListener("DOMContentLoaded", () => {
  const repoContainer = document.querySelector(".repo-container");

  fetch("https://api.github.com/users/ishaanseth/repos")
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("repo-card");

        // Create icon
        const iconEmoji = getRepoIcon(repo.name, repo.description);
        const iconElement = document.createElement('span');
        iconElement.textContent = iconEmoji;
        iconElement.classList.add('repo-icon');

        // Create name
        const repoName = document.createElement("h3");
        repoName.textContent = repo.name;
        // No need for inline-block on h3 directly if handled by parent flex

        // Create header div for icon and name
        const repoHeader = document.createElement('div');
        repoHeader.classList.add('repo-header');
        repoHeader.appendChild(iconElement);
        repoHeader.appendChild(repoName);

        // Create description and link
        const repoDescription = document.createElement("p");
        repoDescription.textContent = repo.description || "No description provided.";

        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = "View Repository";
        repoLink.target = "_blank";

        // Append elements to repoCard
        repoCard.appendChild(repoHeader); // Header first
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
