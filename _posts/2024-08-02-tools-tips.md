---
layout: post
title: "Tools & Tips"
date: 2024-08-02
last_modified_at: 2025-04-05
---

This is going to be an ongoing list of useful tools I've found & use.

Sections
- [Upcoming](#upcoming)
- [Tips](#tips)
- [Tools](#tools)
- [Hardware](#hardware)

# Upcoming

Be on the look out for [JitCI](https://jitci.com/) !!!
This is a CI platform made by [JitPack](https://jitpack.io/tests), which will build your releases.
Seems very promising!
> As of 2025-03-27, JitCI is still in beta

# Tips

[MarkDown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

[SCP for file transfer](https://kb.iu.edu/d/agye)

[Article on Jekyll components](https://sayzlim.net/jekyll-include-component/) I found after looking at the [documentation](https://jekyllrb.com/docs/includes/).
Also look at the [Jekyll Cheatsheet](https://cloudcannon.com/cheat-sheets/jekyll/).

Placing images in _posts causes UTF-8 read errors. Putting them in a directory that is not a collection (i.e. /assets) corrects the issue.

README best practices
- https://github.com/matiassingers/awesome-readme
- https://github.com/jonatasemidio/multilanguage-readme-pattern

## Databases

[Neo4j](https://neo4j.com/) is very good

## Windows

[Scoop](https://scoop.sh/) is an incredibly useful command-line installer for Windows.
Adds great tools like [7Zip](https://7-zip.org/).

- Moving Windows: `Alt` + `Space` followed by `M`.
  This will move your mouse so that you can move a window with the top bar.
  Then, just move your mouse until the application comes into view.
  Useful if you have multiple monitors shared between devices, and need to move an application to a different screen while it is owned by another device.

- Disabling Alt+Tab window grouping:
  `Settings` -> `System` -> `Multitasking` -> `Snap windows`
  Disable the following settings:
    - Show snap layouts when I hover over a window's maximise button
    - Show my snapped windows when I hover oiver taskbar apps, in Task View, and when I press ALt+Tab

## XML

You can import an XML file into another XML file with the [entity tag](https://www.w3.org/TR/REC-xml/#sec-external-ent). Import the file with `<!ENTITY otherFile SYSTEM "otherFile.xml">`, then reference it with `&otherFile;`:

```
<?xml version="1.0" standalone="no" ?>
<!DOCTYPE doc [ <!ENTITY otherFile SYSTEM "otherFile.xml">]>
<doc>
  <foo>
    <bar>&otherFile;</bar>
  </foo>
</doc>
```

## Git

One majorly annoying issue is suddenly having massive diffs for seemingly no reason. The culprit is usually changes to file line endings, or file mode changes. The following commands usually fix these issues by having git ignore some of these things.

https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration
`git config --global core.autocrlf true`<br>
`git config --global core.autocrlf input`<br>
`git config core.filemode false` <br>
`git config --global core.filemode false`<br>
`git add --renormalize`<br>
`git ls-files --eol`<br>
`git config --global core.whitespace=fix,-indent-with-non-tab,trailing-space,cr-at-eol`<br>

https://github.com/desktop/desktop/issues/18225
https://stackoverflow.com/questions/1967370/git-replacing-lf-with-crlf


## Ubuntu Commands

- Copy the contents of a folder `cp -a /source/. /dest/`, `-a` is an improved recursive option, `.` at the end of the source path copies all files & folders, including those that are hidden
- renaming folders is done with the `mv` command
- Remove all non-hidden files with `rm /path/to/dir/*`
- Remove all non-hidden files and directories with `rm -r /path/to/dir/*`
- Unpacking compressed directories
  - Unzip to a specific directory with `unzip /path/to/zip.zip -d /where/to/extract`
  - Untar with `tar -xvf tar.tar` (x: extract files from archive, v: be verbose, f: specify file input, z: use gzip compression to extract the archive)
  - Untar to directory with `tar -C /put/it/here -xvf tar.tar`
  - REBOL files are sometimes distributed as `.tar.gz` files. YOu can use the above commands to uncompress it, then run it. You will most likely need to give permissions to the resulting file with `chmod +x rebol/file`
- [Enable or disable a site /vhost in apache2](https://www.systutorials.com/docs/linux/man/8-a2ensite/)
- [Avoiding using sudo for `/var/www`](https://askubuntu.com/questions/46331/how-to-avoid-using-sudo-when-working-in-var-www)

## MSWord

To update all fields in a document (i.e. citation fields), press `Ctrl + A`, `F9`. You might need to select each table seperately.

## Edge

- When selecting groups of tabs in Firefox, closing one will close all of the selected tabs.
  Edge doesn't do this, but hitting the `Ctrl + W` shortcut will close selected tabs in the current window.

- [Console tool utility functions and selectors](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/console/utilities)

See [here]({{ site.url }}{{ site.baseurl }}{% link _posts/2024-06-13-using-edge.md %}) for more.

## VSCode

You can configure it so that opening a folder will open in a new window, instead of in the current one: `window.openFoldersInNewWindow: on`

[Some good tips from Fireship](https://www.youtube.com/watch?v=u21W_tfPVrY)

A very good [TODO extension](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)


Turn off auto indentation (sometimes helps with git diff issues). Access preferences with File → Preferences → Settings or `Ctrl + ,`
```
// The number of spaces a tab is equal to. This setting is overridden
// based on the file contents when `editor.detectIndentation` is true.
"editor.tabSize": 4,

// Insert spaces when pressing Tab. This setting is overriden
// based on the file contents when `editor.detectIndentation` is true.
"editor.insertSpaces": true,

// When opening a file, `editor.tabSize` and `editor.insertSpaces`
// will be detected based on the file contents. Set to false to keep
// the values you've explicitly set, above.
"editor.detectIndentation": false
```

Regex code to delete all instances of a specific tag, including their content

```\n?<description>[\S\s\n]*?<\/description>\n?```

You can disable the editor scrolling past the end of a file with the setting `editor.scrollBeyondLastLine : false`

Auto format with `Ctrl + Shift + P` or with ths shortcut `Shift + Alt + F`.

## Android Studio

`Ctrl + Alt + L` auto formats code

# Tools

- [musikerkennung](https://musikerkennung.com/en/) music recognition tool that I've had the best luck with

[Taiga](https://taiga.io/) is a good tool for project management.
It's an open source, self-hostable, better version of Jira & GitHub issues.

## Apps

- [Audacity](https://www.audacityteam.org/)
- [Graphite.rs](https://graphite.rs/), [editor](https://editor.graphite.rs/) neat vector drawing tool (needs better exporting tho)
- [Blender](https://www.blender.org/) for obvious reasons, [Dust3D](https://github.com/huxingyi/dust3d) also exists, but whatever
- [Krita](https://krita.org/en/)
- [Inkscape](https://inkscape.org/) and [GIMP](https://www.gimp.org/)
- [Lightworks](https://lwks.com/)
- [OpenShot](https://www.openshot.org/) FOSS video editing
- [PenPot](penpot.app) seems VERY good for making UI with direct code generation
- [RenderMan](https://renderman.pixar.com/) Pixar's open-sourced renderer
- [VRoid Studio](https://www.youtube.com/watch?v=p8xQ0waBwPo) never used
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) Very good tool to download videos from [hundreds of different sources](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)
- [Photopea](https://www.photopea.com/)[a](https://www.youtube.com/watch?v=7tfiP8Wd1pw) free online photoshop clone
- [hoppscotch](https://github.com/hoppscotch/hoppscotch) and alternative to [Postman](https://www.postman.com/product/what-is-postman/)

## Services

- [JitPack](https://jitpack.io/) Easy to use package repository for Git
- [MyAirBridge](https://www.myairbridge.com/en/#!/) very useful for sending large files
- [Anonymousemail](https://anonymousemail.me/) just found, never used, can't think of a use, more interested in how it works
- [PopTox](https://www.poptox.com/) free online phone service, interested in how this works
- [API speed testing](https://tools.keycdn.com/performance)
- [Mock API](https://jsoning.com/api/)
- [MarkDown table generator](https://www.tablesgenerator.com/markdown_tables#)
- [AddText](https://addtext.com/) add text to an image
- [jsDelivr](https://www.jsdelivr.com/?docs=gh) very good & simple CDN for JS libs.
- [devicon](https://devicon.dev/) A VERY useful resource that contains hundreds of development-related icons, such as for programming languages
- [shields.io](https://shields.io/) Very nice to make status badges

## Text Formatters

- [Remove extra spaces](https://codebeautify.org/remove-extra-spaces)
- [JSONFOrmatter](https://jsonformatter.curiousconcept.com/)
- [Double quotes to single quotes](https://tools.knowledgewalls.com/convert-double-quotes-to-single-quotes-online)

## Engineering related

- [Eagle](https://www.autodesk.com/products/eagle/free-download) pcb design
- [fritzing](https://fritzing.org/learning/tutorials/designing-pcb/) hardware design
- [Digi XCTU](https://www.digi.com/products/embedded-systems/digi-xbee/digi-xbee-tools/xctu) interface with XBees from Windows

## Game Dev Related

- [Ezy-Slice](https://github.com/DavidArayan/ezy-slice) Unity3D slicer framework
-> look into [Codacity](https://www.codacy.com/pricing), have open-source free tier
- [Terragen](https://planetside.co.uk/free-downloads/terragen-4-free-download/)  terrain generation
- [World Machine](https://www.world-machine.com/) terrain generation
- [World Creator](https://www.world-creator.com/en/index.phtml) terrain generation
- [Shape Shifter](https://shapeshifter.design/) for vector animation
- [Rive](https://rive.app/) for vfector graphics & animation, integrates with Defold

### Assets

- [The Base Mesh](https://www.thebasemesh.com/) repository of 3D base assets
- [ambientCG](https://ambientcg.com/) repository of free blender materials and 3D models
- [Kenney](https://www.kenney.nl/assets) good guy that makes mostly free assets
- [FreeStockTextures](https://freestocktextures.com/) as it's name implies, a collection of free stock textures (and images, photos, etc)
- [GameDevMarket](https://www.gamedevmarket.net/asset/space-shooter-1-5280)
- [OpenGameArg](https://opengameart.org) collection of open-source game art
- [bensound](https://www.bensound.com/)
- [AudioLibraryFreeMusic](https://www.youtube.com/@AudioLibraryFreeMusic)
- [1001freefonts](https://www.1001freefonts.com/retro-fonts-5.php)
- [FontSpace](https://www.fontspace.com/dieselpunk-font-f24099)
- [FontForge](https://fontforge.org/) for editing fonts
- [lospec](https://lospec.com/palette-list) for palettes
- [ColorHex](https://www.color-hex.com/color-palette/33626) for more palettes
- [Sonniss](https://sonniss.com/gameaudiogdc/) for audio

### Asset creation

- [LibreSprite](libresprite.github.io) pixel sprite maker
- [DPaint.js](https://www.stef.be/dpaint/)[a](https://www.youtube.com/watch?v=9CvxRgU8p1c) pixel paint tool
- [Pixelorama](https://orama-interactive.itch.io/pixelorama) pixel paint tool
- [MusicMaker](https://www.magix.com/int/music/music-maker/)
- [LMMS](https://github.com/LMMS/lmms) for music production
- [ChiptTone](https://sfbgames.itch.io/chiptone)[a](https://www.youtube.com/watch?v=v51fDrZXh_I) for creating sound effects
- [NormalMapOnline](http://cpetry.github.io/NormalMap-Online/) nifty tool to generate a simple normal map for a texture
- [G'MIC](https://gmic.eu/)[a](https://www.youtube.com/watch?v=1agzsBn7ZE0) assorted image processing tools
- [OpenToonz](https://opentoonz.github.io/e/)[a](https://www.youtube.com/watch?v=x_kbuQNxzik)[repo](https://github.com/opentoonz/opentoonz) 2D animation software
- [Cascadeur](https://cascadeur.com/)[a](https://www.youtube.com/watch?v=XFmCFuNAM4s) 3D animation tool
- [pixeldudesmaker](https://0x72.itch.io/pixeldudesmaker)
- [blockbench](https://www.blockbench.net/)
- [smack studio](https://smackstudio.com/characters/) game with very good pixel art & animation tools

### AI assisted creation

This is generally good for creating placeholders

- [AIVA](https://www.aiva.ai/)[a](https://www.youtube.com/watch?v=AbJcXa101gU) music creation
- [Strofe](https://www.strofe.com/get-started)[a](https://www.youtube.com/watch?v=r9ne-p0dADQ) music creation
- [CyberVoice, now SteosVoice](https://cybervoice.io/en/)[a](https://www.youtube.com/watch?v=N0ulcW_yY3k) voice
- [DeepAI](https://deepai.org/machine-learning-model/pop-art-generator) generator for many things (chat, images, video, music)

## Stores

- [distrelec](https://www.distrelec.ch/en/)
- [3DJake](https://www.3djake.ch/fr-CH/imprimantes-3d-et-plus)
- [Play-Zone](https://www.play-zone.ch/en/)
- [Mouser](https://www.mouser.com/)
- [Electrofun](https://www.electrofun.pt/en/arduino-sensors/accelerometers-and-gyros)
- [Adafruit](https://www.adafruit.com/)
- [Sparkfun](https://www.sparkfun.com/products/retired/15897)
- [ThingsMobile](https://www.thingsmobile.com/business)

# Hardware

## XBee vs Bluetooth

|       | XBee      | Bluetooth |
| ----- |   ------  |-----------|
| speed | 250 kbps  | 25 Mbps   |
| range | 0.1-1.6km | 10m-100m  |

XBee
- [S1 sheet](https://www.digi.com/resources/library/data-sheets/ds_xbeemultipointmodules)
- [overview](https://cdn.sparkfun.com/datasheets/Wireless/Zigbee/ds_xbeezbmodules.pdf)
- [full data sheet](https://www.sparkfun.com/datasheets/Wireless/Zigbee/XBee-Datasheet.pdf)
