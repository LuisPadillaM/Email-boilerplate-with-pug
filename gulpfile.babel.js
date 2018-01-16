'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import {reload} from 'browser-sync';
import fs from 'fs';
import del from 'del';
import path from 'path';
var juice = require('@thasmo/gulp-juice');
const $ = require("gulp-load-plugins")({lazy: true});
const config = require("./gulp.config")(args);
const htmlmin = require('gulp-html-minifier');
const runSequence = require('run-sequence');
const args = require("yargs").argv;

const {
  img,
  aws,
  email_src,
  litmus,
  helpers,
  index,
  dest
} = config;

const CONFIG = helpers.loadCredentials();

function loadTask(module)  {
  require(`./gulp-tasks/${module}`)(gulp, $)
};

gulp.task("images", loadTask("images"));

// Post images to AWS S3 so they are accessible to Litmus and manual test
gulp.task('uploadAWS',()=> {

  const publisher = !!CONFIG.aws ? $.awspublish.create(CONFIG.aws) : $.awspublish.create();
  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src(aws.in)
    .pipe(publisher.publish(headers))
    .pipe($.awspublish.reporter());
});

// Send email to Litmus for testing.
gulp.task('litmus',()=> {
  return gulp.src(litmus.in)
    .pipe($.litmus(CONFIG.litmus))
    .pipe(gulp.dest(litmus.out));
});

gulp.task('index',loadTask("index"));

gulp.task('inline',['pug'], loadTask("inline"));

gulp.task("pug", loadTask("pug"));

gulp.task('clean',(cb)=>{
     del.sync([dest],cb);
})

gulp.task("watch", () => {
  gulp.watch([index,`.${email_src}**/*.pug`],['index'])
  .on("change", (event) => {
      helpers.changeMsg(event);
  });
  gulp.watch(['src/includes/*','src/layout/*.pug',`.${email_src}**/*.pug`, `.${email_src}**/data.json`],['pug'])
  .on("change", (event) => {
      helpers.changeMsg(event);
  });
  gulp.watch(`.${email_src}**/img/*`,{cwd:'./'},['images'])
  .on("change", (event) => {
    reload()
  })
  gulp.watch(`.${email_src}**/styles/*.{css,scss}`,['pug'])
    .on("change", (event) => {
      helpers.changeMsg(event);
  })
});

gulp.task('server', loadTask("server"));

gulp.task('lint-css', loadTask("stylelint"));

gulp.task('ftp', ["deploy"], loadTask("ftp"));

gulp.task('zip', ["deploy"], loadTask("zip"));

gulp.task('deploy', () => {
  return gulp.src("dist/**/index.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe($.htmlhint({htmlhintrc: ".htmlhintrc"}))
    .pipe($.htmlhint.reporter())
    .pipe(gulp.dest(dest))
});

gulp.task('build',['clean','index','images','pug']);

gulp.task('default', () =>{
    runSequence('index','images','pug','server','watch');
    $.util.log($.util.colors.green("Project Start"));
});
