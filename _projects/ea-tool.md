---
layout      : project
title       : "EA Tool"
date        : 2024-12-05
categories  : ["WebDev", "App", "Architecture"]
published: false
---

> DEFUNCT, necessary stakeholders not interested

> While it could be possible to get people like JHMrn or groups like InnoSuisse to cover, they do not have the same weight as unnamed stakeholders

> This is solely for archival purposes


# Origin

Many EA tools are very, very expensive.
Often, when organisations want to start an EA practice, they don't have the budget for such tools.
This leads to a catch-22 where small EA teams are expected to deliver big with no budget and no tool.

The idea is simple: provide a barebones EA tool for cheap so that EA teams can get the practice off the ground.


# Tech

This would most likely be a web-based tool, especially due to collaborative editing.

[Svelte](https://svelte.dev/) would be ideal, and I have enjoyed using it in the past.
However, Svelte has changed since I last used it with the runes system, see more [here](https://www.youtube.com/watch?v=aYyZUDFZTrM).
Here's a [good video](https://www.youtube.com/watch?v=VMDydLUCLtE&ab_channel=Theo-t3%E2%80%A4gg) of how these frameworks work under the hood.

[D3](https://d3js.org/) could be an interesting place to look for graphing, see their [samples](https://d3-graph-gallery.com/).
[shadcn/ui](https://ui.shadcn.com/) is another good source of componenets.
[AG Charts](ag-grid).

Regarding collaboration tech, the most interesting is [yjs](https://github.com/yjs/yjs), watch more [here](https://www.youtube.com/watch?v=NKGTsxvQK9g).

[Neo4j](https://neo4j.com/pricing/) and [CockroachDB](https://www.cockroachlabs.com/) are both viable databases.
