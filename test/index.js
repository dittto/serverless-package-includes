'use strict';

const expect = require('chai').expect;
const PackageIncludes = require('../index');

describe('serverless_package_includes', function () {
    let serverless, logger, glob;

    beforeEach(function () {
        // init basic serverless config
        this.serverless = {
            service: {
                custom: {
                    packageInclude: [
                        '**/*.js',
                        '**/*.json'
                    ]
                },
                package: {
                    exclude: {}
                }
            }
        };

        // init logger
        this.logger = {
            messages: [],
            log: function (message) {
                this.messages[this.messages.length] = message;
            }
        };

        // init glob
        this.glob = {
            options: [],
            sync: function (path, options) {
                this.options = options;
                return ['test_path_1', 'test_path_2'];
            }
        };
    });

    it('Should init with specified hooks', function () {
        const includes = new PackageIncludes({}, []);
        const hookNames = Object.keys(includes.hooks);
        expect(hookNames).to.have.same.members(['before:deploy:createDeploymentArtifacts', 'before:deploy:function:deploy']);
    });

    it('Handles empty excludes and valid includes', function () {
        // run includes
        const includes = new PackageIncludes(this.serverless, []);
        includes.addExcludes(this.logger, this.glob);

        // check glob options have correct existing excludes and includes, and defaults
        expect(this.glob.options.ignore).to.have.same.members(['**/*.js', '**/*.json', '**/', 'serverless.yml']);

        // check excludes are the result of the glob
        expect(includes.serverless.service.package.exclude).to.have.same.members(['test_path_1', 'test_path_2']);

        // check logger message is correct
        expect(this.logger.messages).to.have.same.members(['Including specific files by adding 2 files/paths to excludes']);
    });

    it ('Appends set excludes on to chosen includes', function () {
        // add excludes to config
        this.serverless.service.package.exclude = ['one', 'two'];

        // run includes
        const includes = new PackageIncludes(this.serverless, []);
        includes.addExcludes(this.logger, this.glob);

        // check glob options have correct existing excludes and includes, and defaults
        expect(this.glob.options.ignore).to.have.same.members(['**/*.js', '**/*.json', '**/', 'serverless.yml', 'one', 'two']);
    });

    it('Drops out when no includes have been set', function () {
        // remove all includes
        this.serverless.service.custom.packageInclude = null;

        // run includes
        const includes = new PackageIncludes(this.serverless, []);
        includes.addExcludes(this.logger, this.glob);

        // check logger message is correct
        expect(this.logger.messages).to.have.same.members(['Ignoring includes as none specified']);
    });
});
