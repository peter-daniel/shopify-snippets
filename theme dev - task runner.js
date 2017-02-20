
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var reporter = require('reporter');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var streamqueue = require('streamqueue');



var config = {
    dev: gutil.env.prod,
    src: {
        scss_main: './scss/main.scss',
        scss_all: './scss/**/*.scss',
        images: './images/**/*.+(jpg|jpeg|gif|png)',
        svgs: './svg/**/*.svg',
        js: './js/*.js',
        vendorJs: './js/vendor/**/*.js',
    },
    outputDir: '../theme/assets'
};


///////////////////////////////////////////////////////
///// compile all scss - with escaped liquid
///////////////////////////////////////////////////////

gulp.task('sass', function () {
  return gulp.src(config.src.scss_main)
        .pipe(sass().on('error', sass.logError))
        .pipe(gutil.env.type === 'prod' ? concat('prod-theme.css.liquid') : concat('theme.css.liquid'))
        // .pipe(gutil.env.type === 'prod' ? gutil.noop() : autoprefixer())
        // .pipe(gutil.env.type === 'prod' ? autoprefixer({ browsers: ['last 2 versions'], cascade: false }) : gutil.noop())
    .pipe(gulp.dest(config.outputDir));
});




///////////////////////////////////////////////////////
///////// concatenate and lint js
///////////////////////////////////////////////////////

gulp.task('js', function() {
    return gulp.src(config.src.js)
        .pipe(concat('dev.js'))
        .pipe(jshint({ /* this object represents the JSLint directives being passed down */ }))
            .pipe(jshint.reporter('default'))
        .pipe(gutil.env.type === 'prod' ? concat('prod-apollo.js') : concat('dev-apollo.js'))
    .pipe(gulp.dest(config.outputDir));
});




///////////////////////////////////////////////////////
//////// control the order of the vendor load
///////////////////////////////////////////////////////

gulp.task('vendorJs', function(){
    return streamqueue({ objectMode: true },
        gulp.src('./js/vendor/modernizr-custom.js'),
        gulp.src('./bower_components/jquery/dist/jquery.js'),
        gulp.src('./js/vendor/handlebars.min.js'),
        gulp.src('./bower_components/slick-carousel/slick/slick.js')
    )
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.outputDir));
});





///////////////////////////////////////////////////////
////////compress images
///////////////////////////////////////////////////////

gulp.task('compressImages', function() {
    return gulp.src(config.src.images)
        .pipe(imagemin())
        .pipe(gulp.dest(config.outputDir));
});

///////////////////////////////////////////////////////
//////// concatenate svgs into one symbol and minify
///////////////////////////////////////////////////////

gulp.task('svgstore', function() {
    return gulp.src(config.src.svgs)
        .pipe(svgmin(function(file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    },
                    removeUnknownsAndDefaults: true,
                    removeUselessStrokeAndFill: true
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename("svg-defs.liquid"))
        .pipe(gulp.dest("./liquid/snippets"));
});

///////////////////////////////////////////////////////
//////// WATCHES
///////////////////////////////////////////////////////


// js and sass watches
gulp.task('watch_js_sass', function() {
    gulp.watch(config.src.scss_all, ['sass']);
    gulp.watch(config.src.js, ['js']);
    gulp.watch(config.src.vendorJs, ['vendorJs']);
});


// watch all liquid and json files inside the folder 'liquid'
var source = './liquid';
gulp.task('watch_liquid', function() {
  gulp.src(source + '/**/*.{liquid,json}', {base: source})
    .pipe(watch(source, {base: source}))
    .pipe(gulp.dest('../theme/'));
});


///////////////////////////////////////////////////////
//////// SHELL COMMAND TO OPEN THEME WATCH
///////////////////////////////////////////////////////

gulp.task('theme_watch', shell.task([
  'ttab -d ../theme theme watch'
]))

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////



gulp.task('default', [ 'sass', 'vendorJs', 'js', 'compressImages', 'svgstore', 'watch_js_sass', 'watch_liquid' ]);

