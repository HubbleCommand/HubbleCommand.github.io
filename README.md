# HubbleCommand.github.io

[![](https://img.shields.io/badge/Visit_Live-0)](https://hubblecommand.github.io)

Repo for my portfolio.

# Running Locally
Install the dependencies, [official Jekyll tutorial here](https://jekyllrb.com/docs/installation/), or from [GitHub](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).

Once you have cloned, run `bundle install` to install the necessary dependencies.

To start the server, run `bundle exec jekyll serve --trace --host=localhost`

Once the server is started, can navigate to : http://localhost:4000/

## Updating dependencies
You can update gems, packages, and other dependencies with `bundle update`.

# Resources
## Jekyll useful
- [includes](https://daverupert.com/2017/07/jekyll-includes-are-cool/)
- [data files](https://jekyllrb.com/docs/datafiles/)
- [Jekyll with Scoop](https://github.com/ScoopInstaller/Scoop/issues/3924)

## [Hacker Theme](https://github.com/pages-themes/hacker)
There's a template to link google analytics, which I've removed, but see [here](https://github.com/pages-themes/hacker#customizing) on how to add it (will also require adding removed files).

## Encountered problems
- Placing images in _posts causes UTF-8 read errors. Putting them in a directory that is not a collection (i.e. /assets) corrects the issue.

## Neat things done
- Dynamic filter: Sort Projects by category. Categories read from all projects dynamically.

## TODO
- [Pagination](https://jekyllrb.com/docs/pagination/)
- Translating, although I don't think it's possible with basic plan Github Pages
- https://github.com/matiassingers/awesome-readme
- https://github.com/jonatasemidio/multilanguage-readme-pattern
- Project Side Bar

		<div class="sidenav">
			{% for project in site.projects %}
				<a href="{{ project.url }}" title="{{ project.title }}">{{ project.title }}</a>
			{% endfor %}
		</div>
