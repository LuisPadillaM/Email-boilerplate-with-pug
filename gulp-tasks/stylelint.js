module.exports =  ({gulp, $, config }) => gulp.src(`.${config.emailSrc}**/styles/*.{css,scss}`)
  .pipe($.stylelint({
    failAfterError : false,
    reporters      : [
      {formatter : "string", console : true},
    ],
  }));

