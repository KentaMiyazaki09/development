const gulp = require('gulp')
const rename = require('gulp-rename')
const ejs = require('gulp-ejs')
const replace = require('gulp-replace')
const plumber = require('gulp-plumber')
const { series } = require('gulp')

// ejsファイルをhtmlへコンパイル
const EJSCompile = (done) => {
  gulp.src(['./src/*.ejs', '!./src/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(replace(replace(/[\s\S]*?(<!DOCTYPE)/, '$1')))
    .pipe(gulp.dest('./dist/'))
    done()
  }

// ファイル監視
const watchFiles = (done) => {
  gulp.watch(['./src/*.ejs', '!./src/_*.ejs'], EJSCompile)
  done()
}

exports.default = series(EJSCompile, watchFiles)
