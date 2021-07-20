---
layout: project
title: "Think Story Maintenance"
categories: ["WebDev", "Concrete5"]
programming-languages: ["PHP"]
start-date : 2019-11-04
end-date : TBA
---

Following the University Internship on the Think Story project, I was offered a maintenance contract to maintain the code base & manage the support.

Very useful resources:
- https://legacy-documentation.concrete5.org/tutorials/creating-and-working-with-db-xml-files

Future modernization - static sites
The main limit of static sites is efficiency with large numbers of pages. While a static site may be better in some instances, the problem is that even the first instance of ThinkStory, ThinkData, currently has almost 400 pages, and is multilingual. There are few static CMSs that remain efficient (especially for interactive pages with pages filters), allow for high customizability like Concrete 5 (in particular attributes, like a the Timbre, and dashboard pages), and have easy multilingual support.

As good as Concrete5 was, it still has many problems and bugs that have gone unfixed for years (a perfect example is switching the base language of an installation, which can corrupt the entire site). Ironically, Jekyll looks like a good solution: none of the Thinks depend on dynamic content, and is almost like an advanced blog. 

For the modernization project, I think looking into using Jekyll as a solution would be one of the best starts.

Some interesting links...

Matomo tracking
- https://github.com/hendrikschneider/jekyll-analytics

Multilingual:
- https://www.sylvaindurand.org/making-jekyll-multilingual/
- https://www.storyblok.com/docs/guide/in-depth/internationalization

Jekyll CMSs:
- https://forestry.io/ (for local depl: https://forestry.io/docs/guides/developing-with-hugo/local-development/)
- https://cloudcannon.com/
- https://www.storyblok.com/tp/headless-cms-jekyll
- https://www.siteleaf.com/
- https://github.com/jekyll/jekyll-admin (simplest)
- https://www.netlifycms.org/docs/jekyll/


More encountered errors:

`Call to a member function getNodeByDisplayPath() on null` : solved by putting the topic trees into the same content file as the rest

`simplexml_load_file(): /var/www/html/AThinkTest/public/packages/think_story//install/content.xml:7: parser error : StartTag: invalid element name`: Forgot DOCTYPE XML tags around the ENTITY

`An exception occurred while executing 'INSERT INTO btTSPageSlider (bID, pageListTitle, num, orderBy, cParentID, speed, viewCountAttribute) VALUES (?, ?, ?, ?, ?, ?, ?)' with params [31, "\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t5\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\tdisplay_most_recent\n\t\t\t\t\t\t\t\t", 1, "\n\t\t\t\t\t\t\t\t\t5\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\tts_pattr_number_views\n\t\t\t\t\t\t\t\t"]: SQLSTATE[HY000]: General error: 1366 Incorrect integer value: ' 5 ' for column 'num' at row 1`: beutify was too much: cannot bring to new line the `<CDATA things>`


`An exception occurred while executing 'INSERT INTO btTSPageSlider (bID, pageListTitle, num, orderBy, cParentID, speed, viewCountAttribute) VALUES (?, ?, ?, ?, ?, ?, ?)' with params [31, "\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\t5\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\tdisplay_most_recent\n\t\t\t\t\t\t\t\t", 1, "\n\t\t\t\t\t\t\t\t\t5\n\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t\tts_pattr_number_views\n\t\t\t\t\t\t\t\t"]: SQLSTATE[HY000]: General error: 1366 Incorrect integer value: ' 5 ' for column 'num' at row 1`: cannot use `<\data-column>`, can just remove them