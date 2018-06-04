const args = require("yargs").argv;
const ftp = require("vinyl-ftp");
const {ftp: ftpConfig, dest} = require("../gulp.config")(args);

module.exports =  ({gulp, $}) => {
  const {host, user, pass : password}  = ftpConfig;
  const conn = ftp.create( {
    host,
    user,
    password,
    parallel : 10,
    log      : $.util.log,
    secure   : true,
  } );

  const globs = [
    "dist/**/**",
  ];

  return gulp.src( globs, { base : dest, buffer : false } )
    .pipe( conn.newer(ftpConfig.stagingFolder) ) // Only upload newer files
    .pipe( conn.dest(ftpConfig.stagingFolder) );
};
