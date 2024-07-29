---
layout: post
title: "Jekyll Collection Sub Pages"
date: 2024-07-29
---

I was recently faced with an issue: one of my project pages was getting too long. I wanted some way to split this into multiple files, without creating a bunch of different projects for each section.

After a bit of fenagling, I have a working solution, using "sub-collections", although it feels uninspired.

I create a sub-directory / sub collection in the `projects` collection for the project page:

```
└_projects
	├─ project-dir
	│	└─ project-sub-page.md
	└─ project-main-page.md
```

Then I link to those pages where I want with

```
{% raw %}
<a href="{{ site.url }}{{ site.baseurl }}{% link _projects/project-folder/project-sub-page.md %}">Project Sub Page</a>
{% endraw %}
```

Finally, in my project list, I filter out any pages from sub-directories:

```
{% raw %}
{% assign projects = site.projects | sort: "date", "last" %}
{% for project in projects %}
	{% capture file_path %}{{ project.path }}{% endcapture %}
	{% assign path_parts = file_path | split: '/' %}
	{% if path_parts.size != 2 %}
		{% continue %}
	{% endif %}
{% endfor %}
{% endraw %}
```

[commit](https://github.com/HubbleCommand/HubbleCommand.github.io/commit/e393d77da5c69ad4bc1fafa4efacb9b9e9bdfede)

It's basic, but hey, it works.
