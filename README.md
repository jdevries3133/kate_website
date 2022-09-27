# TL;DR

There are 3 important commands to interact with the code:

- `make start`: startup the website on http://localhost:8000/
- `make publish`: publish your changes
- `make update`: update your local code to get the latest changes I've
  created (this also happens when you `publish`)

# Development Instructions

## Opening the Code Editor

Open Visual Studio Code like any other app on your computer. It should remember
where you left off and open up your website project by default. If it doesn't,
your website is in a folder titled "website" in your user's home folder. You
just need to open up that folder with VS Code.

VS Code usually opens up a terminal at the bottom where you can run the
commands summarized above and detailed below to interact with the website. You
can always close of minimize the terminal, then bring it back through the
"terminal" dropdown menu. On the left, there's a file browser of all the files
in the project. The files of interest for authoring are all in `/app/mdx`.

## `make start`

To run the site locally run `make start`. You can see the local version of the
website at `http://localhost:8000/`. I already did this on your computer, so
the website should be already running. Look at `http://localhost:8000/blog` to
see the list of blog posts.

## Authoring Content

For authoring posts, look in the `/app/mdx` folder. `firstPost.mdx` is a primer
on how to create posts. You will also need to slightly update
`/app/mdx/index.ts` to publish or unpublish posts. I can help you this, I think
it'll be easy once you get the hang of it. You should start by directly editing
`firstPost.mdx` (just don't change the file name yet!).

Whenever you make a change to a file, changes should appear immediately on the
local website. If it doesn't, try running `make logs` to see the server's
output. If you see an error message, something might be wrong.

## Publishing Content

When you are done making changes, run the `make publish` command in the
terminal to publish your changes. On GitHub, you can check on the publishing
job in the [actions tab](https://github.com/jdevries3133/kate_website/actions)
of the repository. If all goes well, the job should complete successfully, and
your changes will become visible on the public website. The `make publish` does
some fancy stuff behind the scenes on your computer to try to ensure your local
codebase remains in a healthy state, so let me know if something weird happens!

The `make publish` rule will "stash" your changes with git, and later "pop"
them out of the stash. This makes it look like your work is deleted for a
second, but it's not! Even if the job crashes half way through, your changes
will always be in a state that I can recover them with git.

It only takes seconds for your code changes to get pushed to github, but it
then takes around 15 minutes for those changes to become live on your site.
Again, [check the job progress here.](https://github.com/jdevries3133/kate_website/actions)
