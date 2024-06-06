---
layout      : project
title       : "Prepa CH"
date        : 2024-01-16
categories  : ["App"]
programming-languages: ["C#"]
icons       : ["android", "csharp", "dotnetcore"]
start-date  : 2023-10-01
last_modified_at: 2024-06-02
---

[![](https://img.shields.io/badge/Visit_Repo-0)](https://github.com/HubbleCommand/PrepaCH)

When I was doing my yearly military service in 2023, I was met with a few issues. I didn't remember all of the military ranks, I still had to perform my shooting and was unsure of the dates, I wasn't exactly sure when my service was, and I was having a time keeping track of all of my gear with all of it's bits and bobs. As I was in the mood to try out a new cross-platform framework, I decided to make a quick app that could do that all for me: [PrepaCH](https://github.com/HubbleCommand/PrepaCH).

There was some buzz at the time around [MAUI](https://dotnet.microsoft.com/en-us/apps/maui), so I decided to give it a go.


## .NET MAUI
MAUI feels like a minor refresh of Xamarin when developing, however when fixing bugs feels like leaps back. Mostly because there are so many little things that don't work as expected, aren't documented (i.e. animations automatically being skipped on Android when battery saver is on), or are just not working with MAUI. I'm not the only unimpressed developer, as many other have voiced their frustration [[1](https://www.theregister.com/2023/11/29/microsoft_net_maui_devs_unhappy/)] [[2](https://visualstudiomagazine.com/articles/2022/09/29/net-maui-complaints.aspx)]. It, however, remains the best .NET cross-platform framework. [Uno Platform](https://platform.uno/) has so many platform gaps in it's APIs that it sort of defeats the purpose of calling it "cross-platform" (i.e. [MapControl](https://platform.uno/docs/articles/controls/map-control-support.html) or the older hodge-podge of media elements).


### Debugging is bad
While tracking your own code's issues is not much different than any other .NET project, issues arise when encountering instability with MAUI itself. A good example is [this bug I found with view animations on Windows](https://github.com/dotnet/maui/issues/18420). While the app worked fine on Android, I kept encountering a crash on Windows with the following trace:

```
ReproApp.dll!ReproApp.WinUI.App.InitializeComponent.AnonymousMethod__3_1(object sender, Microsoft.UI.Xaml.UnhandledExceptionEventArgs e) Line 68	C#
Microsoft.WinUI.dll!WinRT._EventSource_global__Microsoft_UI_Xaml_UnhandledExceptionEventHandler.EventState.GetEventInvoke.AnonymousMethod__1_0(object sender, Microsoft.UI.Xaml.UnhandledExceptionEventArgs e)	Unknown
Microsoft.WinUI.dll!ABI.Microsoft.UI.Xaml.UnhandledExceptionEventHandler.Do_Abi_Invoke(nint thisPtr, nint sender, nint e)	Unknown
[Native to Managed Transition]	
[Managed to Native Transition]	
Microsoft.WinUI.dll!ABI.Microsoft.UI.Xaml.IApplicationStaticsMethods.Start(WinRT.IObjectReference _obj, Microsoft.UI.Xaml.ApplicationInitializationCallback callback)	Unknown
Microsoft.WinUI.dll!Microsoft.UI.Xaml.Application.Start(Microsoft.UI.Xaml.ApplicationInitializationCallback callback)	Unknown
ReproApp.dll!ReproApp.WinUI.Program.Main(string[] args) Line 31	C#
```

If the source of the error isn't obvious, that's because it doesn't actually give one.

An unhandled crash has happened somewhere within MAUI, and the application-level exception handler has caught it; there is no traceability of where the crash actually happened. I was absolutely flummoxed when PrepaCH was working fine on Android, yet was crashing randomly on Windows. It took almost an hour of debugging to pin point that calling certain animation methods with a duration of `0` was the source of the culprit.

The main problem is that so many crashes with MAUI have this effectively empty stack trace, making it completely useless when trying to debug. I can't imagine trying to look through bugs in [Crashlytics](https://firebase.google.com/docs/crashlytics) that all have the same trace.


### Web support is a dark secret that should stay hidden
MAUI itself doesn't support web as a platform, just like Xamarin before it. The only way to support web is to first create a Blazor app, and then "host" it on the device with [Blazor Hybrid](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-8.0#blazor-hybrid). A step-by-step guide is provided [here](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/blazorwebview?view=net-maui-8.0).

When Blazor was originally released, it only had [server mode](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-8.0#blazor-server), which made it the laggiest framework I had ever tested, even when running everything on the same machine. The fundamental philosophy of Blazor didn't make sense and felt like the bastard child of a basket case. Given the issues MAUI already has, I can't imagine how much worse it would get with Blazor.


## Flutter reigns supreme... for now
I've tried a lot of cross platform frameworks, even things like [Kivy](https://kivy.org/).

While most cross-platform frameworks have some benefits or interesting takes, the fact remains that Flutter is more stable than most, with the most platforms supported (mobile, desktop, and web), while providing better performance.

That said, Flutter does suffer from it's own weight, with a constantly changing render engine, difficult iOS & macOS support, and many minor issues that still crop up to this day (i.e. infinite white screens).

The framework's custom language, Dart, also holds it back as it will never have the feature set of generic OOP languages like Java and C#. For me, it always begs the question as to why Google made this language. The biggest reason given was to make a [better garbage collection system](https://dart.googlesource.com/sdk/+/refs/tags/2.15.0-99.0.dev/runtime/docs/gc.md) that could better collect the short-lived objects during each frame draw, but GC'd languages like Java and C# allow you to create your own GC (C# example [here](https://www.codeproject.com/Articles/5372791/Implementing-a-Simple-Garbage-Collector-in-Csharp) and [here](https://www.mono-project.com/docs/advanced/garbage-collector/sgen/)). Even when Google made Compose, [they had to re-work Android's Garbage Collection](https://proandroiddev.com/collecting-the-garbage-a-brief-history-of-gc-over-android-versions-f7f5583e433c) to deal with this very issue.


## The future is probably (hopefully) Kotlin
Kotlin Multiplatform was moving very fast for a while. It feelt like it quickly added desktop and web support, and that it breezed through alphas and betas. While it was marked as stable in November of 2023, after having tried to integrate it into Pix4D Catch's iOS app in 2023 and Q1 2024, I can guarantee that it really wasn't. Integration within existing iOS apps is a massive pain. While it doesn't have the bugginess of MAUI, it is no walk in the park to get it working like Flutter. There are so many build system elements to configure, and each update of Xcode and Android seem to have corresponding changes to build system configuration.

The major benifit of Kotlin Multiplatform is that it is based off of Kotlin. Kotlin was originally made to deal with the issues of Java, and has fixed so many of the issues of the latter language that it has generally surpassed it in every single way. Take that Oracle!


## You can tell how mature a framework is if it supports Open Street Map
[Kivy](https://kivy.org/) doesn't. MAUI doesn't. [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) doesn't. [Streamlit](https://streamlit.io/) doesn't.

[Flutter](https://flutter.dev/) does.

While this may seems strange at first, this is a good indicator of the size and health of the surrounding community. OSM has the lowest entry cost of 0$, and has very little access restrictions. As maps are such a common feature in apps, having an integration with a mapping service that doesn't require setting up a bunch of API keys shows how accessible the framework really is.


## Results
After developping PrepaCH, it really feels like .NET MAUI isn't production ready; there's many bugs and inconsistent behavior, [some of which I was been able to pinpoint and report](https://github.com/dotnet/maui/issues/18420), some being one-off odd behaviors, and general instability.

I like C# as a language. There's interesting features that others just don't have, or don't do as well. However, most of the cross-platform UI frameworks have never been big hits. That's not to say that all of .NET is bad. ASP.NET is probably the best web framework out there.

The biggest issue that MAUI faces is that it isn't being developed in a vacuum; there are plenty of other cross platform solutions, many of which are better.

At this point, I think I've played around enough with app dev frameworks to know that until Flutter is dethroned (most likely by Kotlin, or if Microsoft pulls a miracle out of their ass with MAUI), that there is little point in playing around with these tools. I've sort of gotten sick of app dev in my personal projects at this point, and am shifting focus on to more promising things.
