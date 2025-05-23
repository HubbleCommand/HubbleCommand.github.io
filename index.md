---
layout: default
title: Home
---


# Hubble

[![](https://img.shields.io/badge/Visit_repo-0)](https://github.com/HubbleCommand/HubbleCommand.github.io)
[![LeetCode user HubbleCommand](https://img.shields.io/badge/dynamic/json?style=flat&labelColor=black&color=%23ffa116&label=Solved&query=solvedOverTotal&url=https%3A%2F%2Fleetcode-badge.vercel.app%2Fapi%2Fusers%2FHubbleCommand&logo=leetcode&logoColor=yellow)](https://leetcode.com/HubbleCommand/)

IT dude. Does much IT!

This Github Pages is a mix of a portfolio / blog and some tutorials, just my general exploits. It's my personal notepad for things I think may prove useful to others, or at least to provide tracability for myself.

Prepare for ramblings

## Active Projects

<table style="table-layout: fixed">
    <tbody>
        <tr>
            <th>
                <a href="{{ site.url }}{{ site.baseurl }}{% link _projects/vsc-ext-run.md %}">Run</a>
                <a>
                    {% assign run_icons="vscode,javascript,typescript" | split: "," %}
                    {% include /components/devicon.html icons=run_icons %}
                </a>
            </th>
            <th>
                <a href="https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner">
                    <img alt="Static Badge" src="https://img.shields.io/vscode-marketplace/v/hcommand.run-runner.svg"></a>
                <a href="https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner">
                    <img alt="Static Badge" src="https://img.shields.io/vscode-marketplace/d/hcommand.run-runner.svg"></a>
                <a href="https://marketplace.visualstudio.com/items?itemName=hcommand.run-runner">
                    <img alt="Static Badge" src="https://img.shields.io/vscode-marketplace/r/hcommand.run-runner.svg"></a>
                <a href="https://github.com/hubblecommand/run/blob/master/LICENSE">
                    <img alt="Static Badge" src="https://img.shields.io/github/license/hubblecommand/run.svg?color=blue"></a>
            </th>
        </tr>
        <tr>
            <th>
                <a href="{{ site.url }}{{ site.baseurl }}{% link _projects/preftils.md %}">Preftil</a>
                <a>
                    {% assign preftil_icons="android,kotlin,java,flutter,dart" | split: "," %}
                    {% include /components/devicon.html icons=preftil_icons %}
                </a>
            </th>
            <th>
                <a href="https://github.com/hubblecommand/preftils/blob/master/LICENSE">
                    <img alt="Static Badge" src="https://img.shields.io/github/license/HubbleCommand/preftils.svg?color=blue"></a>
                <a href="https://jitpack.io/#hubblecommand/preftils">
                    <img alt="Static Badge" src="https://jitpack.io/v/HubbleCommand/preftils.svg"></a>
                <a href="https://jitpack.io/#hubblecommand/preftils">
                    <img alt="Static Badge" src="https://jitpack.io/v/HubbleCommand/preftils/month.svg"></a>
            </th>
        </tr>
    </tbody>
</table>


## My repos that have been starred

<script src="/assets/js/repo_stars.js"></script>

<div style="display: grid; grid-template-columns: auto auto;" id="repo-stars"></div>

## Repos I've starred

<div style="display: grid; grid-template-columns: auto auto auto;" id="starred-repos"></div>
