---
layout      : project
title       : "Godot - Image Rotation"
date        : 2024-07-30
categories  : ["GameDev", "Godot"]
#start-date  : 
---


Godot's built-in image rotation functions are lacking.
You can only rotate [90](https://docs.godotengine.org/en/stable/classes/class_image.html#class-image-method-rotate-90) or [180](https://docs.godotengine.org/en/stable/classes/class_image.html#class-image-method-rotate-180) degrees.

I required functions to rotate images by an arbitrary amount of degrees when working on [EqVS](https://github.com/HubbleCommand/equinox-vacuum-simulator), a cleaning simulator similar to the one below, and ended up [implementing them here](https://github.com/HubbleCommand/equinox-vacuum-simulator/blob/main/src/utils/ImageUtils.cs).

<iframe width="420" height="315" src="https://www.youtube.com/embed/AKkpzHc1gG0" frameborder="0" allowfullscreen></iframe>

These were, however, still lacking.
While they did the job, they weren't great memory-wise: requiring duplicating the memory for the image.
There was no way to improve things without diving into the engine itself, so that's what I decided to do.

TODO this is NOT TRUE!!! you can access the data buffer directly, this could be a GDExtension

For testing, I fittingly took [TV Test Cards](https://en.wikipedia.org/wiki/Test_card) to perform rotations on. Very easy to see if anything was done wrong.


## Image rotation theory
An image is, effectively, a 2-dimensional matrix (even if it is stored as a 1-dimensional array).
This means that we can apply the same type of transformations to it.
See [here](https://www.codingame.com/playgrounds/2524/basic-image-manipulation/transformation) for other types of transformations.

Matrix rotation by an angle that is not a factor of the angle of the matrix (i.e) will always result in some form of data loss.
A very good example is the following video, where a single line is continuously rotated by one degree, resulting in the destruction of the image.

<iframe width="420" height="315" src="https://www.youtube.com/embed/1UuQCDgiqVg" frameborder="0" allowfullscreen></iframe>


While investigating, I found [this SO question](https://stackoverflow.com/questions/484573/image-rotation-algorithm) that pointed me to [leptonica](http://www.leptonica.org/index.html), which is self-describe as:
> Leptonica is a pedagogically-oriented open source library containing software that is broadly useful for image processing and image analysis applications.
It has a [very interesting page on rotations](http://www.leptonica.org/rotation.html)

[Stand-up Maths](https://www.youtube.com/@standupmaths), a fun channel similar to [Numberphile](https://www.youtube.com/@numberphile) in subject matter, has an interesting video on [image rotation by shearing](https://www.youtube.com/watch?v=1LCEiVDHJmc)

<iframe width="420" height="315" src="https://www.youtube.com/embed/1LCEiVDHJmc" frameborder="0" allowfullscreen></iframe>

A basic implementation is not that hard. What becomes hard is trying to optimize. 

I sometimes write about AI, and there's a [very interesting discussion](https://forums.parallax.com/discussion/175106/rotate-16-x-16-image-algorithm-chatgpt) on how ChatGPT gets many things wrong when building out algorithms to rotate images.


### Research Papers
Here are some various papers on the subject, some with novel approaches:

- [Double Line Image Rotation][1]
- [High Quality Alias Free Image Rotation][2]
- [In-Place Algorithm for Image Rotation][3]
- [Convolution-B ased Interpolation for Fast, High-Quality Rotation of Images][4]

[1]:{{ site.url }}/assets/godot/Double_Line_Image_Rotation.pdf
[2]:{{ site.url }}/assets/godot/High_Quality_Alias_Free_Image_Rotation.pdf
[3]:{{ site.url }}/assets/godot/ISAAC-final.pdf
[4]:{{ site.url }}/assets/godot/yaro_rot.pdf

There is also [this](https://www.sciencedirect.com/topics/computer-science/image-rotation)
library that implements some other research papers.


## Cropping
The first step to rotating an image is by enlarging it without resizing the image itself.
This can be done by cropping the image into a larger area.
The one and only case that the matrix maintains the same dimensionality is when all dimensions are the same size.

Godot does have cropping functions, however, as noted above, it isn't efficient.
From the Godot source code:

> /* to save memory, cropping should be done in-place, however, since this function
	   will most likely either not be used much, or in critical areas, for now it won't, because
	   it's a waste of time. */

In my case, this function was used a lot.

The implementation is very simple:

```
uint32_t pixel_size = get_format_pixel_size(format);
int row_copy_size = p_width;
int empty_buffer_size = 0;
bool forward = true; //Iteration direction

int effective = width - p_x;
if (p_width > effective) {
	empty_buffer_size = p_width - effective;
	row_copy_size = effective;
	forward = false;
}

while (r >= 0 && r < p_height) {
	int offset_orig = p_x + ((r + (p_height > height ? 0 : p_y)) * width);
	int offset_dst = r * p_width;

	memcpy(w + (offset_dst * pixel_size), w + (offset_orig * pixel_size), row_copy_size * pixel_size);
	memset(w + ((offset_dst + row_copy_size) * pixel_size), 0, empty_buffer_size * pixel_size);

	r += forward ? 1 : -1;
}
```

Basically, for each row, copy the data we want into it, and if needed write empty pixels.

There is one bit of trickery here: when to iterate from the first row to the last, or last to the first.
The reason for this is very simple: if we need to add empty pixels to each row, this will, potentially, overwrite pixels that we need.
To avoid this, we iterate backwards on the image if we are going to be pasting empty pixels.

In testing, my method can be more than 5x faster than the old one.


## Interpolation
![Interpolation representation](https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Comparison_of_1D_and_2D_interpolation.svg/1280px-Comparison_of_1D_and_2D_interpolation.svg.png)

> By <a href="//commons.wikimedia.org/wiki/User:Cmglee" title="User:Cmglee">Cmglee</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=53064904">Link</a>

Interpolation is easy if you only consider nearest-neighbour and linear methods.

[Trilinear interpolation](https://en.wikipedia.org/wiki/Trilinear_interpolation) is very interesting.
Linear is for 1-dimensional data, bilinear is for 2-dimensional data, hence trilinear is for 3-dimensional data.
But where does the third dimension exist in a 2-dimensional image?
The answer is with [Mipmaps](https://en.wikipedia.org/wiki/Mipmap).


## Sampling & Mapping

Sampling is, in basic implementations, relatively boring.
You create a temporary image to act as a buffer, and read pixels from the original.

Yay.

### Sampling memory optimisations
When using any sampling technique, you need a buffer to write the image to.
Basic implementations use a buffer the same size of the image, and reducing this size is generally difficult, albeit possible.

Something that becomes interesting are cases where you need to rotate the same image multiple times.
This was the case for me.
However, in the section "Image Rotation Theory", it is shown that performing consecutive rotations to an image results in significant destortions.

There's a good memory boost here if you see it.

Do you?

Well, here it is: we keep the original image untransformed, and rotate it onto a "buffer" image.
But the same, permanent, buffer image, always.

This is especially intersting in cases where rotations are performed frequently, as there is insignificant memory segmentation.


## Shearing
Shearing is the more interesting method of image rotation, as the memory gains are impressive.
As a shear can be done in-memory, it means this method is the only one that doesn't require substantial buffers
(buffer size depends on the interpolation method).

Good write-ups on this topic:
- [blog post](http://datagenetics.com/blog/august32013/index.html)
- [Wikipedia article](https://en.wikipedia.org/wiki/Shear_mapping)
- [Medium article](https://gautamnagrawal.medium.com/rotating-image-by-any-angle-shear-transformation-using-only-numpy-d28d16eb5076)
- [Berkeley article](https://www.ocf.berkeley.edu/~fricke/projects/israel/paeth/rotation_by_shearing.html)

<iframe width="420" height="315" src="https://www.youtube.com/embed/6n24E70rP2s" frameborder="0" allowfullscreen></iframe>


## Moving to [GDExtension](https://docs.godotengine.org/en/stable/tutorials/scripting/gdextension/gdextension_cpp_example.html#doc-gdextension-cpp-example)
As mentioned at the beginning, it should be possible to do this without modifying the engine itself.
This is because Godot's image has a public [data](https://docs.godotengine.org/en/stable/classes/class_image.html#class-image-property-data) property,
so it should be possible to just set this.

However, this comes with a major drawback: you lose the in-memory modifiability of the image data.

This isn't problematic for some types of rotating, where we may not even want to write back to the same image.

However, for cropping and shearing, we lose a massive amount of performance, as the benefit of these two is that they can be done in-memory.
This is not possibly when using GDExtension, as both [`get_data()`](https://docs.godotengine.org/en/stable/classes/class_image.html#class-image-method-get-data) and [`data`](https://docs.godotengine.org/en/stable/classes/class_image.html#class-image-property-data) return copies of the image data, not references.

As such, dropping this part except for rotation (maybe).
