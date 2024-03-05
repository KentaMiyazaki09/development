const { src, dest, watch } = require('gulp')
const ejs = require('gulp-ejs')
const { sync, logError } = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const plumber = require('gulp-plumber')
const { series } = require('gulp')
const sourcemaps = require('gulp-sourcemaps')

const EJSPath = ['./src/*.ejs', '!./src/_*.ejs']
const SassPath = ['./src/**/*.scss', '!./src/**/_*.scss']

const isPro = process.env.NODE_ENV === "production"

// ejsコンパイル
const EJSCompile = (done) => {
  src(EJSPath)
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(replace(replace(/[\s\S]*?(<!DOCTYPE)/, '$1')))
    .pipe(dest('./dist/'))
    done()
  }

// sassコンパイル
const SassCompile = (done) => {
  if(isPro) {
    src(SassPath)
    .pipe(sync({outputStyle: 'compressed'}).on('error', logError))
    .pipe(dest('./dist'))
  } else {
    src(SassPath)
    .pipe(sourcemaps.init())
    .pipe(sync({outputStyle: 'expanded'}).on('error', logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist'))
  }
  done()
}

// ファイル監視
const watchFiles = (done) => {
  watch(EJSPath, EJSCompile)
  watch(SassPath, series(SassCompile))
  watch(['./src/**/_*.scss'], series(SassCompile))
  done()
}

exports.default = series(watchFiles, EJSCompile, SassCompile)
