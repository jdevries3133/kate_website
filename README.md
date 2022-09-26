# Development Instructions

To run the site locally run `make develop`. It may take a few moments, but this
will spin up the site from scratch. You can see the local version of the
website at `http://localhost:8000`.

For authoring posts, look in the `/app/mdx` folder. `firstPost.mdx` is a primer
on how to create posts. You will also need to slightly update
`/app/mdx/index.ts` to publish or unpublish posts.

Whenever you make a change to a file, changes should appear immediately on the
local website. If it doesn't, try running `make logs` to see the server's
output. If you see an error message, something might be wrong.

When you are done making changes, run `make publish` to publish your changes.
On GitHub, you can check on the publishing job in the [actions
tab](https://github.com/jdevries3133/kate_website/actions) of the code
repository. If all goes well, the job should complete successfully, and your
changes will become visible on the public website.
