import gulp from "gulp";
import babel from "gulp-babel";
import postcss from "gulp-postcss";
import uglify from "gulp-uglify";
import newer from "gulp-newer";
import imagemin from "gulp-imagemin";
import sass from "gulp-sass";
import browserSync from "browser-sync";
import del from "del";

const paths = {
  html: {
    public: "public/*.html"
  },
  scss: {
    src: "src/scss/main.scss",
    dest: "public/css/"
  },
  scss: {
    src: "src/scss/main.scss",
    dest: "public/css/"
  },
  js: {
    src: "src/js/main.js",
    dest: "public/js/"
  },
  img: {
    src: "src/img/**/*.{jpg,jpeg,png,svg,gif}",
    dest: "public/img/"
  }
};

export function webserver() {
  browserSync({
    server: {
      baseDir: "./public"
    },
    logPrefix: "Server"
  });
}

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
export const clean = () =>
  del(["public/js/main.js", "public/css/main.css", "public/img/**/*.{jpg,jpeg,png,svg,gif}"]);

export const html = () =>
  gulp
  .src(paths.html.public)
  .pipe(
    browserSync.reload({
      stream: true
    })
  );

/*
 * Define our tasks using plain functions
 */
export function scss() {
  return gulp
    .src(paths.scss.src)
    .pipe(newer(paths.scss.dest))
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

export function img() {
  return gulp
    .src(paths.img.src)
    .pipe(newer(paths.img.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

export function js() {
  return gulp
    .src(paths.js.src, {
      sourcemaps: true
    })
    .pipe(newer(paths.js.dest))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

export function watch() {
  gulp.watch(paths.html.public, html);
  gulp.watch(paths.scss.src, scss);
  gulp.watch(paths.img.src, js);
  gulp.watch(paths.js.src, js);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
const build = gulp.parallel(scss, js, img, watch, webserver);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task("default", build);