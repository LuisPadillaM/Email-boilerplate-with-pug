module.exports = ({ gulp, args, config }) => {
  if (args.name) {
    const { awsTemplates } = config;
    return gulp.src(`.${awsTemplates}/boilerplate.json`)
      .pipe(gulp.dest(`.${awsTemplates}/${args.name}.json`));
  }
  return false;
};
