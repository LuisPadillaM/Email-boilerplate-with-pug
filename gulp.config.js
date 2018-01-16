const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const $ = require("gulp-load-plugins")({lazy: true});

module.exports = function(args) {
  function Config() {

    this.src = "/src/";
    this.dest = "./dist/";
    this.index = `.${this.src}index.pug`;
    this.email_src = `${this.src}emails/`;
    this.pug_w = ['src/layout/*.pug','src/emails/**/*.pug']
    this.zip_path = "./dist"
    this.pkg_json = JSON.parse(fs.readFileSync(`${__dirname}/package.json`, 'utf8'));
    this.remote_conf = `${__dirname}/.ftppass`;
    this.remote_d = (fs.existsSync(this.remote_conf)) ? JSON.parse(fs.readFileSync(this.remote_conf, 'utf8')) : null;
    this.ftp_info = (this.remote_d) ? this.remote_d.ftp : null;
    this.email_d = (this.remote_d) ? this.remote_d.email : null;

    this.img = {
      in: `.${this.email_src}**/img/**/*.{png,gif,jpg}`,
      out: `${this.dest}`
    };

    this.crendentialsPath = "./config.json";

    this.litmus = {
      in: `${this.dest}/**/*.html`,
      out: `${this.dest}`
    }

    this.aws = {
      in: `${this.dest}**/img/**/*.{png,gif,jpg}`
    }

    this.ftp = (this.remote_d) ? {
            //default title is set to same name as package.json
            stagingFolder: this.ftp_info.remotePath + this.pkg_json.name,
            host: this.ftp_info.host,
            port: this.ftp_info.port,
            user: this.ftp_info.user,
            pass: this.ftp_info.pass,

    } : null;

    this.email = (this.remote_d) ? {
            //send-mail credentials
            mailType: this.email_d.mailType,
            mailService: this.email_d.mailService,
            mailUsername: this.email_d.user,
            mailPassword: this.email_d.pass
    } : null;

    this.server = {
      host: "localhost",
      port: "8001",
      root: this.dest
    };

    this.helpers = {
        changeMsg: (event) => {
            const srcPatter = new RegExp(`/.*(?=${this.src.replace("/\//g", "\/")})/`);
            $.util.log(`File ${ $.util.colors.blue(event.path.replace(srcPatter, "")) }  ${ event.type }`);
        },

        getFolders: (dirname) => {
          return fs.readdirSync(dirname)
          .filter(function(file) {
              return fs.statSync(path.join(dirname, file)).isDirectory();
          });
        },

        loadFile: (path) => {

          let file = null;

          if(fs.existsSync(path)){
            file = JSON.parse(fs.readFileSync(path));
          }

          return file;
        },

        loadCredentials: (path) => {

          let configFile = this.helpers.loadFile(this.crendentialsPath);

          if(configFile){
            $.util.log($.util.colors.green("Credentails file was loaded"));
          }else{
            $.util.log($.util.colors.yellow("No credentails file was found"));
          }

          return configFile;
        }
    }
  }

  const config = new Config();

  return config;

};
