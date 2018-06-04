
module.exports =  ({ gulp, $, config }) => gulp.src(`${config.dest}/**/index.html`)
  .pipe($.htmlmin({ collapseWhitespace : true}))
  .pipe($.htmlhint({htmlhintrc : ".htmlhintrc"}))
  .pipe($.htmlhint.reporter())
  .pipe(gulp.dest(config.dest));

