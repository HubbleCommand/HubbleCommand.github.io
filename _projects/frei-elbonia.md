---
layout      : project
title       : "Frei Elbonia"
date        : 2025-04-28
---

This is a series of websites on, well, if you know, you know.
My lt made a comment about a site like this, so I made it when I had a little time.

The first site is [Frei Elbonia](https://github.com/HubbleCommand/frei-elbonia).

## Passport PDF

### Images

Images just... don't work with `jspdf`?

Need to convert with [compresspng](https://compresspng.com/),
then convert to `base64` with [this](https://www.base64-image.de/).

The image data can then be put into `images.js` and directly referenced.

### HTML

An interesting way I found, but didn't work, was the following
[*](https://stackoverflow.com/questions/18191893/generate-pdf-from-html-in-div-using-javascript/50200383#50200383)

```
let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

mywindow.document.write(`<html><head><title>${title}</title>`);
mywindow.document.write('</head><body >');
//Write document body here
mywindow.document.write('</body></html>');

mywindow.document.close(); // necessary for IE >= 10
mywindow.focus(); // necessary for IE >= 10*/

mywindow.print();
mywindow.close();
```

Buuuuut... this doesn't really work.
Not only does this not work, it's also deprecatd and not *guaranteed* to work, either.

## Translations

Translation key-string pairs are put in `t9n.js` (t9n = translation).
[*](https://docs.tolgee.io/blog/localization-basics-S01E01)

In the `html`, use th `data-t9n` attribute to have the
[innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
replaced with the string key.

## Hosting

I cannot be asked, so this will just served through [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
