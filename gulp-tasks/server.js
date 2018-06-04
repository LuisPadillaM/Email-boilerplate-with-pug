const browserSync = require("browser-sync");

module.exports = ({gulp, config})  => {
  const { server, index, emailSrc, helpers} = config;
  browserSync.init({
    server : {
      baseDir : server.root,
    },
    ghostMode      : false,
    logPrefix      : "Email-Template",
    logFileChanges : false,
    online         : false,
    notify         : false,
  });

  gulp.watch([index, `.${emailSrc}**/*.pug`], ["index"])
    .on("change", (event) => {
      helpers.changeMsg(event);
    });
  gulp.watch(["src/includes/*", "src/layout/*.pug", `.${emailSrc}**/*.pug`, `.${emailSrc}**/data.json`], ["pug"])
    .on("change", (event) => {
      helpers.changeMsg(event);
    });
  gulp.watch(`.${emailSrc}**/img/*`, {cwd : "./"}, ["images"])
    .on("change", () => {
      reload();
    });
  gulp.watch(`.${emailSrc}**/styles/*.{css,scss}`, ["pug"])
    .on("change", (event) => {
      helpers.changeMsg(event);
    });
};
