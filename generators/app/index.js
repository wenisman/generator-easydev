'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const GENERATOR_VERSION = '0.0.1';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('generatorType', {
      type: String,
      required: true,
      default: 'express',
      desc: 'The type of generator to run [ express ]'
    });
  }

  initialzing() {
    try {
      this.props = {genVersion: GENERATOR_VERSION};

      this.composeWith(require.resolve(`../${this.options.generatorType}`), this.props);
      this.validGenerator = true;
    } catch (err) {
      console.log(err);
      // Might as well be explicit
      this.validGenerator = false;
    }
  }

  install() {
    this.npmInstall();
  }

  end() {
    // Only show this if the generator exited cleanly
    if (this.validGenerator) {
      this.log(yosay(
        `Generator ${chalk.magenta(this.options.generatorType)} is complete, you're welcome :)`
      ));
    } else {
      this.log(yosay(
        `We could not load the ${chalk.magenta(this.options.generatorType)} Generator. Please check the name and try again.`
      ));
    }
  }
};
