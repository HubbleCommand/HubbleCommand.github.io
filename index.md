---
layout: default
title: Home
---


# Hubble

[![](https://img.shields.io/badge/Visit_repo-0)](https://github.com/HubbleCommand/HubbleCommand.github.io)

IT dude. Does much IT!

This Github Pages is a mix of a portfolio / blog and some tutorials, just my general exploits. It's my personal notepad for things I think may prove useful to others, or at least to provide tracability for myself.

Prepare for ramblings

## Active Projects

<table style="table-layout: fixed">
    <tbody>
        <tr>
            <th>
                <a href="{{ site.url }}{{ site.baseurl }}{% link _projects/preftil.md %}">Preftil</a>
                <a>
                    {% assign preftil_icons="android,kotlin" | split: "," %}
                    {% include /components/devicon.html icons=preftil_icons %}
                </a>
            </th>
            <th>
                <img alt="Static Badge" src="https://jitpack.io/v/HubbleCommand/preftils.svg">
                <img alt="Static Badge" src="https://jitpack.io/v/HubbleCommand/preftils/month.svg">
                <img alt="Static Badge" src="https://img.shields.io/github/license/HubbleCommand/preftils.svg?color=blue">
            </th>
        </tr>
        <tr>
            <th>
                <a href="{{ site.url }}{{ site.baseurl }}{% link _projects/vsc-ext-run.md %}">Run</a>
                <a>
                    {% assign run_icons="vscode,javascript,typescript" | split: "," %}
                    {% include /components/devicon.html icons=run_icons %}
                </a>
            </th>
            <th>
                <img alt="Static Badge" src="https://img.shields.io/vscode-marketplace/v/hcommand.run-runner.svg">
                <img alt="Static Badge" src="https://img.shields.io/vscode-marketplace/d/hcommand.run-runner.svg">
                <img alt="Static Badge" src="https://img.shields.io/vscode-marketplace/r/hcommand.run-runner.svg">
                <img alt="Static Badge" src="https://img.shields.io/github/license/hubblecommand/run.svg?color=blue">
            </th>
        </tr>
    </tbody>
</table>
