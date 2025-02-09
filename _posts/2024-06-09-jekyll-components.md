---
layout: post
title: "Jekyll Components"
date: 2024-06-09
last_modified_at: 2024-11-18
---

> 2024-11-18: added section on Video Group component

In my recent post about [Badges and Icons]({% post_url 2024-06-07-badges-icons %}), I ended up needing to add a lot of icons from [Devicon](https://devicon.dev/), but I was tired of having to copy-paste so many `<i>` elements. It made the source of my pages more difficult to write in, and bloated them with a lot of duplicate `<i>` with only a few characters of difference for changing parts of the icon ID.

I wanted a reusable component in Jekyll, so I started to look around. I found this [Jekyll Components](https://github.com/helpscout/jekyll-components) library (now deprecated for [Spark](https://github.com/helpscout/jekyll-spark)), but it seemed strange that there would be no built-in way to do this, and I didn't want a library for something this basic.

I was correct in my hunch that something this fundamental should exist, I was just looking in the wrong place. You can get the same behavior using [Jekyll Includes](https://jekyllrb.com/docs/includes/).

It was as simple as adding a new file to `_includes`. I added it to `_include/components` to keep my componenets separate from the other `includes` like my `head` includes.


I created the [`_includes/components/devicon`](https://github.com/HubbleCommand/HubbleCommand.github.io/blob/master/_includes/components/devicon.html) file as follows:
```
{% raw %}
{% assign size = 1 %}
{% if include.size %}
{% assign size = include.size %}
{% endif %}
{% for icon in include.icons %}
{% if icon contains '-' %}
<i style="font-size:{{size}}em" class="devicon-{{icon}}"></i>
{% else %}
<i style="font-size:{{size}}em" class="devicon-{{icon}}-plain"></i>
{% endif %}
{% endfor %}
{% endraw %}
```

You can use the component and [pass parameters to includes](https://jekyllrb.com/docs/includes/) by

```
{% raw %}
{% assign preftil_icons="android,kotlin,java" | split: "," %}
{% include /components/devicon.html icons=preftil_icons %}
{% endraw %}
```

Passed parameters can be accessed in the 'component' like so
```
{% raw %}
{% include.icons %}
{% endraw %}
```

See the file [here]([`_includes/components/devicon`](https://github.com/HubbleCommand/HubbleCommand.github.io/blob/master/_includes/components/devicon.html)) with usage [here](https://github.com/HubbleCommand/HubbleCommand.github.io/blob/master/index.md?plain=1#L25).


## Video group component

There is a problem that quite a few of the pages in this site have: too many embeded videos.
Past 5, there is noticible lag for the full page to load.
In many cases, there is no need to have so many embeds, as they are all covering the same topic.

To address this, I created a small [`video-group`](https://github.com/HubbleCommand/HubbleCommand.github.io/blob/master/_includes/components/video-group.html) component.

It basically allows creating mini playlist groups.
A list of the thumbnails is created with a single `<iframe>`.
Whenever one of the thumbnails is clicked, it changes the `src` of the `<iframe>`.

This has improved the loading of quite a few pages significantly.
