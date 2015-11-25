'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import express from 'express';
import serveStatic from 'serve-static';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

const appPath = './app';
const scriptsPath = `${appPath}/scripts`;
const tmpPath = './tmp';

function getBundler(watch) {
    let opts = {
        entries: [`${scriptsPath}/init.js`],
        paths: [scriptsPath],
        debug: watch,
    };

    if (watch) {
        opts.cache = {};
        opts.packageCache = {};
    }
    let bundler = browserify(opts).transform(babelify);

    if (watch) {
        return watchify(bundler, {
            delay: 100,
            poll: true
        });
    } else {
        return bundler;
    }

    return bundler;
}

gulp.task('scripts:build', () => {
    getBundler(false)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(tmpPath));
});

gulp.task('serve', () => {
    let app = express();
    app.use(serveStatic('app'));
    app.use(serveStatic('tmp'));
    app.listen(8888);
    gutil.log(gutil.colors.green('[serve] Starting server on http://localhost:8888/'));

    function rebundle(bundler) {
        return bundler
            .bundle()
            .on('error', (error) => {
                gutil.log(gutil.colors.red(`[serve] ${error}`));
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(tmpPath))
        ;
    }

    let bundler = getBundler(true)
        .on('update', () => {
            rebundle(bundler);
        })
        .on('time', (time) => {
            gutil.log(gutil.colors.green(`[serve] Successfully compiled in ${time} ms`));
        })
    ;

    gutil.log(gutil.colors.green('[serve] Watching scripts...'));
    return rebundle(bundler);
});
