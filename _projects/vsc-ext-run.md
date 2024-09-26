---
layout      : project
title       : "VSCode Extension : Run"
date        : 2024-01-13
categories  : []
programming-languages: ["Javascript", "TypeScript"]
icons       : ["vscode", "typescript", "javascript"]
start-date  : 2024-01-13
last_modified_at: 2024-08-02
active: true
---

> After a few months, the extension has recently passed 10'000 installs! (2024-08)

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
It gets exported to an Excel file, so [SheetJS](https://sheetjs.com/) was a logical choice for handling the data.

However, the biggest issue was date parsing.
At first, date parsing wasn't working at all, but switching CDN made it work (read the first warning [here](https://docs.sheetjs.com/docs/getting-started/installation/standalone/)).
The documentation for Date, while present [here](https://docs.sheetjs.com/docs/csf/features/dates/), is incomplete, and [this issue](https://git.sheetjs.com/sheetjs/sheetjs/issues/718) describing the usage of `dateNF` was a lifesaver.

I originally tried working with JSON and sheets.
However, JSON conversions will force a loss of typing at inconvenient stages, so it is much better to use [Arrays of Arrays](https://docs.sheetjs.com/docs/api/utilities/array/#array-of-arrays) to keep the relevant type unconverted for the longest amount of time.



<script lang="javascript" src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>

Print file name in console: 
<input type="file" onchange="console.log(this.files[0].name)">


Merge selected Excel report files:
<input type="file" id="report" name="reports" accept=".xlsx" multiple/>

<script>
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

			//JSON.parse is very similar to  XLSX.utils.sheet_to_json
			//var XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[statsSheet]);
			//console.log(XL_row_object)
			//var json_object = JSON.stringify(XL_row_object);
			//console.log(JSON.parse(json_object));

			//var arr = XLSX.utils.sheet_to_json(wb.Sheets[statsSheet], {UTC: true, header: 0, blankrows: true, dateNF: 'yyyy"."mm"."dd'});
			var arr = XLSX.utils.sheet_to_json(wb.Sheets[statsSheet], {UTC: true, header: 0, blankrows: true, dateNF: 'dd"."mm"."yyyy'});
			//var arr = XLSX.utils.sheet_to_json(wb.Sheets[statsSheet], {header: 0, blankrows: true});
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
	//const worksheet = XLSX.utils.json_to_sheet(stats, {/*cellDates: true*/});
	//const worksheet = XLSX.utils.json_to_sheet(stats);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, sheet, "Daily Stats");
	XLSX.writeFile(workbook, `Report - generated ${new Date().toISOString()}.xlsx`, { compression: true });
}

document.getElementById('report').onchange = async function() {
	var files = event.target.files
	console.log('Files:')
	console.log(files)
	//var dates = new Map()
	//var dates = [["Date", "Installs", "Views"]]
	var dates = []
	for (let file of files) {
		console.log(`loading file: ${file.name}`)
		const parsed = await readDailyStats(file)
		console.log(`loaded file: ${file.name}`)

		for (let entry of parsed) {
			//const _date = entry["Date(UTC)"]
			//console.log(_date)
			//const date = `${_date.getUTCFullYear()}-${_date.getUTCMonth()}-${_date.getUTCDate()}`

			const date = entry["Date(UTC)"]
			console.log(date)

			/*
			if (dates.some(e => e.date === date)) {
				
			}*/
			var found = dates.find(e => e[0].valueOf() === date.valueOf())

			if (found) {
				if (found.installs < entry["Install from VSCode"]) {
					/*found = {
						date: date,
						views: entry["Page Views"],
						installs: entry["Install from VSCode"]
					}*/
					found = [
						date,
						entry["Page Views"],
						entry["Install from VSCode"]
					]
					continue
				}
			}
			/*dates.push({
				date: date,
				views: entry["Page Views"],
				installs: entry["Install from VSCode"]
			})*/
			dates.push([
				date,
				entry["Page Views"],
				entry["Install from VSCode"]
			])
			
			//Version with Map
			/*if (dates.has(date)) {
				if (dates[date]["installs"] > entry["Install from VSCode"]) {
					continue
				}
			}
			dates[date] = {
				"views": entry["Page Views"],
				"installs": entry["Install from VSCode"],
			}*/
		}
	}

	dates.unshift(["Date", "Installs", "Views"])

	console.log(dates)


	exportDailyStats(XLSX.utils.aoa_to_sheet(dates, {cellDates: true, dateNF: 'dd"."mm"."yyyy'}))


	//Only do this for Map
	/*let obj = Object.entries(dates)	//Here is where the type shit was going bad...
	console.log(obj)

	let hh = obj.map((item) => {
		return {date: item[0], views: item[1].views, installs: item[1].installs}
	})
	console.log(hh)
	exportDailyStats(hh)*/


	//let array = Array.from(dates, ([date, value]) => ({ date, value["viws"], value["installs"] }));
	//let array = Array.from(dates, ([name, value]) => ({ name, value }));
	//let array = Array.from(dates);
	//console.log(array);
	/*let array2 = array.map((item) => {
		return {date: item.date, }
	})*/
	//const obj = Object.fromEntries(dates)
	//console.log(obj)
	//const json = JSON.stringify(Object.fromEntries(map))
	//exportDailyStats(Object.entries(dates))
}
</script>
