---
layout: post
title: "Idle Framework - Android"
date: 2025-03-28
---

## Where this started - Doom as a Windows Wallpaper

While clearing out some drives, I found a project that I stopped some time last year.

A few years ago there was the whole "doom can run anywhere" meme going around again, so I though fuck it, it can't be that hard to get it working as a desktop wallpaper.
Technically it wasn't.
With [Wallpaper Engine](https://www.wallpaperengine.io/en), you can just drag-and-drop `.exe`s and it will run it in your desktop background.
To give you an idea of how well it works, I completely gave up on recording the screen.

You can very easily get soft-locked out of your system as the game takes over all input, or enter infinite starting loops that borderline crashes your computer.

I know I have a recording *somewhere*, but only the lord knows where now.
As I wasn't exactly invested in this, I didn't bother trying to get it working again.

At the time, this got me thinking: could you make a game in a wallpaper?
So there I went on another game dev journey, but with a unique approach.

I dropped working on it fairly quickly due to other obligations.
However, I've had some extra time, so time to finish it!

## Existing Tools

Before embarking on making something from scratch, I wanted to see how I could do this with existing tools and engines.

With Defold and Godot I guess it *could* be possible with platform-specific code, but it would be *incredibly* time-consuming.
Godot could be the easiest as there is already samples for their
[Android Library](https://docs.godotengine.org/en/stable/tutorials/platform/android/android_library.html)
that can be embedded in existing applications.
Defold also has [Native Extensions](https://defold.com/manuals/extensions-best-practices/).
Each of these cases requires me to gain even more in-depth knowledge of the engines for something that I don't think is even possible.

[Samsung Themes](https://developer.samsung.com/galaxy-themes/overview.html) seemed interesting at first, but is umm... meh.
There's a whole approval process, and it is *very* limited, not at all what I was looking for.

LibGDX has some stuff with Android WallpaperService [here](https://github.com/libgdx/libgdx/blob/master/backends/gdx-backend-android/src/com/badlogic/gdx/backends/android/AndroidLiveWallpaperService.java),
as well as a [tutorial for creating Live Wallpapers](https://libgdx.com/wiki/app/starter-classes-and-configuration#live-wallpapers).
There is also a [Template](https://github.com/kloverde/android-LibGdxLiveWallpaperTemplate)
as well as [some tools](https://github.com/CypherCove/CoveTools#android-live-wallpapers)

[Processing can also be used to make Live Wallpapers](https://android.processing.org/tutorials/wallpapers/).
Which is cool, because I am already familiar with Processing.
But it's also limited, and doesn't seem to provide a hell of a lot over just making it from scratch.
However, you can see the source
for the [WallpaperService](https://github.com/processing/processing-android/blob/main/libs/processing-core/src/main/java/processing/android/PWallpaper.java)
as well as the [backing PApplet renderer](https://github.com/processing/processing-android/blob/main/libs/processing-core/src/main/java/processing/core/PApplet.java).

My last option was to just make it from scratch, which didn't seem *too* hard as I have good knowledge of Android.
The [WallpaperService](https://developer.android.com/reference/android/service/wallpaper/WallpaperService)
is fairly well documented, although there isn't too much online about it.

Weighing my options, I went and started something from scratch.

## Android Wallpaper Framework

### What this isn't

This framework doesn't try to compete with real game dev tools or engines.
Android has some pretty complex features for game dev, like [Frame Pacing](https://developer.android.com/games/sdk/frame-pacing).
You can read the [documentation](https://developer.android.com/games/develop/overview) for more info on Android game dev.

It also isn't made for Layouts.
You can inflate a view into it & use a render thread like
[here](https://stackoverflow.com/questions/4174723/using-layout-resources-in-a-livewallpaper-on-android),
but Live Wallpapers are just a Canvas, not a layout.
Trying to work around this constraint becomes very tedious, so best to use the provided drawing APIs.

### Render Thread

This is the key part of the framework, and where I spent the most time.
The TL;DR is that I just have a simple recursive & interruptable thread doing the rendering in a WallpaperService.

#### Surfaces and GLSurfaces / CPU vs GPU

The [android documentation](https://source.android.com/docs/core/graphics/arch-sv-glsv)
provides the entry point to this.

The biggest drawback with what I ended up doing is going the Surface route with the CPU.
This means that the engine is CPU-bound, although in basic testing it is performant enough for my use case.
This is due to me locking the canvas for drawing:

``` pseudo
val surfaceHolder = WallpaperService.getSurfaceHolder()
val canvas = surfaceHolder.lockCanvas()
```

> Note, this isn't that much of an issue, as the main framework is moving to compose,
    where Skia uses hardware-acceleration magic.
    Read the next post for more detail on this.

There is a *lot* of people that have gotten OpenGL contexts working with Live Wallpapers,
[like here](https://github.com/JesusFreke/Penroser/blob/master/src/org/jf/GLWallpaper/GLWallpaperService.java).
And a whole app around creating your own shaders as live wallpapers: [Shader Editor](https://github.com/markusfisch/ShaderEditor).
In my last job I did some work with our 3D rendering in OpenGL, so I knew how to get it working.
That also means I know it can be *incredibly* time consuming and requires a metric fuck ton of boilerplate.
Managing state with shaders is also not for the faint of heart.
As I wanted something small and simple, I kept going with the CPU bound Surface route.

On top of that, drawing on a Surface with a Canvas is incredibly easy with the drawing APIs
[*](https://developer.android.com/reference/android/graphics/Canvas).

But that's just where to draw to, how could I get a render loop?

#### Coroutines vs Threads

Kotlin's preferred system for doing multithreading is to use Coroutines.
However, a coroutine is effectively a job: it is for a single piece of work.
While you could view each frame as a seperate task, this becomes complicated very fast.
The main issue with that is the indefinite nature of rendering.
While [some discussions](https://github.com/Kotlin/kotlinx.coroutines/issues/3680)
have happened for forever repeats, it's not in progress.

Another issue is the scope.
If you read the Android usage part [here](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-scope/):
> Android has first-party support for coroutine scope in all entities with the lifecycle. See the corresponding documentation.

Which links [here](https://developer.android.com/topic/libraries/architecture/coroutines#lifecyclescope).

Basically, you have to create your own Lifecycle object
[1](https://developer.android.com/topic/libraries/architecture/lifecycle)
[2](https://developer.android.com/reference/androidx/lifecycle/Lifecycle)
[3](https://developer.android.com/topic/libraries/architecture/coroutines#viewmodelscope).

So it's really not that easy to make this *safe*.

So, I made a simple thread that just has a delayed recursion call.
Simple, and it works.

#### Thread Interrupt [api](https://docs.oracle.com/javase/tutorial/essential/concurrency/interrupt.html)

The most important part here is the [thread interrupt](https://medium.com/@AlexanderObregon/javas-thread-interrupt-method-explained-0df0f8f6a428).
Without this, the thread can live outside the context of the Wallpaper, and lead to leaks.
So I simply interrupt the thread when visibility of the surface changes.

> Note that catching an `InterruptedException` will remove the interrupt tag / mark, meaning that subsequent checks to `Thread.interrupted()` will be false (or won't be called depending on how you catch it)

#### If issues persist

As it stands, rendering works.
There used to be an overdraw issue, where two render threads would update the surface.

I discovered I was overcomplicating my life.
I had assumed that `onSurfaceChanged()` was similar to an Activity's `onResume()`, but I was completely wrong.
`onVisibilityChanged()` is closer to an Activity's `onResume()` & `onPause()`.
This meant I could handle thread creation / interruption through `onVisibilityChanged()`.

However, if issues persist, I may have to use [Mutexes](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.sync/-mutex/).

#### Choreograph testing

I originally looked into this because my Sensors playground wasn't rendering as expected.
I couldn't figure out why; frame times, canvas lock times, and draw times were all within reasonable amounts.
But frame times felt like they were being drawn at 8FPS.

Then I checked my debug frame times in the UI, and they were changing fast enough
The issue was just the sensors update being slower than the UI...
I just needed the `HIGH_SAMPLING_RATE_SENSORS` permission.

I was still intruiged by this very low-level approach, but I quickly stopped.
Much like the problem I faced, which was Choreograph frequently stopping with this error:
`CoreRune.SYSPERF_ACTIVE_APP_BBA_ENABLE : stop animation in background states`.

<details markdown="1">
<summary>Choregraph source</summary>

```
abstract class WallpaperFramework : WallpaperService() {
	abstract inner class WallpaperEngine: Engine(), Choreographer.FrameCallback {

        private var choreographer: Choreographer? = null
		override fun doFrame(frameTimeNanos: Long) {
            Log.d("WP-Framework", "choreographer doFrame")
            if (! isVisible) return

            //drawFrame()
            var canvas: Canvas? = null
            try {
                canvas = if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    //This is required for using RuntimeShader
                    surfaceHolder.lockHardwareCanvas()
                } else {
                    surfaceHolder.lockCanvas()
                }
            } catch (e: Exception) {
                Log.d("quck", "ERROR")
            } finally {
                canvas?.let {
                    onDraw(frameTimeNanos, canvas)

                    surfaceHolder.unlockCanvasAndPost(it)
                }
            }

            // Schedule the next frame
            choreographer?.postFrameCallback(this)
            Log.d("WP-Framework", "choreographer doFrame end")
        }

		override fun onCreate(surfaceHolder: SurfaceHolder?) {
            super.onCreate(surfaceHolder)
            choreographer = Choreographer.getInstance()
        }

		override fun onVisibilityChanged(visible: Boolean) {
            super.onVisibilityChanged(visible)
            if (visible) {
                //choreographer?.postFrameCallback(this);
                choreographer?.removeFrameCallback(this); // Remove in case of duplicate registrations
                choreographer?.postFrameCallback(this);
            } else {
                choreographer?.removeFrameCallback(this);
            }
        }
	}
}
```
</details>
<br>

### Shaders

Above I said that I used the normal Surface instead of a GLSurface.
How, then, could I use shaders?

This is possible with the modern approach; [AGSL & Runtime Shaders](https://developer.android.com/develop/ui/views/graphics/agsl/using-agsl).
These can be used through a [Paint](https://developer.android.com/reference/android/graphics/Paint)
object.

Do note that this means a shader cannot be applied to an entire Canvas, only by individual draw operations with Paint objects.
This is not the case when using agsl / pure shading without locking the canvas, but becomes much more complicated to manage, so I won't go down this route.

Note that when drawing, Paint objects should be re-used.

### ResourceManager

Originally, I wasn't sure if this was pre-emptive optimisation.
It was very small though, so I just made it.

I then ran some quick performance test, and the performance difference is actually astronomical.

For decoding a single vector drawable (even the same one), time varies from 0 to 4 milliseconds (80% of the time is 3-4).
My ResourceManager, with the drawable pre-fetched, takes at most 1ms (90%+ of the time, it is 0)

The results for bitmap drawables is even better.
For decode, first time was 6 ms, subsequent can be between 12ms-14ms.
With the ResourceManager, mean time is still 0ms.

If you consider that you may need dozens of drawables to act as sprites,
the decode time *per frame* could be 20+ seconds & be inconsistent.
With the ResourceManager, not only is it much, much faster, but also consistent.
I did expect these results, as Android best practices do say to decode as infrequently as possible, and even to offload this from the main thread.
However, I never really quantified it like I've done here.

<details markdown="1">
<summary>Timing testing source</summary>

```
val startTime = SystemClock.elapsedRealtime()
val bmp = ResourceManager.getResource(R.drawable.explore)!! //or icon_sensor
val midTime = SystemClock.elapsedRealtime()
//val bmpres = AppCompatResources.getDrawable(this.displayContext, R.drawable.explore)?.toBitmap()
val bmpres = getDrawable(R.drawable.explore)?.toBitmap()
val endTime = SystemClock.elapsedRealtime()

Log.d(TAG, "Resource Decode: ${midTime - startTime}")
Log.d(TAG, "Resource Decode: ${endTime - midTime}")
```
</details>
<br>

## Android ScreenSaver

Because of how I made my framework, I could easily re-use my Surfaces and Canvas in a 
[DreamService](https://developer.android.com/reference/android/service/dreams/DreamService).
This is effectively a dynamic wallpaper.

Like WallpaperServices, it's not a very discussed part of the Android API.
But it is documented well enough that it look me only an hour to implement.

## Android Widget Framework

Android Live Wallpapers have some serious limitations, and also have the issue of being blocked by items on the Desktop.
So I though, why not make a 
[Widget](https://developer.android.com/develop/ui/views/appwidgets/overview)?
Couldn't be that hard.

How wrong and innocent I was.
First off, Widgets work nothing like WallpaperService or DreamService.
The "Service" has to orchestrate *all* widgets at once.
The biggest issue is that they aren't made for "quick" updates.
By default, they update every 30 minutes.
You can't use any custom views and only a specific set, even if your custom views *inherit from supported views*.

While Widgets are very cool and can drive engagement
[1](https://android-developers.googleblog.com/2025/03/spotlight-week-widgets.html)
[2](https://android-developers.googleblog.com/2025/03/level-up-your-app-why-android-widgets.html)
[3](https://android-developers.googleblog.com/2025/02/soundcloud-uses-jetpack-glance-to-build-liked-tracks-widget-in-just-2-weeks.html)
, they are not adapted for game rendering.

Andy Tsui has already looked into it, and it works, but is *very* old (10+ years):
- [Evangelion clock widget](https://andytsui.wordpress.com/2010/12/01/evangelion-clock-work-progress/)
- [Mario coin block widget](https://andytsui.wordpress.com/2012/02/17/mario-coin-block-open-sourced/)
- [Tutorial on animating home screen widgets](https://andytsui.wordpress.com/2010/06/06/animating-android-home-screen-widget/)

Here are some clock examples as well, although most just use some default update scheme that wouldn't run fast enough:
- [Analog Clock](https://github.com/BlackyHawky/Clock/blob/main/app/src/main/java/com/best/deskclock/widget/AnalogClock.java)
- [Material Clock](https://github.com/y0av/MaterialClockWidget/blob/master/app/src/main/java/xyz/yoav/materialclock/ClockWidgetProvider.java)

So I ain't bothering.

For now.

## What's next

This post is already long enough, and covers the large sweeps of what I did with my mini wallpaper framework.

The next post will be about how I continued this framework and made a mini cross-platform framework with 
[Kotlin Multiplatform](https://www.jetbrains.com/kotlin-multiplatform/)
and [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/)
