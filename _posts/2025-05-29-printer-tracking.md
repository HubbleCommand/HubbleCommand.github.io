---
layout: post
title: "Printer Tracking"
date: 2025-05-29
---

It's been widely known for years that printers will include tracking dots as a 'fingerprint' of which exact print printed the page.
It's one of the reasons that you still need color ink when printing greyscale.
The BBC has an article on these tracking dots
[*](https://www.bbc.com/future/article/20170607-why-printers-add-secret-tracking-dots).

Spout all the tinfoil-hat not-so-nonsense that you want, this does have a real use:
track, find, and prevent counterfeitting.

However, something that I didn't think possible would be to be able to track 3D printed parts _without any tracking built-in_
[*](https://www.tomshardware.com/3d-printing/ai-can-track-3d-printed-parts-back-to-specific-machine-that-made-them).

I admit I'm _severely_ sceptical.
Determining if a set amount of prints originated from the same printer may be possible, but seems like it's very unlikely.
There's so many factors that contribute to 3D printing, from vibrations, to temperatures, to air pressure...
Hell, even the same printer can offset itself over time.
So, I imagine, given the mount of environmental variables that change print quality, that identifying the same printer over long periods of time
would become nigh-impossible.
See how difficult leveling and calibrating is without auto-leveling and auto-calibrating.

On top of it, the training dataset is minuscule:

> In tests, smartphone photographs of 9,192 parts made on 21 3D printing machines from six companies, and with four different fabrication processes, could be fingerprinted “with 98% accuracy from just 1 square millimeter of the part’s surface.”

This low amount of samples of _different_ machines seems to me like it could bring a whole lot of false positives, especially when talking about training AI.
Training GPTs became difficult because they ran out of training data on the *entire internet* of about *100 zetabytes*, so this dataset is miniscule.

Training is also done with a lot of pre-tagged data, meaning thousands of pictures where the model is *told* which printer it came from.
Given this, it's not a super trustable or scalable method.
