const browserSync = require('browser-sync');
const args = require("yargs").argv;
const {server} = require("../gulp.config")(args);

module.exports = function (gulp, $) {
  return () => {
    browserSync.init({
      server:{
          baseDir: server.root
      },
      ghostMode: false,
      logPrefix: "Email-Template",
      logFileChanges: false,
      online: false,
      notify:false
  });
  }
};
