var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // this.argument("appname", {
    //   type: String,
    //   required: true
    // })

    // this.log('this.options.appname', this.options.appname)
    // this.option('babel');
    // this.helperMethod = function() {
    //   console.log('won\'t be called automatically')
    // }
  }

  

  // installingLodash() {
  //   this.addDevDependencies({lodash: '4.17.21'});
  // }
  // async prompting() {
  //   this.dependency = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Would you like to enable the Cool feature"
  //     }
  //   ])
  // }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "title",
        message: "Your project title"
      }
    ])
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answers.title }
    );
  }
  // writing() {
  //   const pkgJson = {
  //     dependencies: {
  //       [this.dependency.name]: '*'
  //     }
  //   };

  //   // Extend or create package.json file in destination path
  //   this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  // }

  // install() {
  //   this.npmInstall();
  // }

  // method1() {
  //   this.log('method 1 just ran')
  // }

  // method2() {
  //   this.log('method 2 just ran')
  // }

  // _private_method() {
  //   this.log("private key")
  // }
  // async prompting() {
    // this.answers = await this.prompt([
    //   // {
    //   //   type: 'input',
    //   //   name: 'name',
    //   //   message: 'Your project name',
    //   //   default: this.appname
    //   // },
    //   {
    //     type: 'confirm',
    //     name: 'cool',
    //     message: 'Would you like to enable the Cool feature'
    //   }
    // ])

    // this.log("app name", answers.name)
    // this.log("cool feature", answers.cool)
  // }

  // writing() {
  //   this.log("cool feature", this.answers.cool)
  // }
};                                 