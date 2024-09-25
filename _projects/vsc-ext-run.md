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
