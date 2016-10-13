'use strict';

const glob = require('glob');

class PackageIncludes {
    constructor(serverless, options) {
        this.serverless = serverless;

        this.hooks = {
            'before:deploy:createDeploymentArtifacts': this.addExcludes.bind(this, serverless.cli)
        };
    }

    addExcludes(logger) {
        let includes = this.serverless.service.custom.packageInclude;
        includes = includes instanceof Array ? includes.concat(['**/', 'serverless.yml']) : [];
        if (!includes) {
            return logger.log('Ignoring includes as none specified');
        }

        const filenames = glob.sync("**", {matchBase: true, mark: true, ignore: includes});
        const exclude = this.serverless.service.package.exclude;
        this.serverless.service.package.exclude = exclude instanceof Array ? exclude.concat(filenames) : filenames;

        logger.log('Including specific files by adding ' + filenames.length + ' files/paths to excludes');
    }
}

module.exports = PackageIncludes;
