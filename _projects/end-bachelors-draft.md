---
layout: project
title: "End of Bachelor's Research Project"
date: 2020-09-15
categories: ["Traffic Management"]
programming-languages: ["Java", "NodeJS"]
start-date : 2020-04-01
end-date : 2020-09-03
---

<h2>Intro</h2>

<div class="para">
    The last part of my bachelor's was a research project. I chose to research traffic management systems, as I live in the suburbs and the 20 minute commute to Uni can be 40 to 50 minutes with traffic.
</div>
<div class="para">
    After having done some research into existing solutions, I decided to look into the effects of a reservation-based ITS on traffic congestion and travel times.
</div>
<div class="para">
    The reservation approach, to me, seemed like the most intruiging solution : possibility for being fully proactive and acheiving a optimal resource allocation of roads.
</div>
<div class="para">
    MATSim was chosen to run the simulations, as out of all the tools considered it was very mature, very extensible, very free. An external tool recommended by William Charlton called matsim-tools was used to run additional analysis (differences in vehicles flows between different simulations, and calculating hourly congestion ratios), and whose development is being continued by me.
</div>
<div class="para">
    The results of the MATSim simulation are quite promising. With only a simple reservation solution (first come first served), it was able to reduce congestion by amounts comparable to other solutions proposed in literature. However with a more advanced system that does temporal multiplexing, the effects could be far greater.
</div>
<div class="para">
    Here are the repositories for the project.
</div>

<div>
    <table>
        <tr>
            <td>The main repository for the project</td>
            <td><a href="https://gitlab.unige.ch/Sasha.Poirier-Wettstein/projet-de-recherche-fin-de-bachelor-traffic">https://gitlab.unige.ch/Sasha.Poirier-Wettstein/projet-de-recherche-fin-de-bachelor-traffic</a></td>
        </tr>
        <tr>
            <td>The Python visualisation & congestion ratio calculator</td>
            <td><a href="https://github.com/HubbleCommand/matsim-py-vis">https://github.com/HubbleCommand/matsim-py-vis</a></td>
        </tr>
        <tr>
            <td>The MATSim population generator</td>
            <td><a href="https://github.com/HubbleCommand/node-matsim-population-generator">https://github.com/HubbleCommand/node-matsim-population-generator</a></td>
        </tr>
        <tr>
            <td>My  Java MATSim modules</td>
            <td><a href="https://github.com/HubbleCommand/matsim-example-project">https://github.com/HubbleCommand/matsim-example-project</a></td>
        </tr>
    </table>
</div>
