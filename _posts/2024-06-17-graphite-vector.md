---
layout: post
title: "Graphite.rs - Vector Graphics Editor"
date: 2024-06-17
last_modified_at: 2024-06-29
---

> While this is probably the cleanest free vector graphics tool out there, export issues are very bad, making it next to unusable

> The biggest issue is the custom node workflow. In reality, it isn't working with direct paths, which is something Inkscape can do (working directly with `.svg` files), meaning you will always have the same consistent result.

While working on some custom Godot nodes, I needed to make custom icons. The [documentation](https://docs.godotengine.org/en/stable/contributing/development/editor/creating_icons.html) mentions using [Inkscape](https://inkscape.org/), (which is thankfully available though [scoop extras](https://bjansen.github.io/scoop-apps/extras/inkscape/)), but I'm honestly not a fan of it. I'm not a fan of any of them really.

I went to look for an online tool so that I wouldn't have to install yet another app. Most are garbage and have tons of ads and popups, but I have stumbled upon the holy grail: [Graphite.rs](https://graphite.rs/).

Probably the easiest to use tool I've found. It also has a very interesting Node Graph tool, reminiscent of Blender's, that lets you do some impressive things like boolean operations. Great open-source project!

<iframe width="420" height="315" src="https://www.youtube.com/embed/7gjUhl_3X10" frameborder="0" allowfullscreen></iframe>
