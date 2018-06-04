// Send email to Litmus for testing. If no AWS creds then do not replace img urls.
module.exports = ({ gulp, $, config, CONFIG }) => {
  // Const awsURL = !!CONFIG && !!CONFIG.aws && !!CONFIG.aws.url ? CONFIG.aws.url : false;
  const { litmus } = config;
  return gulp.src(litmus.in)
    // .pipe($.if(!!awsURL, $.replace(/=('|")(\/?assets\/img)/g, "=$1" + awsURL)))
    .pipe($.litmus(CONFIG.litmus))
    .pipe(gulp.dest(litmus.out));
};
