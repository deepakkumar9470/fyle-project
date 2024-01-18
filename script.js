
document.addEventListener('DOMContentLoaded', function () {
    const username = 'deepakkumar9470';
    const userApiUrl = `https://api.github.com/users/${username}`;
    const reposApiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(userApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(user => {
        console.log('user :', user)
        displayUser(user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error.message);
      });
  
    // Fetch user repositories
    fetch(reposApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(repos => {
        displayRepos(repos);
      })
      .catch(error => {
        console.error('Error fetching repositories:', error.message);
      });
  
    function displayUser(user) {
      const userContainer = document.getElementById('user-info');
      // userContainer.innerHTML = `
      //   <h2>${user.login}</h2>
      //   <img src="${user.avatar_url}" alt="Profile Image">
      //   <p>Followers: ${user.followers}</p>
      //   <p>Following: ${user.following}</p>
      // `;
    }
  
    function displayRepos(repos) {
      const repoList = document.getElementById('repo-list');
  
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.classList.add('repo-item');
        listItem.innerHTML = `
          <span>${repo.name}</span>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        `;
        repoList.appendChild(listItem);
      });
    }
  });
  