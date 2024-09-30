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

Godot's damping functionalities are a little strange.
The documentation isn't clear, and you mostly have to go about it with trial and error to find appropriate damping values.
Some people do have [other implementations](https://www.reddit.com/r/godot/comments/rtss7u/a_function_for_calculating_rigidbody2d_damping/), and there are [discussions on the topic](https://github.com/godotengine/godot-proposals/discussions/9315), but unless you have some major constraint, it's better to work with what you've got.

According to the documentation for CharacterBody2D: ["They are not affected by physics at all, but they affect other physics bodies in their path"](https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html).
This may entice people to use RigidBodies, which are much harder to deal with.
However, I'm generally not a fan of RigidBodies: full physics where you generally do not need it and a lot more work.

A very easy solution is to still use Area2Ds : make sure to check the [docs](https://docs.godotengine.org/en/stable/classes/class_area2d.html) and the [tutorial](https://docs.godotengine.org/en/stable/tutorials/physics/using_area_2d.html).

Usually, when working with `CharacterBody2D`s, you will have an attached script with a defined speed variable that the character moves at.
For example, take the code below:

```
extends CharacterBody2D

@export var speed = 300.0

func _physics_process(delta: float) -> void:
	var input_direction = Input.get_vector("left", "right", "up", "down")
	velocity = input_direction * speed

	move_and_slide()
```

This is very simple: modify the `velocity` property of the `CharacterBody2D`, which is used by the `move_and_slide()` function to move the character.

However, we're not going to rely solely on CharacterBody2D here.
As described above in [Detect overlap without colliding](#Detect overlap without colliding), we will need an `Area2D` node attached to our character to detect other Area2Ds.
This is because `CharacterBody2D` does not have the same signals available as something like `RigidBody2D`, notably `body_shape_entered` and `body_shape_exited`.

Attach an `Area2D` node with the desired `CollisionShape2D`. You should have the following structure:

	CharacterBody2D
	├── CollisionShape2D
	└── Area2D
		└── CollisionShape2D



Then, connect the `area_entered` and `area_exited` signals of the `Area2D` node to your `CharacterBody2D` script, and add the following code:

```
func _on_area_2d_area_entered(area: Area2D) -> void:
	if area.linear_damp:
		speed *= 1 - (area.linear_damp / 100)

func _on_area_2d_area_exited(area: Area2D) -> void:
	if area.linear_damp:
		speed = speed / (1 - (area.linear_damp / 100))
```

Now, whenever your character enters an `Area2D` with a `linear_damp` space override, your character will slow down (and return to it's normal speed when it exits).

You can do something almost identical for angular damp and gravity overrides

#### Limitations
This doesn't take into consideration the Space Override type, and behaves like Combine.
However, it would be easy to have a map, where the Key is the RID of the Area2Ds that are currently in, to then 

I will not be going that far though, as my use case doesn't have such requirements.

There will most likely lead to floating-point errors in the long run.
The previous suggestion to use a Map of effects could be combined with a base speed variable.
Then, whenever an area is added or removed, the base speed would have all the multipliers applied.


## Modifiers

