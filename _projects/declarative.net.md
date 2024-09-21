---
layout      : project
title       : "Declarative.NET"
date        : 2024-09-21
categories  : []
programming-languages: ["csharp"]
icons: ["csharp", "dotnetcore"]
---

> I AM ONLY PUBLISHING THIS PAGE FOR MY OWN PURPOSES AND TRACABILITY OF THIS PROJECT

> IT WILL NOT BE DEVELOPED FURTHUR FOR THE FORSEABLE FUTURE

> The idea, while interesting, doesn't have much use

> If I didn't already have a thousand projects to work on, I'd do this


## Origin
After playing around with MAUI while making <a href="{{ site.url }}{{ site.baseurl }}{% link _projects/prepa-ch.md %}">PrepaCH</a>, a though occured to me.
MAUI had plenty of issues (some of which [I have reported](https://github.com/dotnet/maui/issues/18420)), so I wondered; what would a declarative app framework look like in C#?

I like the Flutter / Compose / SwiftUI approach, using a [declarative](https://docs.flutter.dev/get-started/flutter-for/declarative) system instead of imperative one.
While design patterns are incredibly important, like [State](https://refactoring.guru/design-patterns/state), many detailed or "child" patterns only seem to come around due to issues with the language or framework in question, like [MVVM](https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm), or MVC, or MVP, or, or, or...
Such design patterns feel like a solution to underlying problems with state management in imperative systems, and declarative systems address state management much better.

Of course, one cannot forget to mention [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns) when writing about design patterns.


## Why not proceed
First off, [Nobody Cares About Technical GitHub Projects](https://www.youtube.com/watch?v=uA-yk1O3uq4&ab_channel=ThePrimeTime).
While this would be trying to fix some issues with MAUI, it wouldn't really do much.

While only tangentially related, [Slint](https://www.reddit.com/r/csharp/comments/16vlvg6/declarative_gui_for_c/) seems interesting.

However, the main reason I'm also not continuing this project is because of the existing [C# Markup in the Community Toolkit](https://learn.microsoft.com/en-us/windows/apps/windows-dotnet-maui/tutorial-csharp-ui-maui-toolkit).
While not declarative in the slightest, I feel like it's not too far off and you could get there with [Events](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/events/).


## Wouldn't start from scratch
Of course, I thought of just starting from scratch.
I looked into having the UI made in [Skia](https://skia.org/) / [SkiaSharp](https://github.com/mono/SkiaSharp).
However, the mono project was [recently 'killed'](https://gamefromscratch.com/mono-is-dead-love-live-wine/), so who knows what the future of SkiaSharp would be.

That being said, Skia only handles rendering, all other systems like input, canvas gestures, and all system-level calls like battery status, etc, would have to be redone from scratch.
Going down that path would require a lot of groundwork before even getting to the declarative UI system.

As all that seems like too much work, it would make much more sense to use MAUI as a starting point.
After all, the main point of Declarative.NET would only be to have declarative UI; there's no point in reinventing the wheel when it can be avoided.


## Implementation plan in MAUI
### How existing frameworks work
First off, it's important to understand the inner workings of existing declarative frameworks:
- [How Compose works](https://developer.android.com/develop/ui/compose/phases)
- [How Flutter works](https://docs.flutter.dev/resources/architectural-overview)
- [How SwiftUI works](https://www.vadimbulavin.com/swiftui-view-lifecycle/) (my major gripe here is that Apple doesn't have anything itself to describe how SwiftUI works...)

### Rendering
An MVP would have the following:
- basic layout system with a view tree
- a few basic views through which all other widgets could be implemented: text, shape, image

The most important part to note here is how widgets / views are sized.
In existing frameworks, views can size themselves only within their parent, they can't become bigger than their parent or resize their parent.

The most basic implementation would be to directly use MAUI's [GraphicsView](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.graphicsview)
- [Draw graphical objects](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/graphics/draw?view=net-maui-8.0)
- [Transforms](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/graphics/transforms?view=net-maui-8.0)

The major benefit is that GraphicsView handles gestures, read more [here](https://learn.microsoft.com/en-us/dotnet/maui/fundamentals/gestures/tap?view=net-maui-8.0).

However, as mentioned in the above section, Skia could actually be of help here to.
Coincidentally, [SkiaSharp can be used within MAUI](https://learn.microsoft.com/en-us/samples/dotnet/maui-samples/skiasharpmaui-demos/).
After all, Flutter started with Skia, so it would be a good starting point (they now use impeller which I think they develop).
- [SkiaSharp Tutorial - Getting Started with SkiaSharp](https://www.youtube.com/watch?v=OZ1dh0TfDZc)
- [Drawing with SkiaSharp](https://swharden.com/csdv/skiasharp/skiasharp/)
- [SkiaSharp Tutorial](https://washamdev.com/skiasharp-getting-started-and-simple-tutorial/)

The major downside here, compared to GraphicsView, is that the Skia views cannot handle inputs (afaik).

### Code-wise
While that all nice and dandy, there's some important things to consider with how this would be concretely implemented.
C#'s Attribute system is a good place to start:
- [C# Attributes](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/reflection-and-attributes/)
- [Creating custom attributes](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/reflection-and-attributes/creating-custom-attributes)

[Source generators](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/source-generators-overview) may be neat as well, but seem over complicated.

[Events](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/events/) would play a central role in this, and I feel that [Delegates](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/) would make a useful entry.

And that's about it

## Last words
I like the idea conceptually, but honestly I don't have the time or energy to work on it.
