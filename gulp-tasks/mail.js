const args = require("yargs").argv;
const EMAIL = args.to;

// Send email to specified email for testing. If no AWS creds then do not replace img urls.
module.exports = ({ gulp, $, config, CONFIG }) => {
  const awsURL = !!CONFIG && !!CONFIG.aws && !!CONFIG.aws.url ? CONFIG.aws.url : false;

  if (EMAIL) {
    CONFIG.mail.to = [EMAIL];
  }

  return gulp.src(`${config.dest}/**/*.html`)
    .pipe($.if(!!awsURL, $.replace(/=('|")(\/?assets\/img)/g, "=$1" + awsURL)))
    .pipe($.mail(CONFIG.mail))
    .pipe(gulp.dest(config.dest));
};
