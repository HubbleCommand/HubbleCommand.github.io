---
layout: post
title: "Building Godot"
date: 2024-01-09
last_modified_at: 2024-06-05
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
