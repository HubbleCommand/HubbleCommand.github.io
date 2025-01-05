---
layout: post
title: "Checkerboard Calculator"
date: 2025-01-05
---

This is sort of a continuation from my post about the [Recamán Sequence]({{ site.url }}{{ site.baseurl }}{% link _posts/2024-12-26-recaman-sequence.md %}).
There was another video a family member showed me about how a checkerboard as a calculator.

<iframe title="Why You Can't Bring Checkerboards to Math Exams" width="420" height="315" src="https://www.youtube.com/embed/_Qe_0aj4eEM" frameborder="0" allowfullscreen></iframe>

The idea is fairly simple: you can find the multiplication of two numbers if you represent them in binary, and shift the intersection of those numbers on a grid.

So... here goes.

<style>
	.board {
		display: flex;
		flex-direction: column;
	}
	.cellRow {
		display: flex;
	}
	.cell {
		text-align: center;
		vertical-align: middle;
		line-height: 30px;
		width: 30px;
		height: 30px;
		border: 1px solid black;
	}
	.jeton {
		position: absolute;
		top: 0;
		left: 0px;
		width: 22px;
		height: 22px;
		margin: 5px;
		border-radius: 50%;
		background-color: red;
		transition:
			left 1s,
			top 1s;
		will-change: left;
	}
	.jeton:hover {
		left: 20px;
	}
	.jeton-container {
  		position: relative;
		height: 100px;
		width: 100%;
	}
</style>

<label for ="a">A</label>
<input id ="a" type="number" value="5" max = 255 min = 1/>
x
<label for ="b">B</label>
<input id ="b" type="number" value="10" max = 255 min = 1/>
= 
<p id="result">.....</p>

<input id = "multiply" type="submit" value="multiply" onclick="operation(1)"/>
<!-- TODO multiply -->
<!--<input id = "divide" type="submit" value="divide" onclick="operation(-1)"/>-->

<label for ="interval">step interval</label>
<input id ="interval" type="number" value="1000" max = 10000 min = 1000/>
ms

<div id="board" class="board">
	<div id="jeton-container" style="position:relative;">
	</div>
</div>

<script>
	let size = 8

	//GLOBAL STATE BAD, but can't be asked for this, also DOM state exists outside of the operation, so whatevs
	var __jetons__ = []
	var __delete__ = []

	const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

	async function operation(type) {
		let a 			= parseInt(document.getElementById("a").value)
		let b 			= parseInt(document.getElementById("b").value)
		let interval 	= parseInt(document.getElementById("interval").value)

		document.getElementById("abdisplay").innerHTML = `${b} \\ ${a}`
		document.getElementById("multiply").disabled = true
		//document.getElementById("divide").disabled = true
		document.getElementById("result").innerHTML = "....."

		let a2 = reverseBinaryArray(a)
		let b2 = reverseBinaryArray(b)

		a2.push(...Array(size - a2.length).fill(0))
		b2.push(...Array(size - b2.length).fill(0))
		a2.reverse()
		b2.reverse()
		console.log(a2)
		console.log(b2)

		let jetons = Array.from(Array(size), () => new Array(size).fill(0))
		__jetons__.length = 0

		//TODO could do animation for putting jetons on board

		let container = document.getElementById("jeton-container")
		container.textContent = ""
		for (var r = 0; r < size; r++) {
			for (var c = 0; c < size; c++) {
				if (a2[r] != 0 && b2[c] != 0) {
					jetons[r][c] = 1
					var jeton = document.createElement("div")
					jeton.className = "jeton"
					jeton.style.top = `${r * 32}px`
					jeton.style.left = `${c* 32}px`
					container.append(jeton)
					__jetons__.push({r: r, c: c, dom: jeton})

					document.getElementById(`row-${size - r - 1}`).style.backgroundColor = "red"
					document.getElementById(`column-${size - c - 1}`).style.backgroundColor = "red"
				}
			}
		}

		await delay(interval)
		await step(jetons, interval, type)

		document.getElementById("result").innerHTML = jetons[size - 1].reduce((acc, cv, i) => acc + Math.pow(2, (size - i - 1)) * cv, 0)
		document.getElementById("multiply").disabled = false
		//document.getElementById("divide").disabled = false
	}

	//Moves jetons by a singular step
	async function step(jetons, interval, type) {
		__delete__.forEach(e => e.dom.remove())

		console.log("step")
		console.log(jetons)

		await delay(interval)	//DEBUG for printing grid array
		
		let container = document.getElementById("jeton-container")
		var incomplete = false

		for (var r = size - 2; r >= 0; r--) {
			for (var c = size - 2; c >= 0; c--) {
				if (jetons[r][c] != 0) {
					if (r !== size - 2) {
						console.log(`${r}${c} is not zero`)
						incomplete = true 
					}

					//If there is already a value, shift left by 1 on the new row
					let jeton = __jetons__.find(e => e.r === r && e.c === c)

					if(jetons[r + 1][c - 1] != 0) {
						jetons[r + 1][c - 2] = 1
						jetons[r + 1][c - 1] = 0
						__delete__.push(jeton)
						__jetons__.slice(__jetons__.indexOf(jeton), 1)

						jeton.dom.style.left = `${(c - 2) * 32}px`
						jeton.dom.style.top = `${(r + 1)* 32}px`
						jeton.r = r + 1
						jeton.c = c - 2

						let existing = __jetons__.find(e => e.r === r + 1 && e.c === c - 1)
						existing.dom.style.left = `${(c - 2) * 32}px`
						existing.dom.style.top = `${(r + 1)* 32}px`
						existing.r = r + 1
						existing.c = c - 2
					} else {
						jetons[r + 1][c - 1] = 1
						jeton.dom.style.left = `${(c - 1) * 32}px`
						jeton.dom.style.top = `${(r + 1)* 32}px`
						jeton.r = r + 1
						jeton.c = c - 1
					}

					jetons[r][c] = 0
				}
			}
		}

		if (incomplete) {
			await delay(interval)
			return step(jetons, interval, type)
		} else {
			return jetons
		}
	}

	function reverseBinaryArray(base10) {
		var b2 = []
		var num = base10

		while(num > 0) {
			let q = num / 2 | 0
			let r = num % 2
			num = q
			b2.push(r)
		}

		return b2//b2.reverse()
	}

	function drawBoard() {
		let board = document.getElementById("board")

		for (var i = 1; i <= size; i++) {
			var row = document.createElement("div")
			row.className = "cellRow"

			for (var j = 0; j <= size; j++) {
				var cell = document.createElement("div")
				cell.className = "cell"

				if (j === size) {
					cell.innerHTML = Math.pow(2, size - i)
					cell.id = `row-${size - i}`
					row.append(cell)
					continue
				}

				cell.id = `${i}-${j}`

				if (i % 2 === 0) {
					if (j % 2 === 0) {
						cell.style.backgroundColor = "black"
					} else {
						cell.style.backgroundColor = "white"
					}
				} else {
					if (j % 2 === 0) {
						cell.style.backgroundColor = "white"
					} else {
						cell.style.backgroundColor = "black"
					}
				}
				row.append(cell)
			}
			board.append(row)
		}

		let numRow = document.createElement("div")
		numRow.className = "cellRow"
		for (var j = 1; j <= size; j++) {
			var cell = document.createElement("div")
			cell.className = "cell"
			cell.innerHTML = Math.pow(2, size - j)
			cell.id = `column-${size - j}`
			numRow.append(cell)
		}
		var ab = document.createElement("div")
		ab.className = "cell"
		ab.id = "abdisplay"
		ab.style.fontSize = ".5em"
		numRow.append(ab)
		board.append(numRow)
	}

	drawBoard()
</script>

It's not perfect.
There's some additional animation that I could put, and there's the whole division & powers part that I didn't bother doing.
However, for now, this is all I have time for.

Take it or leave it.
