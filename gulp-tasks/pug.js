const juice = require('@thasmo/gulp-juice');
const args = require("yargs").argv;
const {email_src, dest} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {

    let c_path = "";
    return gulp.src(`.${email_src}**/index.pug`)
    .pipe($.data((file) => {
      c_path = path.relative(__dirname, path.dirname(file.path));
      let data = `./${c_path}/data.json`;
      if(fs.existsSync(data)){
        return JSON.parse(fs.readFileSync(data));
      }
    }))
    .pipe($.pug({basedir: "src"}))
    .pipe(juice({
      includeResources:true,
      removeStyleTags:false,
      preserveMediaQueries: true,
      webResources:{ links:true, scripts:false, images:false, relativeTo: "."}
    }))
    .pipe(gulp.dest(dest))
    .pipe(reload({stream: true}))

  }
};
