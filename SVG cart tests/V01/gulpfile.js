var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');


gulp.task('sass', function() {
   return gulp.src('css/sass/styles.scss')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('css/'))
      .pipe(reload({stream:true}))
});


//watch
gulp.task('html', function (){
  return gulp.src('*.html')
  .pipe(reload({stream:true}))
  // Other watchers
});

//watch
gulp.task('js', function (){
  return gulp.src('js/*.js')
  .pipe(reload({stream:true}))
  // Other watchers
});


//watch
gulp.task('watch', ['sass'], function (){
  gulp.watch('css/sass/*.scss', ['sass']);
  gulp.watch('*.html', ['html']);
  gulp.watch('js/*.js', ['js']);
  // Other watchers
});

// server root for browser-sync
gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: ''
      },
   })
})

// Default Task
gulp.task('default', ['sass', 'html', 'browserSync', 'watch']);
