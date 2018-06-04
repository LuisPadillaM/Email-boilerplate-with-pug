// Post images to AWS S3 so they are accessible to Litmus and manual test
module.exports = (gulp, $, CONFIG) =>{
  const publisher = !!CONFIG.aws ? $.awspublish.create(CONFIG.aws) : $.awspublish.create();
  const headers = {
    "Cache-Control" : "max-age=315360000, no-transform, public",
  };

  return gulp.src(CONFIG.aws.in) // './dist/assets/img/*'
    .pipe(publisher.publish(headers))
    .pipe($.awspublish.reporter());
};
