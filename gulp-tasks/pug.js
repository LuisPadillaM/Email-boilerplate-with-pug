const juice = require("@thasmo/gulp-juice");
const path = require("path");
const fs = require("fs");

module.exports =   ({ gulp, $, reload, config }) => {
  const {emailSrc, dest} = config;
  let currenPath = "";
  return gulp.src(`.${emailSrc}**/index.pug`)
    .pipe($.data((file) => {
      currenPath = path.resolve(__dirname, path.dirname(file.path));
      const data = `${currenPath}/data.json`;
      if (fs.existsSync(data)) {
        return JSON.parse(fs.readFileSync(data));
      }
    }))
    .pipe($.pug({basedir : "src"}))
    .pipe(juice({
      includeResources     : true,
      removeStyleTags      : false,
      preserveMediaQueries : true,
      webResources         : { links : true, scripts : false, images : false, relativeTo : "."},
    }))
    .pipe(gulp.dest(dest))
    .pipe(reload({stream : true}));
};
