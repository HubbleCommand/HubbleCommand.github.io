---
layout: post
title: "Railway Math"
#date: 2025-06-01
date: 2025-12-03
categories  : ["Math"]
---

I recently watched these two videos on trains and the scheduling math behind them.

{% assign links="NFLb1IPlY_k,8y9hGofgy9c" | split: "," %}
{% include /components/video-group.html id="assorted" ids=links %}

The rail graphs really intrigued me.
Any physical and temporal resource allocation problem is really interesting, as long as it's not meeting scheduling.
(*insert tears for the nightmare that is ms teams scheduling*)
I was mostly surprised that 'train graphs' weren't a thing much earlier.
Given that it didn't seem *that* hard to implement, I made the following *very* basic implementation.
It only allows for the following things:
- enter stations names
- register trains with:
	- a start station
	- an end station
	- a start time
	- an end time

It will then draw the network, and determine any crossovers.
This doesn't allow setting individual station departure times or station layovers / delays.
It ain't pretty, but that's not the point of it, is it.

<hr>

Stations
<ul id="stations"></ul>
<input id="name" type="text">
<button id="add-station">add</button>

Trains
<ul id="trains"></ul>
<label for="start">Station start</label>
<select name="start" id="start"></select>
<input id="time-start" type="time">
<label for="end">Station end</label>
<select name="end" id="end"></select>
<input id="time-end" type="time">
<button id="add-train">add</button>

<button id="generate">generate railway graph</button>

<div id="railway"></div>

<script src="https://cdn.jsdelivr.net/npm/p5@1.11.2/lib/p5.js"></script>

<script>
let generate = document.getElementById("generate")
let stations = document.getElementById("stations")
let trains = document.getElementById("trains")

let txtStationName = document.getElementById("name")
let btnAddStation = document.getElementById("add-station")

let selectStart = document.getElementById("start")
let timeStart = document.getElementById("time-start")
let selectEnd = document.getElementById("end")
let timeEnd = document.getElementById("time-end")
let btnAddTrain = document.getElementById("add-train")

function addStation(name) {
	let station = document.createElement("li")
	let text = document.createTextNode(name + " ")

	let newStartStation = document.createElement("option")
	newStartStation.innerHTML = name
	newStartStation.value = name
	let newEndStation = document.createElement("option")
	newEndStation.innerHTML = name
	newEndStation.value = name

	btnRemove = document.createElement("button")
	btnRemove.innerHTML = "&#x2716";
	btnRemove.addEventListener("click", () => {
		station.remove()
		newStartStation.remove()
		newEndStation.remove()
	})
	
	selectStart.append(newStartStation)
	selectEnd.append(newEndStation)
	station.append(text, btnRemove)
	station.dataset.name = name
	stations.append(station)
}

function addTrain(startStation, startTime, endStation, endTime) {
	console.log(startStation, startTime, endStation, endTime)
	let train = document.createElement("li")
	let text = startStation + ' - ' + startTime + ' - ' + endStation + ' - ' + endTime
	btnRemove = document.createElement("button")
	btnRemove.innerHTML = "&#x2716";
	btnRemove.addEventListener("click", () => train.remove())
	train.append(text, btnRemove)
	train.dataset.startStation = startStation
	train.dataset.startTime = timeToDecimal(startTime)
	train.dataset.endStation = endStation
	train.dataset.endTime = timeToDecimal(endTime)
	trains.append(train)
}

//https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
//Really cool... but I also want the intersection *point*
function getLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
	const determinant = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

	// Parallel or collinear
	if (determinant === 0) return null;

	const px = ((x1*y2 - y1*x2) * (x3 - x4) - (x1 - x2) * (x3*y4 - y3*x4)) / determinant;

	const py = ((x1*y2 - y1*x2) * (y3 - y4) - (y1 - y2) * (x3*y4 - y3*x4)) / determinant;

	// Check if intersection point is on both segments
	if (
		px < Math.min(x1, x2) - Number.EPSILON || px > Math.max(x1, x2) + Number.EPSILON ||
		px < Math.min(x3, x4) - Number.EPSILON || px > Math.max(x3, x4) + Number.EPSILON ||
		py < Math.min(y1, y2) - Number.EPSILON || py > Math.max(y1, y2) + Number.EPSILON ||
		py < Math.min(y3, y4) - Number.EPSILON || py > Math.max(y3, y4) + Number.EPSILON
	) {
		return null;
	}

	//If intersection is one of the segment endpoints
	const isStartL1 = Math.abs(px - x1) < Number.EPSILON && Math.abs(py - y1) < Number.EPSILON;
    const isStartL2 = Math.abs(px - x3) < Number.EPSILON && Math.abs(py - y3) < Number.EPSILON;
	const isEndL1 = Math.abs(px - x2) < Number.EPSILON && Math.abs(py - y2) < Number.EPSILON;
    const isEndL2 = Math.abs(px - x4) < Number.EPSILON && Math.abs(py - y4) < Number.EPSILON;
	if (isStartL1 || isStartL2 || isEndL1 || isEndL2) {
		return null;
	}

	return [px, py]
}

btnAddStation.addEventListener("click", () => {
	let name = txtStationName.value;
	if (!name) {
		return
	}
	addStation(name)
	txtStationName.value = ''
})

function timeToDecimal(timeStr) {
	const [hours, minutes] = timeStr.split(':').map(Number);
	return hours + minutes / 60;
}

btnAddTrain.addEventListener("click", () => {
	let startStation = selectStart.value
	let startTime = timeStart.value
	let endStation = selectEnd.value
	let endTime = timeEnd.value
	addTrain(startStation, startTime, endStation, endTime)
})

const width = 500
const height = 500
const stationNameMargin = 55
let railway = new p5(( p5 ) => {
	p5.setup = () => {
		p5.noLoop()
	};
	p5.draw = () => {
		//Retrieve input
		const lStations = [...stations.querySelectorAll('li')].map(li => li.dataset.name);
		const lTrains = [...trains.querySelectorAll('li')].map(li => ({
			startStation: li.dataset.startStation,
			startTime: li.dataset.startTime,
			endStation: li.dataset.endStation,
			endTime: li.dataset.endTime
		}));
		console.log('will draw with data', lStations, lTrains)

		//Init canvas
		p5.createCanvas(width, height)
		p5.clear()
		p5.stroke(200)

		p5.noFill()
		p5.rectMode(p5.CORNER)
		p5.rect(0, 0, width, height)

		//Draw time
		const timeWidth = (width - stationNameMargin) / 24
		p5.textAlign(p5.CENTER, p5.TOP)
		for (let i = 0; i < 24; i++) {
			let time = String(i).padStart(2, '0') + 'h';
			let x = (timeWidth * i) + stationNameMargin
			p5.push()
  			p5.translate(x + 1, 10)
  			p5.rotate(-p5.HALF_PI)
			p5.text(time, 0, 0)
			p5.pop()
			p5.line(x, 0, x, height)
		}

		//Draw station names
		p5.strokeWeight(0.5)
		p5.line(stationNameMargin, 0, stationNameMargin, height)
		const nameHeight = height / lStations.length
		p5.textAlign(p5.RIGHT, p5.CENTER)
		for (let i = 0; i < lStations.length; i++) {
			let name = lStations[i]
			let y = (nameHeight * i) + (nameHeight / 2)
			p5.text(name, 50, y)
			p5.line(stationNameMargin, y, width, y)
		}

		//Draw trains + intersections
		const lines = []
		for (let i = 0; i < lTrains.length; i++) {
			let train = lTrains[i]
			let startStationIndex = lStations.indexOf(train.startStation)
			let endStationIndex = lStations.indexOf(train.endStation)
			let x1 = (timeWidth * train.startTime) + stationNameMargin
			let y1 = (nameHeight * startStationIndex) + (nameHeight / 2)
			let x2 = (timeWidth * train.endTime) + stationNameMargin
			let y2 = (nameHeight * endStationIndex) + (nameHeight / 2)
			p5.line(x1, y1, x2, y2)
			lines.push([x1, y1, x2, y2])

			//Then, check if it intersects with previous lines
			p5.stroke('red');
  			p5.strokeWeight(10);
			for (let n = i - 1; n >= 0; n--) {
				console.log('doing intersection')
				const p2 = lines[n]
				const intersection = getLineIntersection(x1, y1, x2, y2, p2[0], p2[1], p2[2], p2[3])
				console.log('intersection: ', intersection)
				if (intersection) {
					p5.point(intersection[0], intersection[1])
				}
			}
			
			//Reset stroke at end
			p5.strokeWeight(0.5)
			p5.stroke(200)
		}
	};
}, 'railway');

function onInputChange() {
	railway.redraw()
}
generate.addEventListener("click", () => {
	railway.redraw()
})
</script>
