---
layout: post
title: "Game Engines"
date: 2021-08-15
last_modified_at: 2024-06-04
---

> I originally preferred Flax to Godot, and honestly I think they're both great engines. However, Godot's UI and 2D systems are much better, and I think the Godot has a brighter future. While the Arizona Framework for Flax is a good step, and I prefer the C++ / C# interoperability, it's still a long way from the ease of use of Godot.

# TL;DR

A few general notes:
- Godot is the reigning champion; small, quick, and easy to block out games. Graphically it doesn't compete, but the visuals are what you make in any engine anyways.
- Both Stride3D and FlaxEngine are VisualStudio templates (ish), and Flax is by far the lightest engine compared to the performance it delivers
- Unreal Engine is far above the competition. However, it's a truly massive engine, with high performance requirements, and it is difficult to tune. I don't have the resources to make photo-realistic games, nor do I care to make them. A good game is measured by how fun it is, and a lot of fun games that are limited by performance limit the audience it can reach (i.e. [BFG:A2](https://store.steampowered.com/app/573100/Battlefleet_Gothic_Armada_2/)).
- Unity is trash: always has been, always will be

# #1 [Godot](https://godotengine.org/)
Of course, Godot is number one. I feel that any indie dev is going to say that in this day and age. I was playing around with Godot in the early days of 3.1, and have seen it improve greatly with massive bug fixes, system improvements, and new features.

The unique approach of using Nodes and Trees instead of an [ECS](https://en.wikipedia.org/wiki/Entity_component_system) results in a unique approach to game development. Well thought out systems like the UI and multiplayer make it quick to block out games for quick testing, and later fill it in.

My only real gripe is that they made their own language for scripting: GDScript. While I can follow their reasoning, the issue is that is has the same issues as [Dart](https://dart.dev/); it's a language that exists for a single framework, and needs consistent reworks to make it usable.

Notes:
- Godot 3.x doesn't support Blender's advanced PBR materials or nodes, as is blender-specific
- Godot objects leave from the bottom of the tree up, with autoloads exiting the tree last

# #2 [Flax](https://flaxengine.com/)
Flax originally started as Celelej back in 2014-2015, and has since been renamed after a complete rewrite of the engine from C# to C++. It's very performant, has very good visual fidelity especially compared to it's small memory and CPU footprint, and is still actively developed. Interestingly, it still has C# support for scripting, while allowing to write critical code in C++ out of the box. This is better than Godot's C++ support, which requires rebuilding the engine.

> In Godot 4.x it is no longer required to rebuild the engine if you want to use C++, only if you want to change the engine itself.

There are only two downsides to the engine:
- Unity-like 2D support (still renders in 3D space, but also lacks any 2D systems like 2D physics)
- Clunky UI system
> As of Flax 1.8, [there is now a proper UI editor](https://flaxengine.com/blog/flax-1-8-released/)!

There are a few main reasons I consider Flax better than Unreal:
- Choice of doing higher-level scripting in C#, or performant C++
- Very performant with a small memory footprint,, and very light on the CPU as long as you don't write bad code
- Looks good out of the box, with lighting having no artifacts and requiring no special modeling (Unreal Engine 4 had horrible issues with light leak)

While the Arizona Framework provides a really good starting point, the problem is that it's an entire framework, not something like Unreal's Lyra starter project. Arizona includes an impressive amount of work to streamline working with the engine (in particular the networking).

Flax lacks Godot's animated sprites, it does support sprite sheets through the [Sprite Atlas](https://docs.flaxengine.com/manual/graphics/sprites/modifying-sprite-atlas.html).

# #3 [Unreal Engine ](https://www.unrealengine.com/en-US)
Unreal is obviously an incredibly powerful engine. There is no other engine that even comes close to feature parity. It gets constantly updated with industry firsts with features like Lumen and Nanite. If there was any teams to be considered "rock-star", it would be the incredibe teams behind Unreal.

While UE has the most features, and is the most photo-realistic, the truth is that I use only a fraction of those features, and that photo-realism isn't something I strive for in my games. I only cared about it so much even back in the day, and seeing the jumps in visual quality from Battlefield 2, 3, then 4 was exciting, but the reason I played games was for their fun factor. Compared to other engines, it has massive performance requirements compared to what you get at the indie level, and can be incredibly time-consuming and tedious to tune. With other engines, I can focus on my code, instead of spending more time optimizing the engine. I also just don't understand the shift to visual fidelity: making a game look good has nothing to do with photorealism, and has everything to do with styling.

# #4 [Stride3D](https://www.stride3d.net/)
Stride 3D is neat, [it's had a long and tumultuous development](https://www.youtube.com/watch?v=gNZ6Gm3kRMI), but there isn't anything that it offers in particular. With engines like Flax and Godot getting updated so fast with fixes and new features by an active community, I don't think there's much of a point to it anymore. 

The UI system could use much work, being worse than Flax's. There are a lot of missing features compared to engines of similar age, but some of them can be cobbled together from the rest of the .NET ecosystem, i.e. multiplayer can be added with a library like RSignal.

# #5 [Bevy](https://bevyengine.org/)
A rust-based game engine that is very new and still not released. It's simple architecture and ability to use the rust ecosystem means that in the long run it could have a large community. While it's still behind in many areas and has a long way to go, I think it could compete with Godot in the indie space.

There is also the whole Rust vs C++ discussion to be had.

# #6 [Haxe](https://haxe.org/blog/shirogames-stack/) / [Heaps.io](https://heaps.io/index.html)
I generally prefer Haxe to GDScript as the class system is much better, and networking seems slightly easier. However, there are few included features, with a laclustre UI system and no physics or collision detection. You have to create a lot of systems yourself, and for me the point of a game engine is exactly to avoid making basic systems. If I wanted to make these systems myself, I would make my own engine / framework.

# #7 [Unity](https://unity.com/)
> When I originally wrote this post in 2021, it was certainly against the grain to have considered Unity a "bad engine". My reasons at the time, which I still stand by, are still stated below. Nowadays, it's more mainstream that Unity is considered a "bad engine", but mostly due to the Runtime fees they had planned to add. While the licensing issues have always been a part of Unity, I find that the engine and editor themselves have been going downhill for years.

Some may find it weird thet Unity classes so low. Keep in mind, I do think Unity has its place; the trash.

Anyone with either cursory knowledge or who has tried to publish a game should be well versed in the various issues that plague Unity. There are a sleuth of issues that will never be fixed, and a lot of features that are missing. The worst thing is that Unity is highly opinionated, but has very little documentation of how opinionated it really is. The Gigaya sample was supposed to give a template, but it was cancelled. Even Flax has the Arizona framework. Even the CMS Concrete5, which has plenty of issues, has gradually addressed them with a fraction of the resources that Unity has.

Key lacking features
- Multiplayer : cool, finally MLAPI is coming, after literal YEARS of UNet being deprecated. Oh wait, it ISN'T made by Unity's team? They literally couldn't? 
	While I appreciate the use of open source stuff in general, it's honestly pathetic that the game engine with one of the strictist licensing policies can't seem to make their engine.
> [MLAPI has since been deprecated](https://docs-multiplayer.unity3d.com/netcode/current/installation/upgrade_from_mlapi/). At least this time it was replaced with a new system, unlike before where there was literally no official networking solution. It is still rediculous that there has never been a stable, official API for networking in Unity.
- Nested prefabs : Both Stride3d and Flax have this. Is Unity trying? Then there's Godot's much simpler approach of only using scene trees.

While I fell that the question "is x software dead" is semantically the same as a yo mamma joke, I honestly think that Unity's development is dead, and has been for years. Unity is more focused on how to be profitable with ads or cloud services then actually making a good game engine. With Unity's near refusal to do anything intersting with their engine, or provide critical features, I feel that it will, eventually, go the way of all other ignored software : dead.
