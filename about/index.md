---
layout: default
title: About
---

## My philosophies & approach to Software Engineering

I focus on making performant code; efficient to run and efficient to maintain. All of my thoughts & approaches to SE stem from those two principles.


## Swiss army knife

[kotlin]: https://kotlinlang.org/docs/async-programming.html#futures-promises-and-others
[csharp]: https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios
[storyboard]: https://developer.apple.com/library/archive/documentation/General/Conceptual/Devpedia-CocoaApp/Storyboard.html
[views]: https://developer.android.com/develop/ui/views/layout/declaring-layout

Focus more on learning architectural approaches than the specifics of a language or a framework, unless they are particularly interesting or relevant to a task.
When working with a framework, library, engine, or language, be sure to know how they are opinionated to be able to work with them most effectively.
Consider; knowing multithreading techniques and differences between  [Kotlin's suspend][kotlin] and [C#'s await][csharp],
or UI design patterns and how to apply them to 
[iOS's Storyboard][storyboard] compared to applying them in [Android's Views][views].


## Not perfect, but perfectly workable

It's impossible to make the perfect software.
From simple bugs to incorrect strategy, it is thermodinamically impossible for every single step of the Software Development cycle to be accident-free.
The same thing can be said about pretty much anything: perfection is an unattainable absolute.

<figure>
<img style="margin: auto; display: block;" src="/assets/images/missile_memleak.jpg" height="125"/>
<figcaption style="text-align: center;"><a href="https://devblogs.microsoft.com/oldnewthing/20180228-00/?p=98125">source: Kent Mitchell</a></figcaption>
</figure>

### Do it once, think ahead

Premature optimization is the root of all evil.
So is a lack of foresight
[[1]](https://pythonspeed.com/articles/premature-optimization/)
[[2]](https://www.youtube.com/watch?v=GA4ONupSl8Y)
[[3]](https://www.youtube.com/watch?v=MR4i3Ho9zZY).
Like with everything in life, you have to find a balance.
You can't just jump in and write spaghetti, and you can't spend months talking about design patterns.
And [don't over-engineer](https://www.youtube.com/watch?v=-AQfQFcXac8).

### Do it once, but investigate

The first solution that pops into your head might not be the best.
Keeping an open mind to ideas from yourself & others is critical when making good software.
It can be interesting to work in parallel on multiple solutions to a problem to either mix-and-match the best of them, or to benchmark to find the best.

### Do it once, do it right

Once a task is marked as completed, or a feature is considered done, you shouldn't have to look at it again other than to fix bugs or add new features.
A bad sign is when you have to go back later to either optimize or re-architect the solution; both are a waste your time, reveiwers time, and QA time.

### Do it once, don't duplicate

If you notice you're writing duplicate code, it usually means you haven't thought things through.
Foresight is critical to avoid wasting time!
Your immediate thought should be why you have duplicated code, how to avoid it in the future, and how to refactor it.
Not doing this can result in a balooning problem that will eventually burst into massively unmaintainable code.

[cobol]: https://hackaday.com/2025/04/16/porting-cobol-code-and-the-trouble-with-ditching-domain-specific-languages/
But, don't rework something that ain't broke [(*)][cobol].

## Test Driven Design

<img style="display: block; margin-left: auto; margin-right: auto;" src="/assets/images/tdd.jpg">

<iframe title="Simple testing can prevent most critical failures" style="display: block; margin-left: auto; margin-right: auto;" width="560" height="315" src="https://www.youtube.com/embed/6xrGo1IIB3w?si=wujwOg4mjg6qrQhQ&amp;start=883" frameborder="0" allowfullscreen></iframe>

Test driven design is truly one of the best software development practices, and it's one that I frequently employ.
The major benefit is that it allows you to immediately, from requirements, define how the software is supposed to behave.
It's the perfect method for sanity checking as well.

## Habits will make or break you

Lastly, remember [good habits](https://zarar.dev/good-software-development-habits/).
These are the things you are doing daily, hourly, so make sure that you don't shoot yourself in the foot!
