module.exports =  ({ gulp }) =>  gulp.src("../dist/**/index.html")
  .pipe($.htmlscape())
  .pipe(gulp.dest("./escaped/"));
