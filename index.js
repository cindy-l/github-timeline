document.getElementById("submit-btn").addEventListener("click", e => {
	e.preventDefault();
	let timelineContainer = document.getElementsByClassName('container')[0];
	const userId = document.getElementById("user-input").value;
	
	fetch(`https://api.github.com/users/${userId}/repos`)
	.then(res => res.json())
	.then(repos => repos.sort((a, b) => b.created_at.substring(0, 4) - a.created_at.substring(0, 4)))
	.then(repos => {
		let content = '<div class="timeline">';
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
		content += '</div>'
		timelineContainer.innerHTML = content;
	})
	.catch(err => timelineContainer.innerHTML = `<h4 class="error">No GitHub user found<h4>`);
});


