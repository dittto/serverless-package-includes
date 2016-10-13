# Serverless package includes

Lambda is all about speed. Each time you need to restart a container for Lambda to run on, the codebase has to be copied to it, so there are quantifiable benefits of having the smallest codebase possible.

This plugin allows you to specify a list of filenames that will only be included in your zip file. The filenames are specified as globs (https://github.com/isaacs/node-glob).

So far, with simple projects, it's been saving approximately 40% of the filesize of the zip file.


## How to use

First up, add this plugin to your project:

```
npm install --save dittto/serverless-package-includes
```

Add the following, or similar, to your `serverless.yml` file:

```
custom:
  packageInclude:
    - '**/*.js'
    - '**/*.json'

plugins:
  - serverless-package-includes
```

The above means that only *.js and *.json files in any folder will be included in your zip. No more overly large README.md's, and no project logos!

You can also choose to exclude included files, as the include is applied first, for instance:

```
custom:
  packageInclude:
    - '**/*.js'
package:
  exclude:
    - 'secret.js'
```

## TODO

- Add tests
- Add linting
- Setup Travis
- Publish to NPM
