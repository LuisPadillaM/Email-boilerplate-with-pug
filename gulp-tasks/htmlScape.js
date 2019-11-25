module.exports =  ({gulp, $, config }) =>  gulp.src(`${config.dest}/**/index.html`)
  .pipe($.htmlscape())
  .pipe(gulp.dest(`./escaped/`));
