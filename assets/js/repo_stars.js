function call(url, onData) {
	fetch(url)
	.then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		onData(data)
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function fetchHubbleRepoStars() {
	call("https://api.github.com/users/HubbleCommand/repos", data => {
		var starred = data.filter(element => {
			return element.stargazers_count > 0;
		});
		var sorted = starred = starred.sort((a, b) => {
			return b.stargazers_count - a.stargazers_count
		})

		var grid = document.getElementById("repo-stars")
		sorted.forEach(repo => {
			grid.innerHTML +=
			`<div style="display: inline-block; padding: 20px; text-align: center; align: center;">
				<a href="${repo.html_url}">${repo.name}</a>
				<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/HubbleCommand/${repo.name}">
			</div>`
		});
	})
}

function fetchHubbleStarredRepos() {
	call("https://api.github.com/users/HubbleCommand/starred", data => {
		var grid = document.getElementById("starred-repos")
		data.forEach(repo => {
			grid.innerHTML += `<div style="display: inline-block; padding: 20px; text-align: center;"><a href="${repo.html_url}">${repo.name}</a></div>`
		});
	})
}

fetchHubbleRepoStars()
fetchHubbleStarredRepos()
