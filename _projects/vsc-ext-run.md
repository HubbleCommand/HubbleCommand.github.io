---
layout      : project
title       : "VSCode Extension : Run"
date        : 2024-01-13
categories  : []
programming-languages: ["Javascript", "TypeScript"]
icons       : ["vscode", "typescript", "javascript"]
start-date  : 2024-01-13
last_modified_at: 2025-06-09
active: true
---

> After a few months, the extension has recently passed 10'000 installs! (2024-08)
> After about a year, we're past 40'000! (2025-05)

[ext-url]: https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner
[![Ratings Badge](https://img.shields.io/vscode-marketplace/v/hcommand.run-runner.svg)][ext-url]
[![Downloads Badge](https://img.shields.io/vscode-marketplace/d/hcommand.run-runner.svg)][ext-url]
[![Installs Badge](https://img.shields.io/vscode-marketplace/i/hcommand.run-runner.svg)][ext-url]
[![Ratings Badge](https://img.shields.io/vscode-marketplace/r/hcommand.run-runner.svg)][ext-url]
[![License Badge](https://img.shields.io/github/license/hubblecommand/run.svg?color=blue)](https://github.com/hubblecommand/run/blob/master/LICENSE)

> I discovered that making some changes to Visual Studio Code's `launch.json` allows me to start the engine executible and launch my test project. I was originally having issues with SCons not doing incremental builds, which kick-started the development of this extension, but it's fixed now. Additionally, all the features I wanted have been implemented. Hence, development of this extension will most likely not continue.

While working on Godot, I was annoyed by something. I was using VSCode to edit and build the engine, however I had to keep a separate File Explorer open to the `bin` folder to launch my builds of Godot. I already have a lot of windows open, and I try to keep them to a minimum. The window itself is also not the same size (unless I pout it to fullscreen, which I don't like to do with Explorer windows), so when I'm alt-tab'ing between windows they don't align nicely in a grid. I know, OCD, but that's the way it is for me.

To furthur reduce clutter and keep my alt-tab tidy, I [created this small extension](https://github.com/HubbleCommand/run) that would allow me to launch the builds directly from VS Code. I also [published it to the VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner) so that I could easily use it accross devices.

When I went to publish, I found [another similar extension](https://marketplace.visualstudio.com/items?itemName=HarryHopkinson.run-exe). However, it only allows for starting `.exe` files, using wine to start them on Linux. The main difference is that my `run` allows easy running or opening of any file by utilising the openExternal function, providing a useful additional feature.

Another nice thing about it is that when starting it with the Terminal option, I can close the Terminal in VSCode to close all of the open Godot windows quickly (sometimes the engine takes a while to close when there is a running process).

## TODOs
- [it could be interesting to translate the extension](https://www.npmjs.com/package/vscode-nls)
- [ci & testing would be nice](https://code.visualstudio.com/api/working-with-extensions/testing-extension)

## Most important resources
- [when clause](https://code.visualstudio.com/api/references/when-clause-contexts)
- [context menus](https://code.visualstudio.com/api/ux-guidelines/context-menus) and [corresponding api](https://code.visualstudio.com/api/references/contribution-points#contributes.menus)


## Reports generator
As this extension is getting a lot of downloads, I wanted to see how it's usage is progressing.
The Admin pannel allows you to download basic daily download stats, so I'll work with that.

## Parsing Excel
The daily reports gets exported to an Excel file, so [SheetJS](https://sheetjs.com/) was a logical choice for handling the data.

However, the biggest issue was date parsing.
At first, date parsing wasn't working at all, but switching CDN made it work (read the first warning [here](https://docs.sheetjs.com/docs/getting-started/installation/standalone/)).
The documentation for Date, while present [here](https://docs.sheetjs.com/docs/csf/features/dates/), is incomplete, and [this issue](https://git.sheetjs.com/sheetjs/sheetjs/issues/718) describing the usage of `dateNF` was a lifesaver.

I originally tried working with JSON and sheets.
However, JSON conversions will force a loss of typing at inconvenient stages, so it is much better to use [Arrays of Arrays](https://docs.sheetjs.com/docs/api/utilities/array/#array-of-arrays) to keep the relevant type unconverted for the longest amount of time.

### Graphing
The handling of the date is the first bit; the second bit is graphing.

While I could do it in Excel or LibreOffice Calc, I also wanted the graph to be easily generated and be present in the README.
Thankfully, I've already looked into this in my [post on UML modeling tools]({{ site.url }}{{ site.baseurl }}{% link _posts/2024-04-10-uml-modeling.md %}), and MermaidJS is still as good as ever.

Below, you can upload multiple Excel files, which will be merged, exported, and a MermaisJS diagram will also be generated below, gr
ouping the data by month.

<script lang="javascript" src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>


Merge selected Excel report files:
<input type="file" id="report" name="reports" accept=".xlsx" multiple/>

<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.2.1/+esm'

mermaid.initialize({
	startOnLoad: true,
	logLevel: "warn",
	seciurityLevel: "loose"
});

const standardOptions = {
	UTC: true, header: 0, blankrows: true, dateNF: 'dd"."mm"."yyyy'
}

function readDailyStats(file) {
	return new Promise((resolve) => {
		var reader = new FileReader();
		reader.onload = function(e) {
			var data = e.target.result;
			var wb = XLSX.read(data, {
				type: 'binary',
				cellDates: true,
				dense: true
			});
			console.log(wb)
			var statsSheet = wb.SheetNames[0]
			var arr = XLSX.utils.sheet_to_json(wb.Sheets[statsSheet], standardOptions);
			console.log("Array")
			console.log(arr)

			resolve(arr)
		};
		reader.onerror = function(ex) {
			console.log(ex);
		};
		reader.readAsBinaryString(file);
	})
}

function exportDailyStats(sheet) {
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, sheet, "Daily Stats");
	XLSX.writeFile(workbook, `Report - generated ${new Date().toISOString()}.xlsx`, { compression: true });
}

document.getElementById('report').onchange = async function() {
	var files = event.target.files
	console.log('Files:')
	console.log(files)
	var dates = []
	for (let file of files) {
		console.log(`loading file: ${file.name}`)
		const parsed = await readDailyStats(file)
		console.log(`loaded file: ${file.name}`)

		for (let entry of parsed) {
			const date = entry["Date(UTC)"]
			var found = dates.find(e => e[0].valueOf() === date.valueOf())

			if (found) {
				if (found.installs < entry["Install from VSCode"]) {
					found = [
						date,
						entry["Page Views"],
						entry["Install from VSCode"]
					]
					continue
				}
			}
			dates.push([
				date,
				entry["Page Views"],
				entry["Install from VSCode"]
			])
		}
	}

	dates.unshift(["Date", "Installs", "Views"])	//Add header row

	exportDailyStats(XLSX.utils.aoa_to_sheet(dates, standardOptions))

	dates.shift() //remove header

	var monthlyStats = []
	for (let date of dates) {
		const month = date[0].getUTCMonth()
		const year = date[0].getUTCFullYear()
		const id = `${year}-${month}`
		const found = monthlyStats.find(e => e[0] === id)

		if (found) {
			found[1] += date[1]
			found[2] += date[2]
			continue
		}
		monthlyStats.push([
			id,
			date[1],
			date[2]
		])
	}

	drawDiagram(monthlyStats.reverse());
}

const drawDiagram = async function (stats) {
    const graphElement = document.getElementById('report-graph');
	var graphDefinition = `
		xychart-beta
			title "Monthly Stats"
			x-axis [${stats.map((e) => e[0])}]
			y-axis "Downloads"
			line [${stats.map((e) => e[2])}]
		`
    const { svg } = await mermaid.render('gr', graphDefinition);
    graphElement.innerHTML = svg;
  };
</script>

<div id="report-graph" class="mermaid">
	graph LR
    A --- B
</div>

## Release 1.1.0 - settings & better packaging

Following a [feature request](https://github.com/HubbleCommand/run/issues/3), I added some extra settings to the extension.

However, before publishing, I went and updating my packages.
This time around, VSEC gave an output of what files were included, and the size.

I was sort of appaled by the 1MB+ size of a miniscule extension, so I removed what I could.
Lo and behold, the extension is now a reasonable size: 20 odd kilobytes.

Not bad, not bad.

<table>
	<tbody>
		<tr>
			<td><img src="/assets/images/vscodeignore_unclean.png"></td>
			<td><img src="/assets/images/vscodeignore_clean.png"></td>
		</tr>
	</tbody>
	<caption>
		vsec outputs when packaging with different .vscodeignore settings
	</caption>
</table>
