const fs = require("fs");
const path = require("path");
const $ = require("gulp-load-plugins")({lazy : true});

module.exports = function () {
  function Config () {
    this.src = "/src/";
    this.dest = "./dist/";
    this.index = `.${this.src}index.pug`;
    this.emailSrc = `${this.src}emails/`;
    this.awsTemplates = `${this.src}aws-templates/`;
    this.pug_w = ["src/layout/*.pug", "src/emails/**/*.pug"];
    this.zipPath = "./dist";
    this.pkg_json = JSON.parse(fs.readFileSync(`${__dirname}/package.json`, "utf8"));
    this.remote_conf = `${__dirname}/.ftppass`;
    this.remote_d = (fs.existsSync(this.remote_conf)) ? JSON.parse(fs.readFileSync(this.remote_conf, "utf8")) : null;
    this.ftp_info = (this.remote_d) ? this.remote_d.ftp : null;
    this.email_d = (this.remote_d) ? this.remote_d.email : null;

    this.img = {
      in  : `.${this.emailSrc}**/img/**/*.{png,gif,jpg}`,
      out : `${this.dest}`,
    };

    this.crendentialsPath = "./config.json";

    this.litmus = {
      in  : `${this.dest}/**/*.html`,
      out : `${this.dest}`,
    };

    this.aws = {
      in : `${this.dest}**/img/**/*.{png,gif,jpg}`,
    };

    this.ftp = (this.remote_d) ? {
      // Default title is set to same name as package.json
      stagingFolder : this.ftp_info.remotePath + this.pkg_json.name,
      host          : this.ftp_info.host,
      port          : this.ftp_info.port,
      user          : this.ftp_info.user,
      pass          : this.ftp_info.pass,

    } : null;

    this.email = (this.remote_d) ? {
      // Send-mail credentials
      mailType     : this.email_d.mailType,
      mailService  : this.email_d.mailService,
      mailUsername : this.email_d.user,
      mailPassword : this.email_d.pass,
    } : null;

    this.server = {
      host : "localhost",
      port : "8001",
      root : this.dest,
    };

    this.helpers = {
      changeMsg : (event) => {
        const srcPatter = new RegExp(`/.*(?=${this.src.replace("/\//g", "\/")})/`);
        $.util.log(`File ${ $.util.colors.blue(event.path.replace(srcPatter, "")) }  ${ event.type }`);
      },

      getFolders : (dirname) => {
        return fs.readdirSync(dirname)
          .filter(function (file) {
            return fs.statSync(path.join(dirname, file)).isDirectory();
          });
      },

      // List all files in a directory in Node.js recursively in a synchronous fashion
      walkSync : (dir, filelist) => {
        const files = fs.readdirSync(dir);
        filelist = filelist || []; // eslint-disable-line no-param-reassign
        files.forEach( (file) => {
          if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist); // eslint-disable-line no-param-reassign
          } else {
            filelist.push(file);
          }
        });
        return filelist;
      },

      loadFile : (pathName) => {
        let file = null;

        if (fs.existsSync(path)) {
          file = JSON.parse(fs.readFileSync(pathName));
        }

        return file;
      },

      loadCredentials : () => {
        const configFile = this.helpers.loadFile(this.crendentialsPath);

        if (configFile) {
          $.util.log($.util.colors.green("Credentails file was loaded"));
        } else {
          $.util.log($.util.colors.yellow("No credentails file was found"));
        }

        return configFile;
      },
    };
  }

  const config = new Config();

  return config;
};
