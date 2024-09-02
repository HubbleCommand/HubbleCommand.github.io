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

### Funny issue with rads
Radians are usually the go-to when dealing with angles.

However, in my case, I had to use degrees. Not out of preference, but out of necessity. When using radians, there would be flickers between frames close to the angular "borders".

My guess is that due to the successive divisions with floats, that precision loss was the issue with the small fractional values that are intrinsic with radians.
Degrees, on the other hand, have a much greater range at two degrees of magnitude larger.

### Going back to 2D
Ironically, getting directional sprites in 2D is much more painful.

The shader itself wasn't too bad. However, I realized I had a problem once I looked into 2D lighting.

2D lighting doesn't work the same at all as in 3D. In 3D space, you can change the `ALPHA` in `fragment()`, which changes how shadows are cast / light is blocked.

2D, however, requires [LightOccluder2D](https://docs.godotengine.org/en/stable/classes/class_lightoccluder2d.html) nodes to cast shadows.

I first look into using a mix of `fragment()`'s `SHADOW_VERTEX` or `light()`'s `SHADOW_MODULATE`, although I believe the former only works on the shadow of the pixel, not on shadows cast.
Looking at [this discussion](https://github.com/godotengine/godot-proposals/discussions/8298), it would appear that I am correct on the behavior of `SHADOW_VERTEX`.
`SHADOW_MODULATE`'s description reads as follows:
> Multiply shadows cast at this point by this color.
However, this works like other modulation: it only changes the color. There doesn't seem to be a way to change the shadows cast through the shader in this manner.

The logical next step would be to apply a shader to the LightOccluder2D node. However, this wont't work either.
`LightOccluder2D` doesn't direcectly cast a shadow, it's `OccluderPolygon2D` does.
In practice, a shader applied to a LightOccluder will only change the editor / debug representation of the `LightOccluder2D`, but not the OccluderPolygon which casts the shadow.

Looking into the code, the issue seems to be that the  of the  is simply registered in the renderer.
Looking at the source code, 
```
void OccluderPolygon2D::set_polygon(const Vector<Vector2> &p_polygon) {
	polygon = p_polygon;
	rect_cache_dirty = true;
	RS::get_singleton()->canvas_occluder_polygon_set_shape(occ_polygon, p_polygon, closed);
	emit_changed();
}
```
Looking furthur down, `renderer_canvas_cull.cpp`'s `canvas_occluder_polygon_set_shape` and `renderer_canvas_cull.cpp`'s `occluder_polygon_set_shape` confirm my hypothesis.

Even when looking at 2D SDF, there was no apparent hope, although the following on SDF are neat:
- [Implement Signed Distance Fields for 2D shaders](https://github.com/godotengine/godot/pull/43886)
- [Ray Marching and Signed Distance Functions](https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/)
- [Signed Distance Fields for 2D](https://godotengine.org/article/godots-2d-engine-gets-several-improvements-upcoming-40/)
- [Dynamic 2D Lights and Soft Shadows](https://godotshaders.com/shader/dynamic-2d-lights-and-soft-shadows/)

I tried using 2D Meshes, as you can apply a shader to it that will affect it's geometry.
A `MeshInstance2D` with a `QuadMesh` will have it's mesh's height reduced to an eight with the following shader: 

```
shader_type canvas_item;

void vertex() {
	VERTEX.y /= 8.0;
}
```

However, `MeshInstance2D`s don't cast shadows, the only things that do cast shadows are `LightOccluder2D`.

This means that the shader approach won't really work, unfortunately.

The last ditch effort would be to rotate the `LightOccluder2D` in a script, however the question becomes where to rotate it to.
Always keep it vertical? Well, the Sprite won't always be vertical in world space, but in canvas space.
And the only way to do that in a script is to keep a reference to the currently active camera, which has the issues described above.
```
	get_viewport().get_camera_2d()
```

The only other options would be to make a new 2D lighting system... or make major changes to the existing one.

[Custom lighting system in Godot](https://www.youtube.com/watch?v=kM71HecDOvM)

It would appear that this is just not worth it, or to just do the script approach.
The other thing is that the systems in 2D are usually very different than in 3D.
Cameras are, in general, fixed to a certain direction, meaning that the major problem stated above with the Script approach doesn't apply here.

#### "Workaround" for 2D shadows
Calling this a workaround seems disingenuous, as it really isn't that much of a fix.

Just use an appropriately-shaped `LightOccluder2D` that provides an appropriate shadow cast for all angles of the sprite.

Now, this only works for sprites with little topographical varience. This will work for say, a human, but less likely for a long bus.
