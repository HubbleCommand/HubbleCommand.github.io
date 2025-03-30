---
layout: post
title: "Recamán Sequence"
date: 2024-12-26
categories  : ["Math"]
---

<script src="https://cdn.jsdelivr.net/npm/p5@1.11.2/lib/p5.js"></script>

While I was never particularly great at math, I always liked the subject.

As such, it's rare for me to see a mathematical topic and be like "yeah, that looks easy".
Recently, one such things happened: a family member showed me the following Numberphile video on the Recamán sequence during christmas:

<iframe title="Recamán Sequence" width="420" height="315" src="https://www.youtube.com/embed/FGC5TdIiT9U" frameborder="0" allowfullscreen></iframe>

Seemed easy enough to draw, so I polished off some of my knowledge of p5js (see [here]({{ site.url }}{{ site.baseurl }}{% link _projects/p5.md %}) for more) and made the following visualisation.

I also made a slightly different variation.
Instead of determining if an arc is on top or below the number line by if we are going forwards or backwards, we alternate for each value of `an`.

<label for="nlimit">Number Limit</label>
<input type="range" min="0" max="100" value="50" id="nlimit" oninput="onInputChange()">
<label for="nmax">max</label>
<input id ="nmax" type="number" value="100" oninput="onMaxesChange()"/>

<label for="anlimit">Series Limit</label>
<input type="range" min="0" max="100" value="50" id="anlimit" oninput="onInputChange()">
<label for ="anmax">max</label>
<input id ="anmax" type="number" value="100" oninput="onMaxesChange()"/>

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

<div id="recsequence"></div>

<script>
function generateRecamanSequence(nlimit, anlimit) {
	var maxn = 0
	var maxan = 0
	var maxdiff = 0

	let sequence = []
	for (let n = 0; n < nlimit; n++) {
		maxn = n
		var an = -1
		var previous = 0
		if (n == 0) {
			an = 0
		} else {
			previous = sequence[sequence.length - 1]
			let backwards = previous - n
			if (backwards > 0 && !sequence.includes(backwards)) {
				an = backwards
			} else {	//Go forwards
				an = previous + n
			}
		}
		if (an > anlimit) {
			break
		}
		if (an > maxan) {
			maxan = an
		}
		let diff = Math.abs(an - previous)
		if (diff > maxdiff) {
			maxdiff = diff
		}
		sequence.push(an)
	}

	return [sequence, maxan, maxdiff]
}

let recsequence = new p5(( p5 ) => {
    p5.setup = () => {
		p5.noLoop()
    };
	p5.draw = () => {
		//Retrieve input
		var nlimit = parseInt(document.getElementById("nlimit").value)
		var anlimit = parseInt(document.getElementById("anlimit").value)
		var scale = parseInt(document.getElementById("scale").value)
		var type = document.getElementById("type").value
		var middots = document.getElementById("middots").checked
		var midline = document.getElementById("midline").checked

		//Generate sequence
		let result = generateRecamanSequence(nlimit, anlimit)
		var maxan = result[1]
		var maxdiff = result[2]
		let sequence = result[0]
		
		//Drawing
		//auto-scaling canvas is neat, but is fucky & page size changes
		//p5.createCanvas(maxan * scale, maxdiff * 2 * scale)
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
			let anMinusOne = sequence[i - 1]
			let r = (an - anMinusOne) / 2
			let backwards = anMinusOne > an

			if (type == "fb") {
				if (backwards) {
					p5.arc(an * scale, hheight - (r * scale), anMinusOne * scale, hheight + (r * scale), 0, p5.PI)
				} else {
					p5.arc(anMinusOne * scale, hheight - (r * scale), an * scale, hheight + (r * scale), p5.PI, 0)
				}
			} else if (type == "alternate") {
				let top = i % 2 == 0
				if (backwards) {
					p5.arc(an * scale, hheight - (r * scale), anMinusOne * scale, hheight + (r * scale), top ? p5.PI : 0, top ? 0 : p5.PI)
				} else {
					p5.arc(anMinusOne * scale, hheight - (r * scale), an * scale, hheight + (r * scale), top ? p5.PI : 0, top ? 0 : p5.PI)
				}
			}
			//debug rect
			//p5.rect(anMinusOne * scale, hheight - (r * scale), an * scale, hheight + (r * scale))
		}
    };
}, 'recsequence');

function onInputChange() {
	recsequence.redraw()
}

function onMaxesChange() {
	var nmax = parseInt(document.getElementById("nmax").value)
	var anmax = parseInt(document.getElementById("anmax").value)

	document.getElementById("nlimit").max = nmax
	document.getElementById("anlimit").max = anmax
}
</script>
