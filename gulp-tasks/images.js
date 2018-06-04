module.exports =  ({gulp, $, config}) =>  gulp.src(config.img.in)
  .pipe($.imagemin())
  .pipe(gulp.dest(config.img.out));
