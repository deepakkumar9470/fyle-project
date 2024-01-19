
document.addEventListener('DOMContentLoaded', function () {
    const username = 'deepakkumar9470';
    const userApiUrl = `https://api.github.com/users/${username}`;
    let currentPage = 1;
    let repositoriesPerPage = 10;  
    showLoading()
    fetch(userApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(user => {
        hideLoading()
        displayUser(user);
      })
      .catch(error => {
        hideLoading()
        console.error('Error fetching user data:', error.message);
      });
  
    // Fetch user repositories with pagination
  function fetchRepositories() {
    const reposApiUrl = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${repositoriesPerPage}`;
    showLoading();
    fetch(reposApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(repos => {
        hideLoading();
        displayRepos(repos);
      })
      .catch(error => {
        hideLoading();
        console.error('Error fetching repositories:', error.message);
      });
  }
  
  

  // Fetch User
    function displayUser(user) {
      const userContainer = document.getElementById('user__info');
      const userBio = document.getElementsByClassName('bio');
      
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

      fetchRepositories();


    }
  
    // Displaying respos of user from api
    function displayRepos(repos) {
      const repoList = document.getElementById('repo__list');
      
      repos.forEach(repo => {
        const repoCard = document.createElement('div')
        repoList.append(repoCard)
        repoCard.classList.add('repo__card')
        repoCard.innerHTML = `
        <h3 style="font-size:2.4rem;font-weight:700;color:#5F85DB;
        text-transform:capitalize">${repo.name}</h3>
        <p style="font-size:1.6rem;font-weight:500">${repo.description}</p>
        <span style="width:max-content;padding:1rem 2rem;border-radius:0.5rem;
        background-color:#5F85DB;color:#fff";font-size:2rem;
        font-weight:700>${repo.language}</span>
        `;
      
      });
      displayPagination(repos.length)
      console.log(repos.length)
    }

  // Pagination of user
    function displayPagination(repoCount) {
      const paginationContainer = document.getElementById('pagination');
      paginationContainer.innerHTML = '';

      const totalPages = Math.ceil(repoCount / repositoriesPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
          currentPage = i;
          fetchRepositories();
        });
        paginationContainer.appendChild(pageButton);
      }

      if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Older';
        prevButton.addEventListener('click', () => {
          currentPage--;
          fetchRepositories();
        });
        paginationContainer.insertBefore(prevButton, paginationContainer.firstChild);
      }
      if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Newer';
        nextButton.addEventListener('click', () => {
          currentPage++;
          fetchRepositories();
        });
        paginationContainer.appendChild(nextButton);
      }
    }


    function showLoading() {
      const loadingContainer = document.getElementById('loading');
      loadingContainer.style.display = 'block';
    }
  
    function hideLoading() {
      const loadingContainer = document.getElementById('loading');
      loadingContainer.style.display = 'none';
    }

  });
  