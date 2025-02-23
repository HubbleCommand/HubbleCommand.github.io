---
layout: project
title: "preftils - Android Preferences Utility"
date: 2024-05-11
categories: ["Android"]
programming-languages: ["Kotlin", "Java"]
icons: ["android", "kotlin", "java", "flutter", "dart"]
last_modified_at: 2024-10-18
active: true
---

[pkg-url]: https://jitpack.io/#hubblecommand/preftils
[![Version Badge](https://jitpack.io/v/HubbleCommand/preftils.svg)][pkg-url]
[![Downloads Badge](https://jitpack.io/v/HubbleCommand/preftils/month.svg)][pkg-url]
[![License Badge](https://img.shields.io/github/license/HubbleCommand/preftils.svg?color=blue)](https://github.com/hubblecommand/preftils/blob/master/LICENSE)

preftils is self-described as a
  > Small helper library for working with Android SharedPreferences


> 2024-09-21: I recently looked into DataStore, read the last section for more details

> 2024-10-18: Flutter version

## The problem
There were many things I worked on at my previous job as an Android Software Engineer. From taking over the integration of some of the company's advanced libraries to implementing novel features with standard practices, the job presented itself with a fair amount of interesting, dynamic, and fun challenges.

However what I didn't like was the growing feeling of futility as time went on. One of the biggest problems was dealing with an ever-increasing backlog of bugs, approaching the thousands in length for the Android app alone. The app had only existed for about 2 years before I joined the company, so I was astonished at the ballooning backlog, especially for features that were already in production and in customer's hands.

In many cases, certain parts of the code I had to fix had so many bugs and related tickets, and was so badly done, that it was more time-effective to throw the existing code in the trash and start over. Years of patchwork had made some elements so unstable that there wasn't always a choice in the matter, especially when fixing webs of spaghetti code where fixing one thing would break another. I was the first one to implement basic design patterns like [MVVM](https://developer.android.com/topic/libraries/architecture/viewmodel) or [re-use views](https://developer.android.com/develop/ui/views/layout/improving-layouts/reusing-layouts) instead of copy-pasting thousands upon thousands of lines of code, giving an idea of the immaturity of the codebase.

I spent a lot of time re-doing work, more than was reasonable, but it was still just a drop in the bucket of what should have been fixed or done well (note, not done better, done well). The cardinal sin of Android of excessive use of Context was probably the most common issue I had to weed out, and was a constant slowdown in my work.

There was, however, one monolithic class that always stuck out to me like a sore thumb; our Preferences class. Thousands upon thousands of lines of Java code to handle hundreds upon hundreds of preferences, not even talking about the dozens of related parser and conversion utility classes. While it wasn't difficult to work with, there was immense boilerplate just for handling different types and their getters and setters. I also didn't like the use of Pair to store keys & default values, as while it was obvious once you worked on it, was not evident. Code should generally be evident without the need of being familiar with the codebase. There was also the issue of many different pair types being used on accident, either from Android, Kotlin, or various libraries. It was a lot of code that never felt clean to work with, but there was never any time to review it or think of a better way due to a push for new features.

For me, it always seemed like a very thoughtless implementation with an excessive amount of code. The fundamental problem itself of managing SharedPreferences didn't seem that complex, yet we had so much code to handle it.

So, given I have some time, I decided to ponder upon the issue, and feel like I have come to a fairly simple solution.


## Implementation
My initial thought was that this was an ideal problem for generics: a bunch of functions that on `SharedPreferences`'s side were to either `get` or `put` data of different types. I had hated navigating through files to determine which type I should be using (nothing worse that using `getInt()` on  a `Long` & having runtime exceptions). What's the point of modern OOP & Intellisense if it isn't always used?

With Kotlin's [Extension functions](https://kotlinlang.org/docs/extensions.html) I could easily add the behavior I wanted to the corresponding `SharedPreferences` classes.

First of all, begone the use of Pair. Kotlin's `data class` and better generics are perfect for the task.

```data class Preference<T>(val key: String, val default: T)```

Next was making `SharedPreferences`'s `get` and `put` work with this data class. I wanted these functions to be as light as possible, so I made them `inline` to reduce the overhead compared to the HOF equivalent (details in the first paragraph [of the documentation](https://kotlinlang.org/docs/inline-functions.html)). As I still need access to the associated classes for type checking, I also added the [`reified`](https://kotlinlang.org/docs/inline-functions.html#reified-type-parameters) keyword to [avoid type erasure](https://kotlinlang.org/docs/inline-functions.html#reified-type-parameters).

```
inline fun <reified T> SharedPreferences.get(preference: Preference<T>): T {
    return when (preference.default) {
        is String -> this.getString(preference.key, preference.default) as T
        is Int -> this.getInt(preference.key, preference.default) as T
        is Long -> this.getLong(preference.key, preference.default) as T
        is Boolean -> this.getBoolean(preference.key, preference.default) as T
        is Float -> this.getFloat(preference.key, preference.default) as T
        else -> throw IllegalArgumentException("Unsupported type")
    }
}
```

As this is a pure Kotlin library, Java support was secondary. However, simply removing the `inline` and `reified` keywords lets this work in Java (although with warnings of unchecked casts due to type erasure).

While this was nice, there was a major case that I hadn't covered: custom classes.
As it stood, if anything besides a `String`, `Int`, `Long`, `Boolean`, or `Float`, was used for the default value, it would throw an `IllegalArgumentException`.
This was ignoring a fair amount of the original problem of multiple different parsing functions for the same classes (although there were certainly cleaner ways to do that as well).

Enter support for serialization. Continue reading below.

<details markdown="1">
<summary>Collapsed section on removed features<blockquote>This collapsed section was written for v1.1.0, which introduced the <code>ICodable</code> interface for serializing custom classes, which is no longer available in favor of official Kotlin and Java serialization language features</blockquote></summary>

Enter `ICodable`:

```
interface ICodable {
    fun encode(): String

    @Throws
    fun decode(string: String): ICodable
}
```

Taking it's name from [Swift](https://www.swift.org/)'s [Codable](https://developer.apple.com/documentation/swift/codable), the `ICodable` interface makes inheriting classes implement both a way to encode itself into a string, and decode itself from a string.
While I would have prefered a static way to do this without the need for an instance of the class, the problem is that in Kotliin, this would mean that classes inheriting from `ICodable` would not be required to implement the `decode()` method. I guess I could have gone the [Factory Pattern](https://refactoring.guru/design-patterns/factory-method) or another creation pattern route, but the purpose of this library was to make things *simple*, so not wanting to add any additional complexity, I left it as is.

The get function now has :

```
inline fun <reified T> SharedPreferences.get(preference: Preference<T>): T {
    return when (preference.default) {
        ...
        is ICodable -> {
            val str = this.getString(preference.key, null) ?: return preference.default
            preference.default.decode(str) as T
        }
        else -> throw IllegalArgumentException("Unsupported type")
    }
}
```

It is now exceedingly easy to manage `SharedPreferences`. Using a single `object` to hold the preferences:

```
object Preferences {
    val PREF = Preference("pref", 1000L)
}
```

and as simple as doing the following to read and write the preference:
```
var pref: Long = SharedPreferences.get(Preferences.PREF)
with (PreferenceManager.getDefaultSharedPreferences(this).edit()) {
    put(Preferences.PREF, 100L)
    apply()
}
```

> I have done some more investigation, and it appears that I could use [`kotlinx-serialization`](https://kotlinlang.org/api/kotlinx.serialization/) instead of `ICodable`.
> One thing that I don't like about `kotlinx-serialization` is that I would have to [force a format](https://kotlinlang.org/docs/serialization.html#formats), i.e. JSON, or would have to pass in the actual serialization lambda, which I guess could work.

> The current system will be kept, and an additional class will be created to facilitate the usage of Kotlin's Serialization with `SharedPreferences`. This package is called Preftils, plural.
> This also sort of takes the fun out of the Generics, as there is no point as many [Primitives](https://github.com/Kotlin/kotlinx.serialization/blob/master/docs/builtin-classes.md#primitives) are supported, although it would still help with type safety.
> The last downside would be any interoperability with Java.

> The following seems to work well
```
inline fun <reified T> SharedPreferences.getSerializable(preference: Preference<T>): T {
    if (preference.default is Serializable) {
        val str = this.getString(preference.key, null) ?: return preference.default
        return Json.decodeFromString<T>(str)
    }
    throw IllegalArgumentException("Unsupported type")
}
```

> I will update this page with a new section once this is done
</details>


## Adding Kotlin [Serialization](https://kotlinlang.org/docs/serialization.html) support

The biggest blocker was the following warning on the `@Serialization` annotation:

`"kotlinx.serialization compiler plugin is not applied to the module, so this annotation would not be processed. Make sure that you've setup your buildscript correctly and re-import project."`

I had followed everything to a T, and couldn't for the life of me figure out what was wrong.
After a few hours of searching, I was completely lost. I had applied the necessary plugins and imported the necessary dependencies.

I eventually stumbled upon [this GitHub issue](https://github.com/Kotlin/kotlinx.serialization/issues/2508). I was using Android Studio Giraffe 2022.3.1 patch 2, but there was a newer version available, Android Studio Jellyfish 2023.3.1 patch 1. After upgrading Android Studio, the warning dissapeared, and everything works.

I should probably go over [what's new in Android Studio](https://developer.android.com/studio/releases?utm_source=android-studio&utm_medium=studio-assistant), but I can't be bothere ATM. Although I should probably address the [`Windows Defender might be impacting your build performance` warning](https://stackoverflow.com/questions/57202043/windows-defender-might-be-impacting-your-build-performance).


## Adding Java support
> By complete chance, I found why the Java 21 stuff didn't work, and I can't believe that I hadn't even noticed the very obvious: Android does it's own compatability with the JVM, and currently only supports up to version 17. So obviously using Java 21 APIs wouldn't work! Dadoi!

Instead of trying to force the Kotlin to code to work with Java, I've decided to write the Java equivalent.

Java serialization works differently, using [inheritence](https://docs.oracle.com/javase%2Ftutorial%2F/java/IandI/subclasses.html) with the [Serializable interface](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html) similar to the `ICodable` I originally made, instead of doing it with [Annotations](https://kotlinlang.org/docs/annotations.html) like in Kotlin. I find this approach superior, as it is easy to test if a type is serializable or not. In Kotlin, you always run the risk of runtime errors with no compile-time support (in this case, the support is lost due to the use of generics), yet in Java, you cannot even compile if the type does not conform to the `Serializable` interface.

It was also a chance to look into some of the newer features of Java, notably the better [pattern matching of Java 21](https://blogs.oracle.com/javamagazine/post/java-pattern-matching-switch-preview). This would mean an end to long `if-if-else` blocks to handle different types. I ended up with the following:
<details markdown="1">
<summary>Java code using switch patterns on types</summary>

```
public class PreferenceUtils {
    static <T> void set(SharedPreferences.Editor editor, Preference<T> preference, T value) throws IOException {
        switch (value) {
            case Integer i -> editor.putInt(preference.getKey(), i);
            case Long l -> editor.putLong(preference.getKey(), l);
            case Float f -> editor.putFloat(preference.getKey(), f);
            case Boolean b -> editor.putBoolean(preference.getKey(), b);
            case String s -> editor.putString(preference.getKey(), s);
            case java.io.Serializable serializable -> {
                ByteArrayOutputStream outStream = new ByteArrayOutputStream();
                ObjectOutputStream out = new ObjectOutputStream(outStream);
                out.writeObject(serializable);
                out.flush();
                out.close();

                editor.putString(preference.getKey(), outStream.toString());
                outStream.flush();
                outStream.close();
            }
            default -> throw new IllegalArgumentException("Unsupported type: " + preference.getDefault().getClass());
        }
    }

    @SuppressWarnings("unchecked")
    static <T> T get(SharedPreferences preferences, Preference<T> preference) throws IOException, ClassNotFoundException {
        return preference.getDefault();
        return switch (preference.getDefault()) {
            case Integer i -> (T) (Integer) preferences.getInt(preference.getKey(), i);
            case Long l -> (T) (Long) preferences.getLong(preference.getKey(), l);
            case Float f -> (T) (Float) preferences.getFloat(preference.getKey(), f);
            case Boolean b -> (T) (Boolean) preferences.getBoolean(preference.getKey(), b);
            case String s -> (T) preferences.getString(preference.getKey(), s);
            case java.io.Serializable ignored -> {
                String string = preferences.getString(preference.getKey(), null);
                if (string == null) {
                    yield preference.getDefault();
                }

                ByteArrayInputStream inStream = new ByteArrayInputStream(string.getBytes());
                ObjectInputStream in = new ObjectInputStream(inStream);

                T object = (T) in.readObject();
                inStream.close();
                in.close();

                yield object;
            }
            default -> throw new IllegalArgumentException("Unsupported type: " + preference.getDefault().getClass());
        };
    }
}
```

</details>

Clean and succinct. However, I kept getting the following compilation error:
`com.sun.tools.javac.code.Symbol$CompletionFailure: class file for java.lang.runtime.SwitchBootstraps not found`

After a bit of searching I found [this](https://news.ycombinator.com/item?id=36282076), which is a neat read, but doesn't help. I tried with JDK 21.0.1 and 22.0.1, Oracle JDK and Microsoft's OpenJDK, but nothing seemed to work. As I had already wasted enough time with integrating Kotlin Serialization support, I wasn't going to try and fix this just to keep my own code tidy. I submitted a bug report, but for now, I'm going to stick to Java 8.


## Publishing to JitPack
Another quasi-issue at my previous job was how we managed Android modules. Given the size of the app, we should have had more than one module, but we only had one to manage a library that another team had done. The module was in another repo, and was imported as a submodule.

While that solution wouldn't scale amazingly, that module was never inteded for anything else other than our app. The same approach wouldn't work for Preftils, as this was supposed to be easily used by any third party, ideally just by adding it as a dependency in a `build.gradle` or `build.gradle.kts`.

I originally looked into adding it [directly to Maven central](https://www.jetbrains.com/help/space/publish-artifacts-to-maven-central.html), but after seeing the process I wanted to see if there was something more streamlined.

Enter [JitPack](https://jitpack.io/), self-described as
> Easy to use package repository for Git

> Publish your JVM and Android libraries

Seemed good enough for me: upload my repo to GitHub, and have JitPack build & serve my versions.

The process was fairly simple: 
- create a JitPack account and link it to my GitHub
- create an Android module
- publish the module to a public repository on my GitHub
- create a new release of the repo

Things didn't work at first, so I fiddled with settings in by gradle & `jitpack.yml` until I couldn't figure out why JitPack kept failing to build. I ended up having to peruse tutorials for a fix, and stumbled upon [Mike's Code](https://www.youtube.com/@Mikes-Code)'s video on [publishing to JitPack](https://www.youtube.com/watch?v=6XugK4Sin6w). The answer was kind of un-intuitive, which was that the module had to exist within an Android project. After moving the module into a project & uploading the whole thing to GitHub, the first release built without a hitch.


## Data Store Investigation
The newer [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) provides type safety through [Proto DataStore](https://developer.android.com/codelabs/android-proto-datastore#5), although the base DataStore provides some type checking if you're smart about it.
However, it felt a bit more obtuse at first glance, so I wanted to see if I could quickly put together a similar solution for the basic DataStore as I had done for SharedPreferences.

After getting to the end, I realized that it was sort of pointless: the main benefit was adding serializable class support, but that is already better done with the Proto DataStore.
DataStore already has about the same level of type safety that I added to SharedPreferences; there isn't much more I could add.

That is why I will not be adding it into the main package: while it was neat to take a look at it, it didn't really solve a problem like it did for SharedPreferences. It is much better to just use the Proto DataStore.

My only real gripe with DataStore is that it can't easily be used in Java, although I honestly don't think it's that bad.

The implementation is saved on a dev / investigation branch [here](https://github.com/HubbleCommand/preftils/tree/investigation-data-store).


## [Flutter version](https://github.com/HubbleCommand/preftils_fl)

<details markdown ="1">
<summary>Code<blockquote>Expand if you want to see the original code that was based on the Java and Kotlin versions</blockquote></summary>

```dart
class Preference<T>{
  final String key;
  final T defaultValue;

  Preference(this.key, this.defaultValue);
}

extension Preftils on SharedPreferences {
  static Future<T> get<T>(Preference<T> preference, {T? defaultValue}) {
    return SharedPreferences.getInstance().then((SharedPreferences prefs) {
      switch (preference.defaultValue) {
        case int _: return prefs.getInt(preference.key) as T? ?? defaultValue ?? preference.defaultValue;
        case bool _: return prefs.getBool(preference.key) as T? ?? defaultValue ?? preference.defaultValue;
        case double _: return prefs.getDouble(preference.key) as T? ?? defaultValue ?? preference.defaultValue;
        case String _: return prefs.getString(preference.key) as T? ?? defaultValue ?? preference.defaultValue;
        case List<String> _: return prefs.getStringList(preference.key) as T? ?? defaultValue ?? preference.defaultValue;
      }
      return defaultValue ?? preference.defaultValue;
    });
  }

  static Future<Object> set<T>(Preference<T> preference, T value) {
    return SharedPreferences.getInstance().then((SharedPreferences prefs) {
      switch (preference.defaultValue) {
        case int _:
          return prefs.setInt(preference.key, value as int);
        case bool _:
          return prefs.setBool(preference.key, value as bool);
        case double _:
          return prefs.setDouble(preference.key, value as double);
        case String _:
          return prefs.setString(preference.key, value as String);
        case const (List<String>) :
          return prefs.setStringList(preference.key, value as List<String>);
      }
      return Future<void>;
    });
  }
}
```
</details>

A drawback is that there is no [built-in serialization](https://docs.flutter.dev/data-and-backend/serialization/json) support.
Sure, there's the [json_serializable](https://pub.dev/packages/json_serializable) package, but it's not built-in.
Unfortunately, this isn't even a problem compared to what comes next.

While it is nice that Dart has no [type erasure](https://dart.dev/language/generics), there is one major problem: the concrete type of the generic is not enforced unless explicitely stated in *every* method call.

What do I mean? With my initial implementation similar to the Java and Kotlin versions, I did the following for getting preferences:
```dart
extension Preftils on SharedPreferences {
  static Future<T> get<T>(Preference<T> preference, {T? defaultValue}) {
    return SharedPreferences.getInstance().then((SharedPreferences prefs) {
      switch (preference.defaultValue) {
        case int _: return prefs.getInt(preference.key) as T? ?? defaultValue ?? preference.defaultValue;
    ...
```

Now using this is very easy:
```dart
Preference<int> intpref = Preference("integer", 3);
Preftils.set(intpref, 7);
```

Unlike the Java and Kotlin versions, however, the following ALSO works, although it will lead to a runtime crash:
```dart
Preftils.set(intpref, "a");
```

The only way to enfore the type is to declare the type:
```dart
Preftils.set<int>(intpref, 3);
```

Which is the same as doing the original, and is of no help at all:
```dart
SharedPreferences.setInt("integer", 3)
```

However, all was not lost.
I pondered for a second, and thought that maybe the concrete type of the generic was lost due to the method being an extension on another class.
What would happen if I added the setter & getters directly to the `Preference` class?
There shouldn't be a way for the concrete type to get lost by the class, while we're still in the class, right?

And that's the case!

By changing those functions from being extensions of `SharedPreference` to being members of `Preference`, we keep the concrete type throughout.
You can view it [here](https://github.com/HubbleCommand/preftils_fl/blob/master/lib/preftils.dart).


### Adding serialization support
As with the Java and Kotlin versions, the main strength of such systems comes from serialization of custom classes.

However, here we run into a problem: [Flutter doesn't have serialization](https://docs.flutter.dev/data-and-backend/serialization/json#is-there-a-gsonjacksonmoshi-equivalent-in-flutter) as Flutter [doesn't support reflection](https://docs.flutter.dev/resources/faq#does-flutter-come-with-a-reflection-mirrors-system) (although dart *does*).
The reason given is that it is hard to do tree shaking to remove unused code, however both Android (through Java and Kotlin) and iOS (with Swift) support reflection, so I'm not too sure about that excuse.

Now, dart does have [dart:convert](https://api.dart.dev/stable/3.5.4/dart-convert/dart-convert-library.html), but this isn't class serialization, that's just general serialization. [json_serializable](https://docs.flutter.dev/data-and-backend/serialization/json#setting-up-json_serializable-in-a-project) does exist, but this comes with the same and other issues.

While [source_gen](https://github.com/dart-lang/source_gen) is neat, and might *possibly* be an approach here to generate helper code (which is what the json_serializable package does), we still need a way to know if a class is serializable, which neither of those solutions give.

As we can't use reflection in Flutter (to even check if a class has certain methods), I'm just going back to basics: creating a Codable interface. If you read the colapsed section of my initial Kotlin implementation (why am I asking this, no one reads this anyways), this will seem familiar because it's the exact same approach.

While there are better ways to do it in Kotlin and Java, I am working with the limitations of Flutter now.

So, here it is:
```dart
abstract class Codable {
  String encode();
  Codable decode(String data);
}

class Preference<T>{
  ...
  T getSync(SharedPreferences prefs, {T? defaultValue}) {
    switch (this.defaultValue) {
  ...
      case Codable codable:
        String? pref = prefs.getString(key);
        if (pref == null) { break; }
        try { return codable.decode(pref) as T; }
  ...

  Future<bool> set(T value, {SharedPreferences? prefs}) async {
    SharedPreferences p = prefs ?? await SharedPreferences.getInstance();
    switch (defaultValue) {
  ...
      case Codable codable:
        return p.setString(key, codable.encode());
  ...
```

While not *perfect*, I would prefer `decode` to be static, Dart (and many other languages for that matter) don't allow overriding static methods.
Dart also has [other inheritence funniness](https://github.com/dart-lang/language/issues/1127).

*However*, one could possibly have a factory class to make the codables.
You can read more on Dart factories [here](https://www.joeltok.com/posts/2023-03-dart-abstract-class-factory-method/).
While this may not seem to solve the issue of how to get it statically, the solution is to pass this factory to the Preference class, like so:

```dart
abstract class CodableFactory {
  Codable decode(String data);
}

class Preference<T>{
  final String key;
  final T defaultValue;
  final CodableFactory? decodeFactory;
  ...

  T getSync(SharedPreferences prefs, {T? defaultValue}) {
  switch (this.defaultValue) {
    case Codable codable:
      if (decodeFactory == null) {
        throw CodableException("Pass a CodableFactory to decode your Codable class");
      }
      decodeFactory.decode(string)
      ...
  }
```

However, I'm not really a fan of that.
It's creating a dependency between two otherwise unrelated classes.
It's not a very serious dependency, not just because it's Dependency Injection but also because `Preference` already knows of `Codable`.
Nonetheless, it feels awkward.

Regardless, an instance of the variable is always available to decode with through the default value of the `Preference` class, giving all the more reason to keep it simple.


#### Codable and Dart errors
A final note about the Dart language. If you looked at the implementation of `get`, you'll see it has the following siganture:

```dart
Future<T> get({SharedPreferencesAsync? prefs, T? defaultValue}) async
```

But, it can throw when decoding a Codable:
```dart
try {
  return codable.decode(pref) as T;
} finally {
  throw CodableException("Failed to decode");
}
```

This is an issue I have with Dart itself: any function can throw.
Most other high-level OOP languages, functions that can throw an error should, or in most cases *must* be annotated as throwable.
Dart has no such requirement.
As any function can throw, that means that there is no way to annotate it as such.
I don't particularly like this, but that's just how the language works.


### Supporting `SharedPreferencesAsync/WithCache`
So the last step is looking at `shared_preferences`' new `SharedPreferencesAsync/WithCache` system.
The only difference is that on Android, it uses `DataStore` instead of `SharedPreferences` (there is a section above about the topic).
All the other platforms work the same (as far as I can tell).

So, I created a new type of `Preference` helper class to work with the newer system.
Why a new Preference class for this?
Because the values are stored in different ways, and cannot be retrieved accross these different systems (for all platforms, not just Android).

For more info on this and how to migrate, read [this issue](https://github.com/flutter/flutter/issues/150732).


### Publishing to [pub.dev](pub.dev)
Not much to say here, the [documentation](https://docs.flutter.dev/packages-and-plugins/developing-packages#publish) on the subject is pretty thorough.

The only thing to keep in mind is to [write a good README](https://dart.dev/tools/pub/writing-package-pages#writing-a-good-readme-is-important).
