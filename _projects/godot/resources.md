---
layout      : project
title       : "Godot - Resources"
date        : 2024-07-30
categories  : ["GameDev", "Godot"]
#start-date  : 
---

![](/assets/godot/transient_parent.webp)

## General practices
Return early in your functions to avoid needlessly nested code.

Long functions and code duplications should be extracted into other functions.

### Node Overview
<iframe width="420" height="315" src="https://www.youtube.com/embed/tO2gthp45MA" frameborder="0" allowfullscreen></iframe>

### General design
Generally, use composition.
This is even according to the [official documentation](https://docs.godotengine.org/en/3.2/tutorials/misc/state_design_pattern.html)!

{% assign general_design_ids="RnjTYBhAcfA,GWYhtksrmhE,hxGOiiR9ZKg,HNzP1aLAffM,h1o5UzKfZcQ,mAfpfUYhpAs" | split: "," %}
{% include /components/video-group.html id="general_design" ids=general_design_ids %}

Godot specific
{% assign godot_specific_ids="ukj5jg8_VU4,VX16i7t_v3Y,74y6zWZfQKk,rCu8vQrdDDI,w7eSSpiJv2U,JJid46XzW8A,p_IvmDm-Ywk,4az0VX9ApcA" | split: "," %}
{% include /components/video-group.html id="gd" ids=godot_specific_ids %}

## Blurry sprites / textures
Fix blurry Sprites: use Nearest filtering mode (can set in Project -> Render -> Textures or on each node individually).

Depending on the hierarchy of your scene tree (i.e. nested viewports), you may need to set it to instanced nodes in your scene.
Try to do this at the highet level possible.

## Character controller-esque

{% assign character_controller_ids="ZaEzjnoIy3M,5FWzWrK6jLM,VV4GKY7LKlA,bn3ZUCZ0vMo" | split: "," %}
{% include /components/video-group.html id="charcontr" ids=character_controller_ids %}

### State Machines

{% assign state_machine_ids="VtJXqRsFezY,vZHzMO90IwQ" | split: "," %}
{% include /components/video-group.html id="state_machine" ids=state_machine_ids %}

Design patterns are, in general, the more powerful tools in a SE's toolbelt. This is because they solve common issues in easy and maintainable ways.

In game development, there's a few you should know; State Machines, Decorator, Strategy.
State machines in particular are very useful, and should be your go-to pattern.

[Godot 3.2 documentation on the State Design Pattern](https://docs.godotengine.org/en/3.2/tutorials/misc/state_design_pattern.html)

[GDQuest tutorial on the pattern](https://www.gdquest.com/tutorial/godot/design-patterns/finite-state-machine/)


## Remote Android Debugging
To turn on Android debugging with logging, go to Debug -> Depploy with Remote Debug. See [this video](https://www.youtube.com/watch?v=AUWktaoYucQ) for more.


## Theming
Theming is Godot's system for doing UI skinning and standardizing your UI easily.

[Official documentation](https://docs.godotengine.org/en/stable/tutorials/ui/gui_using_theme_editor.html)

[Some themes you can get and tesk](https://itch.io/c/1473270/themes-for-godot-games)


## Scriptable Objects with Resources

[Brackeys](https://www.youtube.com/@Brackeys) recently returned after [quitting](https://www.youtube.com/watch?v=_73UBoDZDLo) to start [making Godot tutorial content](https://www.youtube.com/watch?v=EYt6uDr-PHQ).

[Godot Resources documentation / tutorial](https://docs.godotengine.org/en/stable/tutorials/scripting/resources.html)

[Good post on Resources best practices](https://forum.godotengine.org/t/resources-best-practice-and-scalability/43504)

Ironically, the first tip in [this video](https://www.youtube.com/watch?v=5R0ajAElEgk) is somewhat bad practice, and could be fixed with resources.

{% assign scriptobj_ids="aPXvoWVabPY,nzDv4xFIJnI,vzRZjM9MTGw" | split: "," %}
{% include /components/video-group.html id="scriptobjs" ids=scriptobj_ids %}


## Inventory-like

{% assign inventory_ids="SB0QrnI_-IQ,vNBKHbkBT1E,pVDUdXYa38I,X3J0fSodKgs,UUzuUzPVNrE,V79YabQZC1s" | split: "," %}
{% include /components/video-group.html id="inventory" ids=inventory_ids %}


## Procedural Animation

{% assign procanim_ids="KPoeNZZ6H4s,qlfh_rv6khY,G_seJ2Yg1GA" | split: "," %}
{% include /components/video-group.html id="procanim" ids=procanim_ids %}


## Pixellation

{% assign pixellation_ids="Mg_V27arKdg,vubxL52NlAY,77F4ZjmQ07U" | split: "," %}
{% include /components/video-group.html id="pixellation_shader" ids=pixellation_ids %}


## Metadata
Many engines have a system of metadata.

However, it does appear a bit more powerful in Godot, as you can see [here](https://www.youtube.com/watch?v=RnDap7hx8M4). Do note that this feels very much like a Godot-specific thing, and even then I don't recommend using it this way. Using things like Groups is still, generally, better, especially when trying to query.


## Shaders
Before working with shaders, you need to know more about matrices, or how the GPU actually draws to your screen.

[The Transformation Matrix for 2D Games](https://www.alanzucconi.com/2016/02/10/tranfsormation-matrix/)

{% assign shader_intro_ids="wiYTxjJjfxs,MQdm0Z_gNcw,o-xwmTODTUI,EqNcqBdrNyI,7qUuzRY5YwI,L97Y12TV7Ro,nyFzPaWAzeQ,BZp8DwPdj4s,1pJyYtBAHks,fEQUPSV24fI,jH0MD8obOCQ" | split: "," %}
{% include /components/video-group.html id="shader_intro" ids=shader_intro_ids %}

Sample shader assets:
[GDQUest Shaders](https://github.com/gdquest-demos/godot-shaders)
[2D Sprite Shaders Demo](https://godotengine.org/asset-library/asset/522)
[Post Process](https://godotengine.org/asset-library/asset/2604)
[Ultimate Retro Shader Collection](https://godotengine.org/asset-library/asset/2989)
[Grid Shader Tutorial](https://godotshaders.com/shader/grid-shader-tutorial/)
[Godot Retro](https://github.com/ahopness/GodotRetro)
[CD ROM shader](https://www.alanzucconi.com/2017/07/15/cd-rom-shader-2/)

<blockquote class="reddit-embed-bq" style="height:500px" data-embed-theme="dark" data-embed-height="559"><a href="https://www.reddit.com/r/godot/comments/hmj63q/having_fun_learning_about_shaders/">Having fun learning about shaders!</a><br> by<a href="https://www.reddit.com/user/onsclom/">u/onsclom</a> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

<blockquote class="reddit-embed-bq" style="height:500px" data-embed-theme="dark" data-embed-height="580"><a href="https://www.reddit.com/r/godot/comments/f40cja/i_made_a_rolling_log_vertex_displacement_shader/">I made a rolling log vertex displacement shader in Godot, a-la Animal Crossing! Link to source code in comments.</a><br> by<a href="https://www.reddit.com/user/lynndotpy/">u/lynndotpy</a> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

[Compute shader](https://github.com/godotengine/godot-demo-projects/tree/master/compute)

[Variable rate shading](https://github.com/godotengine/godot-demo-projects/tree/master/3d/variable_rate_shading) (NVIDIA feature that changes the rate shading is calculated in different regions of the scene to increase performance)

Shader stuff for [refraction](https://forum.godotengine.org/t/getting-both-the-frontfacing-and-backfacing-normals-on-the-front-faces/62382)

[Motion Extraction](https://www.youtube.com/watch?v=NSS6yAMZF78&ab_channel=Posy)


## Light2D
Light doesn't work the same at all as in 3D.
See the paragraph after [this](https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html#id4) image.

A quick video overview can be found [here](https://www.youtube.com/watch?v=jXCEgW_Mgx8).

A custom lighting solution ca be found [here](https://www.youtube.com/watch?v=kM71HecDOvM), although it appears similar to the way the built-in system works.


## Moddability
Generally a complex subject

Godot resource packs

[ModIO](https://mod.io/) 
[Steam Workshop](https://steamcommunity.com/workshop/)

However, something I recently found is that GDScript can be evaluated dynamically!!!
Check [this issue](https://github.com/godotengine/godot/issues/22814).


## Play Services
Video overview [here](https://www.youtube.com/watch?v=YaG1O5kDsho).
[Asset](https://godotengine.org/asset-library/asset/2440)

## Multiplayer
A good overview can be found [here](https://www.youtube.com/watch?v=_ItA2r69c)

W4 is a company that aims to improve the Godot ecosystem. 
Their two first major projects were integrating Console support, and [multiplayer](https://sdk.w4.gd/).


## Hot update
https://www.reddit.com/r/godot/comments/1fhcsw3/tutorial_how_to_implement_a_hot_update_mechanism/
