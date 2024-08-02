---
layout      : project
title       : "Godot - Image Rotation"
date        : 2024-07-30
categories  : ["GameDev", "Godot"]
#start-date  : 
---



## Engine Contributions
Building the engine is easiest done with scoop, see the first note [here](https://docs.godotengine.org/en/stable/contributing/development/compiling/compiling_for_windows.html)

Important Godot pages
[Contributing Code](https://docs.godotengine.org/en/stable/contributing/ways_to_contribute.html#contributing-code)
[Best practices](https://docs.godotengine.org/en/stable/contributing/development/best_practices_for_engine_contributors.html)
[Engine Development](https://docs.godotengine.org/en/stable/contributing/development/index.html#buildsystem-and-work-environment)
[PR Workflow](https://docs.godotengine.org/en/stable/contributing/workflow/pr_workflow.html)

### More Image Rotation
Currently, Godot only allows for rotating images by 90° or by 180°. 

Matrix rotation by an angle that is not a factor of the angle of the matrix (i.e) will always result in some form of data loss. A very good example is the following video, where a single line is continuously rotated by one degree.

<iframe width="420" height="315" src="https://www.youtube.com/embed/1UuQCDgiqVg" frameborder="0" allowfullscreen></iframe>

This means that when doing consecutive rotations, it is important to have the original image to rotate with.

Fundamentally, rotating an image is no different than rotating a 2D matrix.



This project needed it https://github.com/HubbleCommand/equinox-vacuum-simulator/blob/main/src/utils/ImageUtils.cs


While investigating, I found [this SO question](https://stackoverflow.com/questions/484573/image-rotation-algorithm) that pointed me to [leptonica](http://www.leptonica.org/index.html), which is self-describe as:
> Leptonica is a pedagogically-oriented open source library containing software that is broadly useful for image processing and image analysis applications.
It has a [very interesting page on rotations](http://www.leptonica.org/rotation.html)


I was lucky enough to stumble upon this blog with a [good overview of image rotation methods](http://datagenetics.com/blog/august32013/index.html)


[Library](https://github.com/openlab-vn-ua/ImageRotation) that implements some research papers



I also found [shear mapping](https://en.wikipedia.org/wiki/Shear_mapping).

Shearing Tutorials
https://www.ocf.berkeley.edu/~fricke/projects/israel/paeth/rotation_by_shearing.html
https://gautamnagrawal.medium.com/rotating-image-by-any-angle-shear-transformation-using-only-numpy-d28d16eb5076

[Stand-up Maths](https://www.youtube.com/@standupmaths), a fun channel similar to [Numberphile](https://www.youtube.com/@numberphile) in subject matter, has an interesting video on [image rotation by shearing](https://www.youtube.com/watch?v=1LCEiVDHJmc)

<iframe width="420" height="315" src="https://www.youtube.com/embed/1LCEiVDHJmc" frameborder="0" allowfullscreen></iframe>


Assorted image manipulations
https://www.codingame.com/playgrounds/2524/basic-image-manipulation/transformation



A basic implementation is not that hard. What becomes hard is trying to optimize. 

I sometimes write about AI, and there's a [very interesting discussion](https://forums.parallax.com/discussion/175106/rotate-16-x-16-image-algorithm-chatgpt) on how ChatGPT gets many things wrong when building out algorithms to rotate images.

#### Research Papers

For remote PDFs (this should work once the PDFs are hosted on github)
<embed src="http://www.jaist.ac.jp/~t-asano/papers/ISAAC-final.pdf" type="application/pdf"/>

For local ones
<object data="{{ post.assets.godot.ISAAC-final.pdf }}" width="1000" height="1000" type='application/pdf'/>




#### Sampling

#### Shearing

https://www.ocf.berkeley.edu/~fricke/projects/israel/paeth/rotation_by_shearing.html




For testing, I fittingly took [TV Test Cards](https://en.wikipedia.org/wiki/Test_card) to perform rotations on. Very easy to see if anything was done wrong.
