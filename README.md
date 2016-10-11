# Serverless package includes

Lambda is all about speed. Each time you need to restart a container for Lambda to run on, the codebase has to be copied to it, so there are quantifiable benefits of having the smallest codebase possible.

This plugin allows you to specify a list of filenames that will only be included in your zip file. The filenames are specified as globs (https://github.com/isaacs/node-glob).

So far, with simple projects, it's been saving approximately 40% of the filesize of the zip file.


## How to use

Add the following, or similar, to your `serverless.yml` file:

```
package:
  include:
    - '**/*.js'
    - '**/*.json'
```

The above means that only *.js and *.json files in any folder will be included in your zip. No more overly large README.md's, and no project logos!

## TODO

- Add tests
- Add linting
- Setup Travis
- Publish to NPM
