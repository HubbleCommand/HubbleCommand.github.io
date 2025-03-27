---
layout: default
title: Blog
---

<h1>{{ page.title }}</h1>
<ul class="posts">

{% assign years = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in years %}

<p style="border-bottom: 1px dashed #b5e853;">{{ year.name }}</p> 

<ul>
    {% for post in year.items %}
        <li><span>{{ post.date | date: "%b %d" }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>

{% endfor %} 
</ul>
