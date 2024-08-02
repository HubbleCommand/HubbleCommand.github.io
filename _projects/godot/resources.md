---
layout      : project
title       : "Godot - Resources"
date        : 2024-07-30
categories  : ["GameDev", "Godot"]
#start-date  : 
---

## General practices
Return early in your functions to avoid needlessly nested code.

Long functions and code duplications should be extracted into other functions.

### Node Overview
<iframe width="420" height="315" src="https://www.youtube.com/embed/tO2gthp45MA" frameborder="0" allowfullscreen></iframe>

### General design
Generally, use composition.
This is even according to the [official documentation](https://docs.godotengine.org/en/3.2/tutorials/misc/state_design_pattern.html)!

<iframe width="420" height="315" src="https://www.youtube.com/embed/RnjTYBhAcfA" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/GWYhtksrmhE" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/hxGOiiR9ZKg" frameborder="0" allowfullscreen></iframe>

Godot specific
<iframe width="420" height="315" src="https://www.youtube.com/embed/ukj5jg8_VU4" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/VX16i7t_v3Y" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/74y6zWZfQKk" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/rCu8vQrdDDI" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/w7eSSpiJv2U" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/JJid46XzW8A" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/p_IvmDm-Ywk" frameborder="0" allowfullscreen></iframe>

## Blurry sprites / textures
Fix blurry Sprites: use Nearest filtering mode (can set in Project -> Render -> Textures or on each node individually).

Depending on the hierarchy of your scene tree (i.e. nested viewports), you may need to set it to instanced nodes in your scene.
Try to do this at the highet level possible.

## Character controller-esque
<iframe width="420" height="315" src="https://www.youtube.com/embed/ZaEzjnoIy3M" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/5FWzWrK6jLM" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/VV4GKY7LKlA" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/bn3ZUCZ0vMo" frameborder="0" allowfullscreen></iframe>


### State Machines

<iframe width="420" height="315" src="https://www.youtube.com/embed/VtJXqRsFezY" frameborder="0" allowfullscreen></iframe>

Design patterns are, in general, the more powerful tools in a SE's toolbelt. This is because they solve common issues in easy and maintainable ways.

In game development, there's a few you should know; State Machines, Decorator, Strategy.
State machines in particular are very useful, and should be your go-to pattern.

[Godot 3.2 documentation on the State Design Pattern](https://docs.godotengine.org/en/3.2/tutorials/misc/state_design_pattern.html)

[GDQuest tutorial on the pattern](https://www.gdquest.com/tutorial/godot/design-patterns/finite-state-machine/)


## Remote Android Debugging
<iframe width="420" height="315" src="https://www.youtube.com/embed/AUWktaoYucQ" frameborder="0" allowfullscreen></iframe>
To turn on Android debugging with logging, go to Debug -> Depploy with Remote Debug


## Theming
Theming is Godot's system for doing UI skinning and standardizing your UI easily.

[Official documentation](https://docs.godotengine.org/en/stable/tutorials/ui/gui_using_theme_editor.html)

[Some themes you can get and tesk](https://itch.io/c/1473270/themes-for-godot-games)


## Scriptable Objects with Resources

[Brackeys](https://www.youtube.com/@Brackeys) recently returned after [quitting](https://www.youtube.com/watch?v=_73UBoDZDLo) to start [making Godot tutorial content](https://www.youtube.com/watch?v=EYt6uDr-PHQ).

[Godot Resources documentation / tutorial](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html)

[Good post on Resources best practices](https://forum.godotengine.org/t/resources-best-practice-and-scalability/43504)

<iframe width="420" height="315" src="https://www.youtube.com/embed/aPXvoWVabPY" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/nzDv4xFIJnI" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/vzRZjM9MTGw" frameborder="0" allowfullscreen></iframe>


## Inventory-like

<iframe width="420" height="315" src="https://www.youtube.com/embed/pVDUdXYa38I" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/X3J0fSodKgs" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/UUzuUzPVNrE" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/V79YabQZC1s" frameborder="0" allowfullscreen></iframe>



Weapon system 
<iframe width="420" height="315" src="https://www.youtube.com/embed/SB0QrnI_-IQ" frameborder="0" allowfullscreen></iframe>

Loadout 
<iframe width="420" height="315" src="https://www.youtube.com/embed/vNBKHbkBT1E" frameborder="0" allowfullscreen></iframe>


## Procedural Animation

<iframe width="420" height="315" src="https://www.youtube.com/embed/qlfh_rv6khY" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/G_seJ2Yg1GA" frameborder="0" allowfullscreen></iframe>

## Pixellation
<iframe width="420" height="315" src="https://www.youtube.com/embed/Mg_V27arKdg" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/vubxL52NlAY" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/77F4ZjmQ07U" frameborder="0" allowfullscreen></iframe>


## Shaders
<iframe width="420" height="315" src="https://www.youtube.com/embed/nyFzPaWAzeQ" frameborder="0" allowfullscreen></iframe>

Sample shader assets:
[GDQUest Shaders](https://github.com/gdquest-demos/godot-shaders)
[2D Sprite Shaders Demo](https://godotengine.org/asset-library/asset/522)
[Post Process](https://godotengine.org/asset-library/asset/2604)
[Ultimate Retro Shader Collection](https://godotengine.org/asset-library/asset/2989)
[Grid Shader Tutorial](https://godotshaders.com/shader/grid-shader-tutorial/)
[Godot Retro](https://github.com/ahopness/GodotRetro)

<blockquote class="reddit-embed-bq" style="height:500px" data-embed-theme="dark" data-embed-height="559"><a href="https://www.reddit.com/r/godot/comments/hmj63q/having_fun_learning_about_shaders/">Having fun learning about shaders!</a><br> by<a href="https://www.reddit.com/user/onsclom/">u/onsclom</a> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

<blockquote class="reddit-embed-bq" style="height:500px" data-embed-theme="dark" data-embed-height="580"><a href="https://www.reddit.com/r/godot/comments/f40cja/i_made_a_rolling_log_vertex_displacement_shader/">I made a rolling log vertex displacement shader in Godot, a-la Animal Crossing! Link to source code in comments.</a><br> by<a href="https://www.reddit.com/user/lynndotpy/">u/lynndotpy</a> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

[Compute shader](https://github.com/godotengine/godot-demo-projects/tree/master/compute)

[Variable rate shading](https://github.com/godotengine/godot-demo-projects/tree/master/3d/variable_rate_shading) (NVIDIA feature that changes the rate shading is calculated in different regions of the scene to increase performance)


<iframe width="420" height="315" src="https://www.youtube.com/embed/fEQUPSV24fI" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/jH0MD8obOCQ" frameborder="0" allowfullscreen></iframe>

Shader stuff for [refraction](https://forum.godotengine.org/t/getting-both-the-frontfacing-and-backfacing-normals-on-the-front-faces/62382)


## Light2D
Light doesn't work the same at all as in 3D.
See the paragraph after [this](https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html#id4) image.

<iframe width="420" height="315" src="https://www.youtube.com/embed/jXCEgW_Mgx8" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/kM71HecDOvM" frameborder="0" allowfullscreen></iframe>
<iframe width="420" height="315" src="https://www.youtube.com/embed/0GToqNid43U" frameborder="0" allowfullscreen></iframe>


## Moddability
Generally a complex subject

Godot resource packs

[ModIO](https://mod.io/) 
[Steam Workshop](https://steamcommunity.com/workshop/)


## Play Services
<iframe width="420" height="315" src="https://www.youtube.com/embed/YaG1O5kDsho" frameborder="0" allowfullscreen></iframe>
[Asset](https://godotengine.org/asset-library/asset/2440)

## Multiplayer

<iframe width="420" height="315" src="https://www.youtube.com/embed/_ItA2r69c" frameborder="0" allowfullscreen></iframe>

W4 is a company that aims to improve the Godot ecosystem. 
Their two first major projects were integrating Console support, and [multiplayer](https://sdk.w4.gd/).

