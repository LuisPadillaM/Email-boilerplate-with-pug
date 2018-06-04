const juice = require("@thasmo/gulp-juice");

module.exports = ({ gulp, config }) => {
  const { dest } = config;
  gulp.src(`${dest}/**/index.html`)
    .pipe(juice({
      includeResources     : true,
      removeStyleTags      : false,
      preserveMediaQueries : true,
      webResources         : { links : true, scripts : false, images : false, relativeTo : "."},
    }))
    .pipe(gulp.dest(dest));
};
