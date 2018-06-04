const gulp = require("gulp");
const  { reload } = require("browser-sync");
const del = require("del");
const $ = require("gulp-load-plugins")({
  rename : {
    "gulp-html-minifier" : "htmlmin",
    "gulp-js-escape"     : "htmlscape",
  },
  lazy : true,
});
const args = require("yargs").argv;
const config = require("./gulp.config")(args);
const runSequence = require("run-sequence");
const { helpers, dest } = config;

const CONFIG = helpers.loadCredentials();

function loadTask (module)  {
  require(`./gulp-tasks/${module}`)({gulp, $, args, config, reload });
}

gulp.task("boilerplate", () => loadTask("boilerplate"));

gulp.task("images", () => loadTask("images"));

// // Post images to AWS S3 so they are accessible to Litmus and manual test
// Gulp.task("uploadAWS", loadTask("awsUpload"));
//
//
// // Send email to Litmus for testing.
// Gulp.task("litmus", loadTask("litmus"));

// Escape HTML
gulp.task("htmlScape", () => loadTask("htmlScape"));


gulp.task("index", () => loadTask("index"));

gulp.task("pug", () => loadTask("pug"));

gulp.task("inline", ["pug"], () => loadTask("inline"));

gulp.task("deploy", () => loadTask("htmlMin"));

gulp.task("clean", (cb) =>{
  del.sync([dest], cb);
});

gulp.task("server", () => loadTask("server"));

gulp.task("lint-css", () => loadTask("stylelint"));

// Gulp.task("ftp", ["deploy"], loadTask("ftp"));

gulp.task("zip", ["deploy"], () => loadTask("zip"));


gulp.task("build", ["clean", "images", "pug"]);

gulp.task("default", () => {
  runSequence("index", "images", "pug", "server");
  $.util.log($.util.colors.green("Project Start"));
});
