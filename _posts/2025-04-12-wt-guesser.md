---
layout: post
title: "War Thunder (Engine) Sound Guesser"
date: 2025-04-12
---

<iframe style="display: block; margin: auto;"
		width="420" height="315" src="https://www.youtube.com/embed/tVZU6i8qme0?si=fd2LUd8czhk5C6uO&amp;start=636" frameborder="0" allowfullscreen></iframe>

Alrighty then, here you go.

[Gaijin's public git](https://github.com/GaijinEntertainment/fmod_studio_warthunder_for_modders) doesn't have all the audio and I ain't hosting it cause it ain't mine.

<script src="/assets/js/wt-data.js"></script>

<div style="margin: auto; width: 50%; text-align: center;">
	<audio id="audio" controls>
		<source id="src" src="" type="audio/wav">
		Your browser does not support the audio element.
	</audio>
	<div>
		<button id="a" onclick="answer(0)">A: </button>
		<button id="b" onclick="answer(1)">B: </button>
		<button id="c" onclick="answer(2)">C: </button>
		<button id="d" onclick="answer(3)">D: </button>
	</div>
	<div><p id="score">Score: 0 / 0</p></div>
</div>

<script>
	const choices = []
	let _answer = -1
	let answered = 0
	let correct = 0;

	function setup() {
		const a = document.getElementById("a")
		const b = document.getElementById("b")
		const c = document.getElementById("c")
		const d = document.getElementById("d")
		const src = document.getElementById("src")
		const audio = document.getElementById("audio")

		while (choices.length) { choices.pop(); }
		const keys = Object.keys(tanks);
		choices.push(keys[Math.floor(Math.random()*keys.length)])
		choices.push(keys[Math.floor(Math.random()*keys.length)])
		choices.push(keys[Math.floor(Math.random()*keys.length)])
		choices.push(keys[Math.floor(Math.random()*keys.length)])

		_answer = Math.floor(Math.random()*3)

		a.innerText = `A: ${choices[0]}`
		b.innerText = `B: ${choices[1]}`
		c.innerText = `C: ${choices[2]}`
		d.innerText = `D: ${choices[3]}`

		let sources = tanks[choices[_answer]]
		src.src = 
			"https://raw.githubusercontent.com/GaijinEntertainment/fmod_studio_warthunder_for_modders/master/Assets/tanks/engines/"
			+ choices[_answer] + "/"
			+ sources[Math.floor(Math.random()*sources.length)]

		audio.load()

		console.log(choices)
		console.log(_answer)
	}

	function answer(response) {
		const score = document.getElementById("score")
		console.log(response)
		answered++

		if (response == _answer) {
			correct++
			alert("Correct! it was " + choices[_answer])
		} else {
			alert("Wrong, it was " + choices[_answer])
		}
		score.innerText = `Score: ${correct} / ${answered}`
		setup()
	}

	setup()
</script>

<!--<audio controls>
  <source src="https://github.com/GaijinEntertainment/fmod_studio_warthunder_for_modders/raw/refs/heads/master/Assets/vws/rita/vws_ahead.wav" type="audio/wav">
Your browser does not support the audio element.
</audio>-->

<br><br>
<details markdown="1">
<summary>Developer section</summary>

## Developer section

You can cheat by looking in the console.

Could be funny to do the same for weapons [*](https://github.com/GaijinEntertainment/fmod_studio_warthunder_for_modders/tree/refs/heads/master/Assets/weapons).

I didn't want to spend more than an hour so this is what you get...

Form is only to generate the data file, avoids rate limiting & making keys public.

<script>
let list = {}

function logList() {
	console.log(list)
	tanks = list
}

function generateList() {
	const key = document.getElementById("key").value
	console.log(key)
	if (!key)	{	alert("bad key");	return	}

	fetch("https://api.github.com/repos/GaijinEntertainment/fmod_studio_warthunder_for_modders/contents/Assets/tanks/engines/", {
		headers : {
			'Authorization': key,
			"Accept": "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28"
		}
	})
	.then(res => res.json())
	.then(data => data.filter(item => !item.name.includes(".wav")))	//Only use directories
	.then(tanks => {
		console.log(tanks)
		tanks.forEach((tank => {
			fetch(`https://api.github.com/repos/GaijinEntertainment/fmod_studio_warthunder_for_modders/contents${tank.path}`, {
				headers : {
					'Authorization': key,
					"Accept": "application/vnd.github+json",
					"X-GitHub-Api-Version": "2022-11-28"
				}
			})
				.then(res => res.json())
				.then(data => data.filter(item => 
					item.name.includes(".wav") && 
					!item.name.includes("interior") && 
					!item.name.includes("blip") && 
					!item.name.includes("stop") && 
					!item.name.includes("tracks")))
				.then(data => {
					console.log(data)
					const urls = []
					for (e of data) {
						let segments = e.download_url.split('/');
						urls.push(segments[segments.length - 1])
					}

					if (urls && urls.length > 0) {
						list[tank.name] = urls
					}
				})
		}))
	})
	.catch(err => {
		console.error('Error fetching:', err);
	});
}
</script>
<label for="key">Github token (include 'token' or 'Bearer'):</label>
<input id="key"><br>
<button onclick="generateList()">Generate data</button>
<button onclick="logList()">Log data to console & set (if copy to wt-data.js, make sure to minify)</button>
</details>
