---
layout: post
title: "Collatz Conjecture Drawing"
date: 2025-03-30
---

<script src="https://cdn.jsdelivr.net/npm/p5@1.11.2/lib/p5.js"></script>

I recently re-watched the following Numberphile video.

<iframe title="The Collatz Conjecture - Numberphile" width="420" height="315" src="https://www.youtube.com/embed/5mFpVDpKX70" frameborder="0" allowfullscreen></iframe>

There's also a lot of really neat visualisations:
- [Collatz Tree Graph](https://www.jasondavies.com/collatz-graph/)
- [Collatz Value Chart](https://collatz-conjecture-visualizer-puce.vercel.app/)
- [Wikipedia Visualisations](https://en.wikipedia.org/wiki/Collatz_conjecture#Visualizations)

However, I couldn't find any visualisations similar to that of the [Recamán Sequence]({{ site.url }}{{ site.baseurl }}{% link _posts/2024-12-26-recaman-sequence.md %}).
So I went and reworked my visualisation for the Collatz sequence of any number.

The sequence is very easy to generate:

<img style="filter: invert(100%);" src="https://wikimedia.org/api/rest_v1/media/math/render/svg/0f220f8b8d9aaa456552e64310e8fbe65e356718">

Stopping at 1.

It is certainly more chaotic than the visualisation of the Recamán Sequence.

<label for="number">Number </label>
<input type="number" value="17" id="number" oninput="onInputChange()">

<label for="scale">Number Line Pixel Scale</label>
<input id ="scale" type="number" value="10" oninput="onInputChange()"/> px

<label for="midline">Draw midline</label>
<input id ="midline" type="checkbox" checked oninput="onInputChange()"/>
<label for="middots">with dots</label>
<input id ="middots" type="checkbox" checked oninput="onInputChange()"/>

<label for="type">Draw method</label>
<select id="type" oninput="onInputChange()">
	<option value="fb">Forward-Back</option>	<!-- Normal variant, draw on bottom if going forward -->
	<option value="alternate">Flip-Flop</option> <!-- irrelevant if going forward or back, always switch between -->
</select>

<div id="collatz"></div>

<script>

function generateCollatzSequence(number) {
	let sequence = [number]

	var value = number
	while (value != 1) {
		if (value % 2 == 0) {
			value /= 2
		} else {
			value = (value * 3) + 1
		}
		sequence.push(value)
	}

	return sequence
}

let collatz = new p5(( p5 ) => {
    p5.setup = () => {
		p5.noLoop()
    };
	p5.draw = () => {
		//Retrieve input
		var number = parseInt(document.getElementById("number").value)
		var scale = parseInt(document.getElementById("scale").value)
		var type = document.getElementById("type").value
		var middots = document.getElementById("middots").checked
		var midline = document.getElementById("midline").checked

		//Generate sequence
		let sequence = generateCollatzSequence(number)
		
		//Drawing
		p5.createCanvas(1000, 1000)
		p5.clear()
		p5.stroke(200)

		p5.noFill()
		p5.rectMode(p5.CORNER)
		p5.rect(0, 0, 1000, 1000)

		let hheight = p5.height / 2
		let hwidth  = p5.width / 2

		//midline
		p5.fill('white')
		p5.ellipseMode(p5.CENTER)
		if (midline) {
			p5.line(0, hheight, p5.width, hheight)
		}

		if (middots) {
			for (var i = 0; i <= p5.width; i+=scale) {
				p5.circle(i, hheight, i % (10*scale) == 0 ? 5 : 2)
			}
		}

		//drawing sequence
		p5.noFill()
		p5.ellipseMode(p5.CORNERS)

		for (let i = 1; i < sequence.length; i++) {
			let an = sequence[i]
			let bn = sequence[i - 1]
			let r = (an - bn) / 2
			let backwards = bn > an

			if (type == "fb") {
				if (backwards) {
					p5.arc(an * scale, hheight - (r * scale), bn * scale, hheight + (r * scale), 0, p5.PI)
				} else {
					p5.arc(bn * scale, hheight - (r * scale), an * scale, hheight + (r * scale), p5.PI, 0)
				}
			} else if (type == "alternate") {
				let top = i % 2 == 0
				if (backwards) {
					p5.arc(an * scale, hheight - (r * scale), bn * scale, hheight + (r * scale), top ? p5.PI : 0, top ? 0 : p5.PI)
				} else {
					p5.arc(bn * scale, hheight - (r * scale), an * scale, hheight + (r * scale), top ? p5.PI : 0, top ? 0 : p5.PI)
				}
			}
		}
    };
}, 'collatz');

function onInputChange() {
	collatz.redraw()
}
</script>
