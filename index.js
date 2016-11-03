'use strict';

const glob = require('glob');

class PackageIncludes {
    constructor(serverless, options) {
        this.serverless = serverless;

    this.hooks = {
            'before:deploy:createDeploymentArtifacts': this.addExcludes.bind(this, serverless.cli, glob),
            'before:deploy:function:deploy': this.addExcludes.bind(this, serverless.cli, glob)
        };
    }

    addExcludes(logger, glob) {
        // get the current excludes
        let excludes = this.serverless.service.package.exclude;
        excludes = excludes instanceof Array ? excludes : [];

        // get the includes from the config
        let includes = this.serverless.service.custom.packageInclude;
        includes = includes instanceof Array ? includes.concat(['**/', 'serverless.yml']) : [];
        if (includes.length === 0) {
            return logger.log('Ignoring includes as none specified');
        }

        // get filenames that haven't already been excluded and we don't want to include then add them as excluded
        const filenames = glob.sync("**", {matchBase: true, mark: true, ignore: excludes.concat(includes)});
        this.serverless.service.package.exclude = excludes.concat(filenames);

        logger.log('Including specific files by adding ' + filenames.length + ' files/paths to excludes');
    }
}

module.exports = PackageIncludes;
