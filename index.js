let currentPage = 1;
let hasNextPage = true;
let content = '';

document.getElementById("submit-btn").addEventListener("click", e => {
	e.preventDefault();
	currentPage = 1;
	hasNextPage = true;
	content = '';
	getRepos(currentPage);
});

function getRepos(currentPage) {
	let timelineContainer = document.getElementsByClassName('container')[0];
	const userId = document.getElementById("user-input").value;

	fetch(`https://api.github.com/users/${userId}/repos?sort=created&per_page=100&page=${currentPage}`)
	.then(res => res.json())
	.then(repos => {
		if (repos.length === 0) {
			hasNextPage = false;
			return;
		}
		if (currentPage === 1) {
			content += '<div class="timeline">';
		}
		repos.forEach((repo, idx) => {
			content += 
			`<div class="timeline-content">
				<div class="info">
					<h2>${repo.name}</h2>
					<div class="desc">${repo.description != null ? repo.description : ''}</div>
				</div>
				<div class="timeline-dot"></div>
				<div class="time"><h4>${repo.created_at.substring(0, 4)}</h4></div>
			</div>`  
		});
		timelineContainer.innerHTML = content;
	})
	.catch(err => {
		timelineContainer.innerHTML = `<h4 class="error">No GitHub user found<h4>`;
		hasNextPage = false;
	});
}

window.addEventListener('scroll', () => {
	const {
		scrollTop,
		scrollHeight,
		clientHeight
	} = document.documentElement;

	if (scrollTop + clientHeight >= scrollHeight - 5 && hasNextPage) {
		getRepos(++currentPage);
	}
}, {
	passive: true
});
