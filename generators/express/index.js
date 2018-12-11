'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = opts || {};
  }

  prompting() {
    this.log(yosay(
      `Welcome to the ${chalk.red('Express')} ${chalk.green('Yeoman generator')}`
    ));

    let prompts = [{
      type: 'string',
      name: 'system',
      message: 'The name of the application that you are adding this API to'
    }, {
      type: 'string',
      name: 'component',
      message: 'The name of the component that you are adding',
      default: 'api'
    }, {
      type: 'string',
      name: 'gitaccount',
      message: 'Please enter your github account'
    }, {
      type: 'string',
      name: 'author',
      message: 'Please enter your name or the name of the author'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {...this.props, ...props};
      this.destinationRoot(this.props.component);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('base_template/src/app/shared/logger.ts.ejs'),
      this.destinationPath(`src/app/shared/logger.ts`),
      {props: this.props}
    );

    this.fs.copyTpl(
      this.templatePath('base_template/src/app/shared/metrics.ts.ejs'),
      this.destinationPath(`src/app/shared/metrics.ts`),
      {props: this.props}
    );

    this.fs.copy(
      this.templatePath('base_template/src/app/main.ts'),
      this.destinationPath(`src/app/main.ts`)
    );

    this.fs.copyTpl(
      this.templatePath('base_template/src/app/server.ts.ejs'),
      this.destinationPath(`src/app/server.ts`),
      {props: this.props}
    );

    this.fs.copy(
      this.templatePath('base_template/**/!(*.ejs)*'),
      this.destinationPath(`./`)
    );

    this.fs.copyTpl(
      this.templatePath('base_template/.env.sample.ejs'),
      this.destinationPath(`.env.sample`),
      {props: this.props}
    );

    this.fs.copyTpl(
      this.templatePath('base_template/package.json.ejs'),
      this.destinationPath(`package.json`),
      {props: this.props}
    );

    this.fs.copyTpl(
      this.templatePath('base_template/docker-compose.yaml.ejs'),
      this.destinationPath(`docker-compose.yaml`),
      {props: this.props}
    );

    // This.fs.copyTpl(
    //   this.templatePath('base_template/readme.md.ejs'),
    //   this.destinationPath(`readme.md`),
    //   {props: this.props}
    // );

    this.props.genLocation = '..';
    this.composeWith(require.resolve('../gen'), this.props);

    this.fs.delete(
      this.destinationPath('*.ejs')
    );
  }

  installing() {
    this.npmInstall();
  }
};
