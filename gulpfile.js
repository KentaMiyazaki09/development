const gulp = require('gulp')
const ejs = require('gulp-ejs')
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const plumber = require('gulp-plumber')
const { series } = require('gulp')

const EJSPath = ['./src/*.ejs', '!./src/_*.ejs']
const SassPath = ['./src/**/*.scss', '!./src/**/_*.scss']

// ejsコンパイル
const EJSCompile = (done) => {
  gulp.src(EJSPath)
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(replace(replace(/[\s\S]*?(<!DOCTYPE)/, '$1')))
    .pipe(gulp.dest('./dist/'))
    done()
  }

// sassコンパイル
const SassCompile = (done) => {
  gulp.src(SassPath)
    .pipe(sass.sync({outputStyle: 'expanded'}))
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist'))
  done()
}

// ファイル監視
const watchFiles = (done) => {
  gulp.watch(EJSPath, EJSCompile)
  gulp.watch(SassPath, series(SassCompile))
  gulp.watch(['./src/**/_*.scss'], series(SassCompile))
  done()
}

exports.default = series(watchFiles, EJSCompile, SassCompile)
