---
layout: post
title: "Building Godot"
date: 2024-01-09
last_modified_at: 2024-10-25
---

After a good two years of planning to make some contributions to Godot, I've finally gotten around to doing it.

> If it could not be more obvious, life has gotten in the way once again. I had originally started writing this at the start of 2024, and now six months later, after being flummuxed by a stream of bs, am going to publish it. My contributions to Godot and other projects, however, will be delayed by about a month.

> I had originally started this post due to my intention to make some contributions to the documentation, but seeing that they've been done already, I'll continue with my normal ramblings.

## Building the [Documentation](https://github.com/godotengine/godot-docs)

You can easily install sphinx [by following this](https://www.sphinx-doc.org/en/master/usage/installation.html#windows). If you install Godot's build systems stuff with [scoop](https://scoop.sh/), you also get python, meaning that you can just run

`pip install -U sphinx`

You also need to install [setuptools](https://pypi.org/project/setuptools/) with `pip install setuptools`

Then you need to install the dependencies in the `requirements.txt` with `pip install -r ./requirements.txt`

After that, you should be able to build the documents. If you want to build all of it, you can run something like `sphinx-build ./ ./_build`. If you want to build only specific files, you can run something like `sphinx-build ./ ./_build ./contributing/development/configuring_an_ide/visual_studio_code.rst`

I was originally going to contribute some improvements to the [godot-docs repo](https://github.com/godotengine/godot-docs) at the start of the year but I didn't have time. By the time I went to update my fork, I saw that [someone had already added](https://github.com/godotengine/godot-docs/commit/cf54259ff05e47f0edd5e329d32584f230a36880) most of what I had wanted regarding VSCode build & intellisense configuration.

<!---
.. tip::

    On Windows, if you have Intellisense warnings or errors about headers (such as missing ``<alloca.h>``), it may be that VS Code intellisense is reading headers outside of the Windows platform.

    To fix this, you should configure the CPP properties to point towards the windows platform folder.


    - Press :kbd:`Ctrl + Shift + P` to open the command prompt window and enter *Edit Configurations*.
    - Select the **C/C++: Edit Configurations (JSON)** option. This should create or open ``.vscode/c_cpp_properties.json``.

    .. figure:: img/vscode_cpp_configuration_commandprompt.png
      :figclass: figure-w480
      :align: center

    - Add ``"${workspaceFolder}/platform/windows"`` to the ``"includePath"`` section.

    .. code-block::
      {
        "includePath": [
          "${workspaceFolder}/**",
          "${workspaceFolder}/platform/windows"
        ],
      }
    File example:

    .. figure:: img/vscode_cpp_configuration_sample.png
      :figclass: figure-w480
      :align: center

    ..
      https://github.com/godotengine/godot/issues/42330
      https://godotforums.org/d/32805-godot-sourcecode-in-visual-code-gives-soft-errors
      fix in 
      https://github.com/microsoft/vscode-cpptools/issues/7742
--->


## Building the [Engine](https://github.com/godotengine/godot)

To build for Windows, the best place to start is [the documentation](https://docs.godotengine.org/en/stable/contributing/development/compiling/compiling_for_windows.html). I prefer using VSCode, and the [relevant page](https://docs.godotengine.org/en/stable/contributing/development/configuring_an_ide/visual_studio_code.html) is now also very good. Make sure that the properties in `c_cpp_properties.json` correspond to the compiler you are using (i.e. use `msvc`, `gcc`, etc).

[Scoop](https://scoop.sh/) is the easiest way to setup the build system by far, and has a plethora of other things to simplify downloading and managing tools (i.e. Jekyll). It installs python, jekyll, g++...

Recently, using the `dev_build=yes` option causes the build to not be able to run on the targeted platform. Simply remove it from `tasks.json` for now, and make sure to make the corresponding name change in `launch.json` (remove `dev` from the `program` name).

To follow the [engine c++ style guides](https://docs.godotengine.org/en/stable/contributing/development/code_style_guidelines.html), it is recommended to use `clang-format`
Go to the [latest llvm release](https://github.com/llvm/llvm-project/releases), download the build for your platform (i.e. `clang+llvm-x-x86_64-pc-windows-msvc.tar.xz` for windows), extract, and take the clang-format.exe file and add it to your `PATH`.

<details markdown="1">
<summary>tasks.json</summary>
```
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "echo",
            "type": "shell",
            "command": "echo Hello"
        },
        {
            "label": "build",
            "group": "build",
            "type": "shell",
            "command": "scons",
            "args": [
              // enable for debugging with breakpoints
              //"dev_build=yes",    //enabling devbuild for some reason breaks platform
              "compiledb=yes",
              "-j4",
              "platform=windows",
              "tests=yes",
              //"dev_mode=yes" //https://docs.godotengine.org/en/stable/contributing/development/core_and_modules/unit_testing.html#running-tests
              //"werror=yes" //It's erroring out on stuff that isn't mine, great
            ],
            "problemMatcher": "$msCompile"
        },
    ]
}
```
</details>

<details markdown="1">
<summary>launch.json</summary>
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Project",
            "type": "cppvsdbg",
            "request": "launch",
            "program": "${workspaceFolder}/bin/godot.windows.editor.x86_64.exe",
            //"program": "${workspaceFolder}/bin/godot.windows.editor.dev.x86_64.exe",
            // Change the arguments below for the project you want to test with.
            // To run the project instead of editing it, remove the "--editor" argument.
            "args": [ "--editor", "--path", "${workspaceFolder}/../godot-custom-playground/" ],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "console": "internalConsole",
            "visualizerFile": "${workspaceFolder}/platform/windows/godot.natvis",
            "preLaunchTask": "build"
        },
        {
            "name": "Run Tests",
            "type": "cppvsdbg",
            "request": "launch",
            "program": "${workspaceFolder}/bin/godot.windows.editor.x86_64.console.exe",
            "args": [ 
                "--test",
                "-ns",  //Don't skip
                "-s",   //not really needed... print on success
                "-d",   //Print duration, avoids having to do own performance timing code
                "--test-case=*[Image]*"
            ],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "console": "internalConsole",   //Test results will be printed to the debug console
            "visualizerFile": "${workspaceFolder}/platform/windows/godot.natvis",
            "preLaunchTask": "build"
          }
    ]
}
```
</details>

<details markdown="1">
<summary>c_cpp_properties.json</summary>
```
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**",
                "${workspaceFolder}/platform/windows"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE",
                "TOOLS_ENABLED",
                "DEBUG_ENABLED",
                "TESTS_ENABLED"
              ],
              "windowsSdkVersion": "10.0.22621.0",
              "compilerPath": 
              "compilerPath": "full/path/to/scoop\\apps\\mingw\\current\\bin\\gcc.exe",
              "cStandard": "c17",
              "cppStandard": "gnu++17",
              "intelliSenseMode": "windows-gcc-x64"
        }
    ],
    "version": 4
}
```
</details>