/**
 * Global node plugins
 **/
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import plumber from 'gulp-plumber';

/**
 * Assets builder
 **/
import browserify from 'browserify';
import watch from 'gulp-watch';


/**
 * Clean task
 **/
gulp.task('clean', () => {
  return del([
    'dest',
    'publish',
    'npm-debug.log',
    '**/.DS_Store',
    '**/*.log',
  ]);
});


/**
 * Browserify builder
 **/
gulp.task('browserify', () => {
  browserify({
    entries: ['./workspace/assets/scripts/abehiroshize__background.js']
  })
    .bundle()
    .pipe(source('./assets/scripts/abehiroshize__background.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dest'));

  browserify({
    entries: ['./workspace/assets/scripts/abehiroshize__content.js']
  })
    .bundle()
    .pipe(source('./assets/scripts/abehiroshize__content.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dest'));
});


/**
 * Assets builder
 **/
gulp.task('build', () => {
  return runSequence(
    ['clean'],
    ['browserify'],
    ['transport']
  );
});


/**
 * File Transport
 **/
gulp.task('transport', () => {
  gulp.src(['./workspace/manifest.json'])
    .pipe(gulp.dest('./dest'));

  gulp.src(['./workspace/assets/images/*.png'])
    .pipe(gulp.dest('./dest/assets/images'));
});


/**
 * Assets watcher
 **/
gulp.task('watch', () => {
  watch('./workspace/manifest.json', () => {
    return runSequence(
      ['transport']
    )
  });

  watch('./workspace/assets/images/**/*', () => {
    return runSequence(
      ['transport']
    )
  });

  watch('./workspace/assets/scripts/**/*.js', () => {
    return runSequence(
      ['browserify']
    )
  });
});


/**
 * Gulp default task
 **/
gulp.task('default', () => {
  throw new Error('Default task is not supported!! Please use "npm start"');
});


/**
 * Gulp npm task
 **/
gulp.task('start', () => {
  return runSequence(
    ['clean'],
    ['build'],
    ['watch']
  );
});
