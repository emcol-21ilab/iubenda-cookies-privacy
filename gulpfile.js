const {
  dest,
  src,
  task,
  series,
  parallel,
  watch
} = require('gulp');

// Requires the gulp-sass plugin
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cache');
//babel
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const scss = function () {
  return src('src/scss/**/*.scss')
    .pipe(cache.clear())
    .pipe(sourcemaps.init())
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
    .pipe(browserSync.reload({ //we have to run both the watch and browserSync tasks at the same time for live-reloading to occur
      stream: true
    }));
};

task('js', () =>
    src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist'))
      .pipe(browserSync.reload({ 
        stream: true
      }))
);

task('bs', function () {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

task('reload', function () {
  browserSync.reload({ 
    stream: true
  });
});

task('build', function () {
  watch('src/scss/**/*.scss', series(scss));
  watch(['index.html', 'src/js/**/*.js'], task('reload'));
  watch(['src/js/**/*.js'], series('js'));
});

exports.default = parallel('bs', series(scss, 'js', 'build'));