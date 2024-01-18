
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
      const userContainer = document.getElementById('user__info');
      const userWrapper = document.getElementsByClassName('user');
      const userBio = document.getElementsByClassName('bio');
      // const location = document.getElementsByClassName('location');
      // const github = document.getElementsByClassName('github');     
      // const userNewBio = document.createElement('div')
      // userContainer.appendChild(userWrapper) 
      // userWrapper.appendChild(userBio)
      // userBio.appendChild(location)
      // userWrapper.appendChild(github)
      userContainer.append(userBio)

      userContainer.innerHTML = `
      <div class="user">
          <img style="width:200px;border-radius:50%;border:2px solid #D1D1D1" src="${user.avatar_url}" alt="Profile Image" class="profile-image">
          <div class="bio">
             <h2>${user.name}</h2>
             <p>${user.bio}</p>
             <div class="location">
             <img src="./assets/location.svg" 
             alt="location">
             <span>${user.location || "Dhanbad"}</span>
             </div>
             <span class="twitter">Twitter : ${user.twitter_username || "@dk397787"}</span>
          </div>
            </div>

            <div class="github">
            <img src="./assets/link.svg" alt="">
            <a href="${user.url}">${user.url}</a>
            </div>    

           `;

        // userNewBio.innerHTML = `
        // <h2>${user.name}</h2>
        // <p>${user.bio}</p>
        // <span>${user.twitter_username}</span>
      // `;

      // location.innerHTML = `
      //   <span>${user.location}</span>
      // `;
      // github.innerHTML = `

      //   <a href="${user.url}" target="_blank" rel="noopener noreferrer"></a>
        
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
  