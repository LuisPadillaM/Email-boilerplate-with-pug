const args = require("yargs").argv;
const {img} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {
    return gulp.src(img.in)
    .pipe($.imagemin())
    .pipe(gulp.dest(img.out))
  }
};
