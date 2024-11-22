---
layout      : project
title       : "Godot - Mobile Controls"
date        : 2024-07-30
categories  : ["GameDev", "Godot"]
#start-date  : 
---

![virtual joystick](https://github.com/HubbleCommand/mobile_controls/blob/master/media/joystick.gif?raw=true)

While working on some projects, I wanted to be able to support mobile devices. The most important part for that, of course, is mobile-friendly input.

While I haven't particularly played mobile games in the last while (I used to do some puzzle games, things like SimCity, and others like PixelGun3D and Plague Inc, Survivor.io), the controls between them are fairly common.
This makes sense as they have to be fairly simple due to the limited screen size, which is also where all the user input happens.

The two most common ways to get user input is through virtual joysticks, and screen gestures.


## Existing projects
There are some other projects, however, I don't like how any of these have been done
- [GodotTouchInputManager](https://github.com/Federico-Ciuffardi/GodotTouchInputManager)
- [Godot Swipe Detector](https://github.com/arypbatista/godot-swipe-detector)
- [GDQuest gesture detecting tutorial](https://www.youtube.com/watch?v=7XlMqjikI9A)

Some haven't been updated to Godot 4, other's don't really work, other are badly designed, or just didn't have the features I wanted.

There are multiple issues with these; from design decisions like using Godot Actions instead of emulating joystick input, to critical issues with buggy or nonfunctional behavior, I wanted my own.


## Implementation
Check out the [Developer README](https://github.com/HubbleCommand/mobile_controls/blob/master/addons/mobile_controls/README.dev.md)
for more details about decisions made.


## Problems with Godot's Input system
Godot has one minor drawback: [Gestures (incl. Pan and Magnify) is not implemented on all platforms](https://github.com/godotengine/godot/issues/13139).
This isn't a deal breaker.
A lot of systems don't have these type of gesture systems.

However, the major, absolutely rediculous problem with Godot's input system is that [Control doesn't support Touchscreens](https://github.com/godotengine/godot/issues/15039).
This means that everything that inherits from Control, meaning the whole basis of Godot's UI system doesn't register input from mobile devices.
Think I'm kidding?
Go into your project's settings and disable `Input Devices -> Pointing -> Emulate Mouse From Touch`.

Now try using, for example, buttons on your mobile device.
Doesn't work, does it?

Why is it like this?
I have absolutely no idea.

Now, you might think that this doesn't matter, but it reveals problems with a fundamental system of Godot.
Going through the source, there is some *major* fuckery going on with input.
There is, effectively, no multi-touch support, which is why it's so fucky on mobile; it's hacky.

For me, the biggest issue is that a cross platform game engine should be abstracting platform differences.
Godot's "abstraction" is partial and a bandaid.

Historically, Godot has also had major issues when injesting Controller and Keyboard input.

