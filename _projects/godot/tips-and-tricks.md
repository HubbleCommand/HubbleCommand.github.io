---
layout      : project
title       : "Godot - Tips & Tricks"
date        : 2024-07-30
categories  : ["GameDev", "Godot"]
icons: ["godot", "c++"]
---



This is an assortment of tips and tricks that I've collected...



## Handling multiple resolutions
An easy way to do this is to not actually support multiple resolutions.

go into Project Settings, and under Display/Window, set Stretch Mode to Canvas Items or Viewport.

The full documentation can be read [here](https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html)


## Physics
### [Physics Layers and Masks](https://docs.godotengine.org/en/4.3/tutorials/physics/physics_introduction.html#collision-layers-and-masks)
This is an incredibly powerful system.

To summarize:
- Layer: where the entity exists
- Mask: where the entity scans

### Detect overlap without colliding
[Check this post](https://forum.godotengine.org/t/how-to-not-collide-physically-but-still-detect-collision/15648/2)

You can't just use raw physics bodies : no amount of masking and layering fenagling will work.
If RigidBodies or CharacterBodies are on the same mask / layer, they will collide.
You will need an Area node to detect overlap.

### 2D floating physics for CharacterBody
May not be the most obvious thing, but 2D physics actually has two modes: top-down / orthographic and side

If you have a on-side game, you should use grounded Motion Mode on your

If you have a top-down game, you should use floating
If you don't do this, your CharacterBodies may get stuck on each other


## Patterns
### Movement effect zones for CharacterBody

According to the documentation for CharacterBody2D: ["They are not affected by physics at all, but they affect other physics bodies in their path"](https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html)

This may entice people to use RigidBodies, which are much harder to deal with.

However, I'm generally not a fan of RigidBodies: full physics and a lot more work.

A very easy solution is to still use Area2D

```
func _on_area_2d_area_entered(area: Area2D) -> void:
	if area.linear_damp:
		speed *= 1 - (area.linear_damp / 100)

func _on_area_2d_area_exited(area: Area2D) -> void:
	if area.linear_damp:
		speed = speed / (1 - (area.linear_damp / 100))
```


## Modifiers

