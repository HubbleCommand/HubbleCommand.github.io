---
layout      : project
title       : "Godot - Overview"
date        : 2021-04-08
categories  : ["GameDev", "Godot"]
programming-languages: ["C++", "GDScript"]
icons       : ["godot", "cplusplus"]
start-date  : 2024-01-13
last_modified_at  : 2024-07-30
active: true
---

Godot, at this point, is a very popular [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) game engine.

<blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="220"><a href="https://www.reddit.com/r/godot/comments/1e9iyof/comment/leevgp2/">Comment</a><br> by<a href="https://www.reddit.com/user/Salt-Trash-269/">u/Salt-Trash-269</a> from discussion<a href="https://www.reddit.com/r/godot/comments/1e9iyof/whats_the_most_outrageous_bit_of_code_you_wrote/"></a><br> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>


### Child Pages
<a href="{{ site.url }}{{ site.baseurl }}{% link _projects/godot/resources.md %}">Godot Resources (useful for learning)</a>

<a href="{{ site.url }}{{ site.baseurl }}{% link _projects/godot/mobile-controls.md %}">Mobile Controls</a>

<a href="{{ site.url }}{{ site.baseurl }}{% link _projects/godot/directional-sprites.md %}">Directional Sprites</a>

<a href="{{ site.url }}{{ site.baseurl }}{% link _projects/godot/geometry-ops.md %}">Geometry Operations</a>

<a href="{{ site.url }}{{ site.baseurl }}{% link _projects/godot/image-rotation.md %}">Image Rotation</a>


## Engine Contributions
Building the engine is easiest done with scoop, see the first note [here](https://docs.godotengine.org/en/stable/contributing/development/compiling/compiling_for_windows.html)

Important Godot pages
[Contributing Code](https://docs.godotengine.org/en/stable/contributing/ways_to_contribute.html#contributing-code)
[Best practices](https://docs.godotengine.org/en/stable/contributing/development/best_practices_for_engine_contributors.html)
[Engine Development](https://docs.godotengine.org/en/stable/contributing/development/index.html#buildsystem-and-work-environment)
[PR Workflow](https://docs.godotengine.org/en/stable/contributing/workflow/pr_workflow.html)


## Before starting a project
There are two very important quotes
<blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="220"><a href="https://www.reddit.com/r/godot/comments/1dtimyh/comment/lb9jwyt/">Comment</a><br> by<a href="https://www.reddit.com/user/ContentAspect6148/">u/ContentAspect6148</a> from discussion<a href="https://www.reddit.com/r/godot/comments/1dtimyh/how_to_make_a_project_without_shooting_myself/"></a><br> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

<blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="220"><a href="https://www.reddit.com/r/godot/comments/adwd9h/comment/edkust0/">Comment</a><br> by<a href="https://www.reddit.com/user/Caldankis/">u/Caldankis</a> from discussion<a href="https://www.reddit.com/r/godot/comments/adwd9h/should_i_give_up_months_of_work_with_nothing_to/"></a><br> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

Before emarking on any large project, I recommend watching the following videos.
It's very important to understand the scale of a project as well as your own skills, and time you can commit, to avoid burning yourself out.

{% assign overview_ids="Xh45MdVpR-M,v7500ewcCIo,Edv-xI_29AE" | split: "," %}
{% include /components/video-group.html id="overview" ids=overview_ids %}

## Starting
To my recent surprise, when I tried to fork Godot, I discovered that I already had a fork. I must have forked it years ago to contribute, I'm pretty sure to add some image rotation improvements, but life got in the way.

> Life has, expectedly, gotten in the way again, and this is only being worked on a little bit months later...

Certainly surprising to find that I was behind by 14'000+ commits!
![image tooltip here](/assets/godot/screenshot-2024-01-02.png)


## Fixing Common Issues
### External editor
It's possible to setup an [external editor](https://docs.godotengine.org/en/stable/tutorials/editor/external_editor.html) for code.

This allows setting the Godot editor to run in only one window, [which makes it faster](https://www.youtube.com/watch?v=QSpZhG-OOgI&ab_channel=Gamefromscratch).

### "Corrupted" global class cache
Had the following error while developing a plugin:
```
 Attempt to open script 'res://components/screen_gesture_decorators/screen_gesture_decorator.gd' resulted in error 'File not found'.
  Failed loading resource: res://components/screen_gesture_decorators/screen_gesture_decorator.gd. Make sure resources have been imported by opening the project in the editor at least once.
  editor/create_dialog.cpp:237 - Condition "scr.is_null()" is true.
```

I eventually stumbled upon [this issue](https://github.com/godotengine/godot/issues/81867), and the fix is to go to the project directory, then to `.godot/global_script_class_cache.cfg`

```
list=Array[Dictionary]([{
"base": &"Control",
"class": &"ScreenGestureDecorator",
"icon": "",
"language": &"GDScript",
"path": "res://components/screen_gesture_decorators/screen_gesture_decorator.gd"
}])
```

Then remove the problematic entries.


## Unit Testing
It's generally not worth it. The following comment sums it up:

<blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="428"><a href="https://www.reddit.com/r/godot/comments/1e31wpu/comment/ld50wta/">Comment</a><br> by<a href="https://www.reddit.com/user/ObscurelyMe/">u/ObscurelyMe</a> from discussion<a href="https://www.reddit.com/r/godot/comments/1e31wpu/godot_devs_tell_me_about_your_unit_tests/"></a><br> in<a href="https://www.reddit.com/r/godot/">godot</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

The same goes for software in general. If test cases are hard to define or difficult to run tests for, i.e. if the result is something highly visual, dependant on many factors (i.e. game state), and/or _subjective_, then it most likely doesn't make sense to unit test it.


## Assets
[1](https://godotengine.org/asset-library/asset/1282)
[2](https://godotengine.org/asset-library/asset/2558)

### Making plugins
See [this page](https://docs.godotengine.org/en/stable/tutorials/plugins/editor/making_plugins.html) for making assets / plugins.

The best place to start making custom nodes is with the [corresponding documentation](https://docs.godotengine.org/en/stable/tutorials/plugins/editor/making_plugins.html#a-custom-node)

Good reads for understanding how Godot's class system works:
- [What are Godot classes](https://docs.godotengine.org/en/3.1/getting_started/workflow/best_practices/what_are_godot_classes.html)
- [Registering named classes](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#doc-gdscript-basics-class-name)

### Problems
My main gripe with the [Godot Asset Library](https://docs.godotengine.org/en/stable/community/asset_library/using_assetlib.html) and the whole package system is that while addons usually exist in the `addon` directory, they are actually dropped into the root of the project. This has resulted in files being overwritten in my own project.

There have been [discussions](https://github.com/godotengine/godot-proposals/issues/554) about this in [godot proposals](https://github.com/godotengine/godot-proposals).

That discussion is marked as fixed by [this pr](https://github.com/godotengine/godot/pull/81620), so I'll need to see what's changed.


## [C++](https://docs.godotengine.org/en/stable/tutorials/scripting/gdextension/what_is_gdextension.html)
### GDExtension
> [documentation](https://docs.godotengine.org/en/stable/tutorials/scripting/gdextension/gdextension_cpp_example.html).

If you want to add custom nodes with a C++ implementation, then GDExtension is the way to go.
Note that there are limits, notably in terms of APIs.
This is effectively

If you need to do something else, read below

### Adding to the Engine
You can add to the Godot engine itself by either adding or modifying the core itself, or by adding a new module.

#### Modules
If your code isn't a node, and doesn't modify the core, then you should use a [custom module](https://docs.godotengine.org/en/stable/contributing/development/core_and_modules/custom_modules_in_cpp.html)

It's an interesting way to [add binding to external libraries](https://docs.godotengine.org/en/stable/contributing/development/core_and_modules/binding_to_external_libraries.html)
