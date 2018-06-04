const path = require("path");

module.exports =  ({ gulp, $, config }) => {
  const {emailSrc, zipPath, helpers} = config;
  const dirs = helpers.getFolders(`.${emailSrc}`);
  return dirs.map((folder) => {
    const filePath = path.join(zipPath, folder, "**/*");
    return gulp.src(filePath)
      .pipe($.zip(`${folder}.zip`))
      .pipe(gulp.dest(`${zipPath}/zips`));
  });
};
