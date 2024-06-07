---
layout: post
title: "Badges & Icons"
date: 2024-06-07
---


## Icons
Small icons are a nice thing to have, and are definitely nicer to have than just a long list of text.
I was specifically looking for a resource of programming language icons, so that I could show the programming languages used per project without just pasting a wall of text.

[Devicon](https://devicon.dev/) turned out to be an amazing source, and has hundreds of development-related icons.

<i class="devicon-windows11-original"></i>
<i class="devicon-cplusplus-plain"></i>
          
Another good one is [simpleicons](https://simpleicons.org/). They provide icons for brands, and ranges from programming languages to shoe brands and airlines. There are [many ways to use it](https://github.com/simple-icons/simple-icons?tab=readme-ov-file#usage), so it's actually pretty handy.

<img height="32" width="32" src="https://cdn.simpleicons.org/dotnet/hotpink" />
<img height="32" width="32" src="https://unpkg.com/simple-icons@v12/icons/dotnet.svg" />


## Badges
When I went to publish my [Preftils](https://github.com/HubbleCommand/preftils) package to [JitPack](https://jitpack.io/#HubbleCommand/preftils), it suggested that:
> Paste this in your README.md to add a badge: <br>
>`[![](https://jitpack.io/v/HubbleCommand/preftils.svg)](https://jitpack.io/#HubbleCommand/preftils)`

Given that it was super easy to do, I decided to look into adding status badges for different things in my repos. [yt-dlp](https://github.com/yt-dlp/yt-dlp/blob/master/README.md) and the [vscode rust extension](https://github.com/swellaby/vscode-rust-pack/blob/master/README.md) have quite a few in their READMEs, and I generally like seeing these badges as I can quickly see things like version, downloads, CI status, etc.

After adding JitPack's badge, I found the service [shields.io](https://shields.io/) that allows for making static and dynamic badges.

Below are some of the ones I've included in my repos.


### GitHub
```
[![License Badge](https://img.shields.io/github/license/hubblecommand/run.svg?color=blue)](https://github.com/hubblecommand/run/blob/master/LICENSE)
```
[![License Badge](https://img.shields.io/github/license/hubblecommand/run.svg?color=blue)](https://github.com/hubblecommand/run/blob/master/LICENSE)

A more advanced usage is to show the status of [GitHub Actions workflows](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)

### VSCode marketplace
Taken from [run](https://github.com/hubblecommand/run/blob/master/README.md)
```
[![Ratings Badge](https://img.shields.io/vscode-marketplace/v/hcommand.run-runner.svg)](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner)
[![Downloads Badge](https://img.shields.io/vscode-marketplace/d/hcommand.run-runner.svg)](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner)
[![Ratings Badge](https://img.shields.io/vscode-marketplace/r/hcommand.run-runner.svg)](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner)
```
[![Ratings Badge](https://img.shields.io/vscode-marketplace/v/hcommand.run-runner.svg)](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner)
[![Downloads Badge](https://img.shields.io/vscode-marketplace/d/hcommand.run-runner.svg)](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner)
[![Ratings Badge](https://img.shields.io/vscode-marketplace/r/hcommand.run-runner.svg)](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner)


### JitPack
Taken from [preftils](https://github.com/HubbleCommand/preftils/blob/master/README.md)
```
[![Version Badge](https://jitpack.io/v/HubbleCommand/preftils.svg)](https://jitpack.io/#hubblecommand/preftils)
[![Downloads Badge](https://jitpack.io/v/HubbleCommand/preftils/month.svg)](https://jitpack.io/#hubblecommand/preftils)
```
[![Version Badge](https://jitpack.io/v/HubbleCommand/preftils.svg)](https://jitpack.io/#hubblecommand/preftils)
[![Downloads Badge](https://jitpack.io/v/HubbleCommand/preftils/month.svg)](https://jitpack.io/#hubblecommand/preftils)
