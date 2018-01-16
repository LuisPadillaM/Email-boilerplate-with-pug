const args = require("yargs").argv;
const {index, email_src, dest, helpers} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {

    let dirs = helpers.getFolders(`.${email_src}`);
    return gulp.src(index)
    .pipe(pug({
        locals: {links: dirs}
    }))
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}))

  }
};
