---
layout      : project
title       : "Godot - Directional Sprites"
date        : 2024-07-20
categories  : ["GameDev", "Godot"]
#start-date  : 
---


I really liked the game [BoltGun](https://www.focus-entmt.com/en/games/warhammer-40000-boltgun); a pixel retro look with modern lighting, effects, and framerate.

I stumbled upon [this cool video](https://www.youtube.com/watch?v=v6hg7fYSw8I), and was intruiged as to how it was implemented.


## Implementation
The starting point is the existing Sprite types to ensure an easy interoperability with GOdot's existing systems.
[SpriteBase3D](https://docs.godotengine.org/en/stable/classes/class_spritebase3d.html) is the base class of the two 3D sprite types:
[Sprite3D](https://docs.godotengine.org/en/stable/classes/class_sprite3d.html)
and
[AnimatedSprite3D](https://docs.godotengine.org/en/stable/classes/class_animatedsprite3d.html)
. The 2 2D Sprite types,
[Sprite2D](https://docs.godotengine.org/en/stable/classes/class_sprite2d.html)
and
[AnimatedSprite2D](https://docs.godotengine.org/en/stable/classes/class_animatedsprite2d.html)
, however, both inherit directly from
[Node2D](https://docs.godotengine.org/en/stable/classes/class_node2d.html)
.

### Using Cameras
The most basic implementation would do something like checking the rotation of the Sprite to a target camera, then changing the sprite based on that.
However, this doesn't work great: if there are multiple cameras (i.e. mirrors, portals, camera systems), then only one could ever be correct.
This especially won't work very well in a multiplayer environment: you can determine the local player's camera, but would create some very tight coupling between every entity and the player. I hate coupling things that don't need to, so I wanted to avoid this solution at all costs.

Here are some resources I found that do just that:
- [Slimebuck's 8Directional](https://github.com/slimebuck/Slimebucks-Godot-8Directional-Example)
- [Calham 8DirectionalSpriteIn3D](https://github.com/calham-21/8DirectionalSpriteIn3DDemo)
- [Reddit post with the camera solution](https://www.reddit.com/r/godot/comments/19bvu0l/testing_8directional_sprites_in_3d_thoughts/)
- [Wizardscrool Studio solution](https://www.youtube.com/watch?v=8p0UFkQhJ_M&ab_channel=WizardscrollStudio)
- [Miziziziz solution](https://www.youtube.com/watch?v=q0sLPbyIbQg&ab_channel=Miziziziz)
- [Eddie Studio solution](https://www.youtube.com/watch?v=tAElk1WnYn8&ab_channel=Eddie)
- [Gamedev Aki solution](https://www.youtube.com/watch?v=NZ7EP1Kt_sI&ab_channel=GamedevAki)

A more interesting and novel approach using [AnimationTree from Jon Topielski](https://www.youtube.com/watch?v=Xf2RduncoNU).


### Using Shaders
As I really wanted to avoid doing anything like that, I didn't.
Ideally, I wanted a solution that would work regardless of camera: some way to make it so that every camera would do the same thing when looking at this node.
I started looking into the C++ implementations of the 3D sprite classes, but realized that it would take a lot of time to get something working, and was about to give up due to time constraints.

Then, I stumbled upon [this Godot proposal](https://github.com/godotengine/godot-proposals/discussions/5082).
Someone suggested a shader, and I realized what a fool I was for not realizing that myself: it's exactly the way to get each camera to get the correct representation!

I don't feel to bad for using as a starting point.
There was a LOT more to add, and many issues to fix, but after a while I got it working with Godot's existing Sprite3D node parameters.

### Going back to 2D
Ironically, getting directional sprites in 2D is much more painful.

The shader itself took a bit longer as I did it from scratch.

However, I realized I had a problem once I looked into 2D lighting. 
2D lighting doesn't work the same at all as in 3D, and requires [LightOccluder2D](https://docs.godotengine.org/en/stable/classes/class_lightoccluder2d.html) nodes.
This means that the shader approach won't really work, unfortunately.
