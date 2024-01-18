---
layout      : project
title       : "Visual Studio Code Extension : Run"
date        : 2024-01-13
categories  : ["Godot", "Extensions"]
programming-languages: ["Javascript", "TypeScript"]
start-date  : 2024-01-13
last_modified_at: 2024-01-17
---

> I recently discovered that making some changes to Visual Studio Code's `launch.json` allows me to start the engine executible and launch my test project. I was originally having issues with SCons not doing incremental builds, which kick-started the development of this extension, but it's fixed now. Additionally, all the features I wanted have been implemented. Hence, development of this extension will most likely not continue.

While working on Godot, I was annoyed by something. I was using VSCode to edit and build the engine, however I had to keep a separate File Explorer open to the `bin` folder to launch my builds of Godot. I already have a lot of windows open, and I try to keep them to a minimum. The window itself is also not the same size (unless I pout it to fullscreen, which I don't like to do with Explorer windows), so when I'm alt-tab'ing between windows they don't align nicely in a grid. I know, OCD, but that's the way it is for me.

To furthur reduce clutter and keep my alt-tab tidy, I [created a small extension](https://github.com/HubbleCommand/run) that would allow me to launch the builds directly from VS Code. I also [published it to the VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner) so that I could easily use it accross devices.

When I went to publish, I found [another similar extension](https://marketplace.visualstudio.com/items?itemName=HarryHopkinson.run-exe). However it only allows for starting `.exe` files, using wine to start them on Linux. The thing is that Linux doesn't really use `.exe` files. Another major however is that mine also allows easy opening or running of any file by utilising the openExternal function, providing an additional feature.

Another nice thing about it is that when starting it with the Terminal option, I can close the Terminal in VSCode to close all of the open Godot windows quickly (sometimes the engine takes a while to close when there is a running process).

## TODOs
- [it could be interesting to translate the extension](https://www.npmjs.com/package/vscode-nls)
- [ci & testing would be nice](https://code.visualstudio.com/api/working-with-extensions/testing-extension)

## Most important resources
- [when clause](https://code.visualstudio.com/api/references/when-clause-contexts)
- [context menus](https://code.visualstudio.com/api/ux-guidelines/context-menus) and [corresponding api](https://code.visualstudio.com/api/references/contribution-points#contributes.menus)
