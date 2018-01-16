const args = require("yargs").argv;
const {email_src} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {

    return gulp
    .src(`.${email_src}**/styles/*.{css,scss}`)
    .pipe($.stylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));

  }
};
