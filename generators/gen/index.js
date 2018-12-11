const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = opts || {};
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.gen.ejs'),
      this.destinationPath(`${this.props.genLocation}/.gen`),
      {props: this.props}
    );
  }
};
