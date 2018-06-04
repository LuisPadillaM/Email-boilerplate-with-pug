module.exports =  ({gulp, $, reload, config}) => {
  const { index, emailSrc, dest, helpers } = config;
  const dirs = helpers.getFolders(`.${emailSrc}`);
  return gulp.src(index)
    .pipe($.pug({
      locals : {links : dirs},
    }))
    .pipe(gulp.dest(dest))
    .pipe(reload({stream : true}));
};
