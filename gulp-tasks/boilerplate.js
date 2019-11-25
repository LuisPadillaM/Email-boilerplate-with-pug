module.exports = ({ gulp, args, config }) => {
  if (args.name) {
    const { emailSrc } = config;
    return gulp.src(`.${emailSrc}/cbp-assignment/**/*`)
      .pipe(gulp.dest(`.${emailSrc}/${args.name}`));
  }
  return false;
};
