const args = require("yargs").argv;
const ftp = require("vinyl-ftp");
const {ftp: ftpConfig, dest} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {

    let conn = ftp.create( {
      host:     ftpConfig.host,
      user:     ftpConfig.user,
      password: ftpConfig.pass,
      parallel: 10,
      log:      gutil.log,
      secure: true
  } );

  return gulp.src( globs, { base: dest, buffer: false } )
    .pipe( conn.newer(ftpConfig.stagingFolder) ) // only upload newer files
    .pipe( conn.dest(ftpConfig.stagingFolder) );

  }
};
