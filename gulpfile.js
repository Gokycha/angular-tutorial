const gulp = require("gulp");
const inline = require("gulp-inline");

gulp.task("default", () => {
  return gulp
    .src("./dist/tutorial/browser/index.html")
    .pipe(inline())
    .pipe(gulp.dest("./single-dist"));
});