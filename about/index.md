---
layout: default
title: About
---

## My philosophies & approach to Software Engineering

I focus on making performant code, and maintainable code which is performant for me to maintain. All of my thoughts & approaches to SE stem from those two principles.

### Swiss army knife
Focus more on learning architectural approaches than the specifics of a language or a framework, unless they are particularly interesting or relevant to a task that you are doing. When working with a framework, library, engine, or language, be sure to know how they are opinionated to be able to work with them most effectively. Consider; knowing multithreading techniques and differences between [Kotlin's suspend](https://kotlinlang.org/docs/async-programming.html#futures-promises-and-others) and [C#'s await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios), or UI design patterns and how to apply them to [iOS's Storyboard](https://developer.apple.com/library/archive/documentation/General/Conceptual/Devpedia-CocoaApp/Storyboard.html) compared to applying them in [Android's Views](https://developer.android.com/develop/ui/views/layout/declaring-layout).

### Do it once, think ahead
Pre-emptive optimization is the root of all evil. So is a lack of foresight.
Like with everything in life, you have to find a balance. You can't just jump in and write spaghetti, and you can't spend months talking about design patterns, and [don't over-engineer](https://www.youtube.com/watch?v=-AQfQFcXac8).

### Do it once, but investigate
The first solution that pops into your head might not be the best. Keeping an open mind to ideas from yourself & others is critical when making good software. It can be interesting to work in parallel on multiple solutions to a problem to either mix-and-match the best of them, or to benchmark to find the best.

### Do it once, do it right
Once a task is marked as completed, or a feature is considered done, you shouldn't have to look at it again other than to fix bugs or add new features. A bad sign is when you have to go back later to either optimize or re-architect the solution; both are a waste your time, reveiwers time, and QA time.

### Do it once, don't duplicate
If you notice you're writing duplicate code, it usually means you haven't thought things through. Foresight is critical to avoid wasting time! Your immediate thought should be why you have duplicated code, how to avoid it in the future, and how to refactor it. Not doing this can result in a balooning problem that will eventually burst into massively unmaintainable code.
