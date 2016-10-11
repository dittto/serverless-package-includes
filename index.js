'use strict';

const glob = require('glob');

class PackageIncludes {
    constructor(serverless, options) {
        this.serverless = serverless;

        this.hooks = {
            'before:deploy:createDeploymentArtifacts': this.addExcludes.bind(this)
        };
    }

    addExcludes() {
        let includes = this.serverless.service.package.include;
        includes = includes.concat(['**/', 'serverless.yml']);

        const filenames = glob.sync("**", {matchBase: true, mark: true, ignore: includes});
        const exclude = this.serverless.service.package.exclude;
        this.serverless.service.package.exclude = !exclude ? filenames : exclude.concat(filenames);
    }
}

module.exports = PackageIncludes;
