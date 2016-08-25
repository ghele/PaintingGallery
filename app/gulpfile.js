// // Include gulp
// var gulp = require('gulp');
//
// // Include Our Plugins
// var jshint = require('gulp-jshint');
// var sass = require('gulp-sass');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
//
// // Lint Task
// gulp.task('lint', function() {
//     return gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });
//
// // Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('sass/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('public/stylesheets'));
// });
//
// // Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });
//
// // Watch Files For Changes
// gulp.task('watch', function() {
//     plugins.livereload.listen();
//         gulp.watch('public/javascript/*.js', ['lint', 'scripts']);
//         gulp.watch('sass/*.scss', ['sass']);
// });
//
// gulp.task('build-css', function() {
//        return gulp.src('sass/*.scss')
//             .pipe(plugins.plumber())
//             .pipe(plugins.less())
//             .on('error', function (err) {
//                 gutil.log(err);
//                 this.emit('end');
//             })
//             // .pipe(plugins.cssmin())
//             .pipe(plugins.autoprefixer(
//                 {
//                     browsers: [
//                         '> 1%',
//                         'last 2 versions',
//                         'firefox >= 4',
//                         'safari 7',
//                         'safari 8',
//                         'IE 8',
//                         'IE 9',
//                         'IE 10',
//                         'IE 11'
//                     ],
//                     cascade: false
//                 }
//             ))
//             .pipe(gulp.dest('build')).on('error', gutil.log)
//             .pipe(plugins.livereload());
//     });
//
// // Default Task
// gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'build-css']);

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect');

// function errorLog(error) {
//     console.error.bind(error);
//     this.emit('end');
// }

// Connect Task
// Livereloads
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

// Scripts Task
// Uglifies
gulp.task('scripts', function() {
    gulp.src('public/javascript/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('public/minJS/'))
});

// Styles Task
// Uglifies
gulp.task('styles', function() {
    gulp.src('public/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('public/stylesheets/'))
        .pipe(connect.reload());
});

// Watch Task
// Watch JS and SCSS
gulp.task('watch', function() {
    gulp.watch('public/javascript/*.js', ['scripts']);
    gulp.watch('public/scss/*.scss', ['styles']);
})

gulp.task('default', ['scripts', 'styles', 'watch', 'connect']);
