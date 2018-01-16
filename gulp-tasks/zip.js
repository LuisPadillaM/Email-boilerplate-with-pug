const args = require("yargs").argv;
const {email_src, zip_path, helpers} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {

    let dirs = helpers.getFolders(`.${email_src}`);

    return dirs.map((folder) => {
        let f_path = path.join(zip_path, folder, '**/*');
        return gulp.src(f_path)
            .pipe($.zip(`${folder}.zip`))
            .pipe(gulp.dest(`${zip_path}/zips`));
    });
  }
};
