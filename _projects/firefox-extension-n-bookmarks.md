---
layout: project
title: "Firefox Extension and Bookmarks Analyser / Scrapper"
categories: ["WebDev"]
programming-languages: ["JS", "NodeJS"]
start-date : 2020-09-12
order: 1
end-date : NA
published: false
---

> This project was abandoned as it honestly was meh. This was started during a period where I cared about the news, but that time has come and gone. The more I read and the more I saw, the worse it was. While I used to check the news daily from a bunch of different sources, countries, continents, but it didn't matter. I remain as informed as I want to be through better channels.

After years of not having sorted my Firefox bookmarks, I decided to organise them once I finished my Bachelor's.

However, there were a lot of bookmarks that I found were interesting, but that I didn't necessarily want to keep in Firefox. In particular, I had a lot of bookmarks from news sites like BBC, RT, and the Guardian that I liked, but couldn't really use as there were thousands of them (!). So, I wanted a better way to be able to search through them.

I had already started [my own firefox extension](https://github.com/HubbleCommand/browser-extension), so I quickly made a module that would export a single bookmakrs folder to a downloadable folder.

I then created a second repo for a new project that [would be able to web scrap those bookmarks](https://github.com/HubbleCommand/node-bookmarks-analyser). This project is a node CLI application than can currently:
- Merge many bookmarks files
- Web scrap all the URLs in a bookmarks file, and output

It is a generalized web scrapper with a high level of configurability.

The plan is that this tool will be able to post the scrapped web content to an ElasticSearch node, to allow for more advanced searching in a seperate application.


Raspberry Pi
I had tried almost two years ago to get a new version of Elasticsearch working on my Raspberry Pi, but I simply couldn't get a newer version running with Raspbian OS. I realized that it really was a problem of architecture (Raspbian being arm32 vs ES requiring arm64).

More recently I tried to figure out a simple workaround. I looked into emulating a 64 bit environment, but that would entail a heap load of potential problems. I also saw the 64 bit version of Gentoo, which was intriguing, but apparently has issues (due to the fact that it is an unnoficial 64 bit fork of a 32 bit OS). 

In the end I installed a 64 bit server version of Ubuntu, and added a desktop to it. After that, I simply followed the official Elasticsearch installation guide for installing with APT, and it was all working! Honestly I was quite pleasently surprised, I was sure some problems were going to pop up.
