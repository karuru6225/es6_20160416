var connect = require('gulp-connect');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var ejs = require('gulp-ejs');

gulp.task('server', function(){
  connect.server({
    root: [__dirname + '/pub'],
    port: 8000,
    livereload: true
  });
});

gulp.task('reload', function(){
  gulp.src(['./*.html', './pub/js/**/*.js'])
    .pipe(connect.reload())
});

gulp.task('sass', function(){
  gulp.src('./scss/*.scss')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./pub/css'))
    .pipe(connect.reload())
});

gulp.task('js', function(){
  gulp.src([
      './js/*.js',
    ])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./pub/js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename({extname:'.min.js'}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./pub/js/min'))
    .pipe(connect.reload())
});

gulp.task('html', function(){
  gulp.src(['./html/*.html', '!./html/_*.html'])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(ejs({}))
    .pipe(gulp.dest('./pub/'))
});

gulp.task('default',['server','sass','js','html'], function(){
  watch('./pub/**/*.html', function(){
    gulp.start(['reload']);
  });

  //scssが更新されたらscssのコンパイル実行
  //cssが生成されたらブラウザがリロードされる。
  watch('./scss/**/*.scss', function(){
    gulp.start( ['sass']);
  });

  watch([
    './js/**/*.js'
  ],function(){
    gulp.start(['js']);
  });

  //htmlファイルのコンパイル
  //pub以下にhtmlが生成されたらブラウザがリロードされる。
  watch([
    './html/*.html'
  ],function(){
    gulp.start(['html']);
  });
});