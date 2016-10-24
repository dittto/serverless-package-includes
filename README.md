# Serverless package includes

Lambda is all about speed. Each time you need to restart a container for Lambda to run on, the codebase has to be copied to it, so there are quantifiable benefits of having the smallest codebase possible.

This plugin allows you to specify a list of filenames that will only be included in your zip file. The filenames are specified as globs (https://github.com/isaacs/node-glob).

So far, with simple projects, it's been saving approximately 40% of the filesize of the zip file.

[![Build Status](https://travis-ci.org/dittto/serverless-package-includes.svg?branch=master)](https://travis-ci.org/dittto/serverless-package-includes) [![Coverage Status](https://coveralls.io/repos/github/dittto/serverless-package-includes/badge.svg)](https://coveralls.io/github/dittto/serverless-package-includes) [![npm](https://badge.fury.io/js/serverless-package-includes.svg)](https://www.npmjs.com/package/serverless-package-includes)

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

## Testing

To run test locally, checkout this package and run the following commands:

```
npm install
npm test
```

.
