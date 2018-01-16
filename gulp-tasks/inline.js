const juice = require('@thasmo/gulp-juice');
const args = require("yargs").argv;
const {email_src, zip_path, helpers} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {
    return gulp.src("dist/**/index.html")
    .pipe(juice({
      includeResources:true,
      removeStyleTags:false,
      preserveMediaQueries: true,
      webResources:{ links:true, scripts:false, images:false, relativeTo: "."}
    }))
    .pipe(gulp.dest("dist"))
  }
};
