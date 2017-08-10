var gulp = require('gulp'),
    bowerFixCss = require('gulp-bower-fix-css-path'),
    clean = require('gulp-clean'),
    pump = require('pump');

var config = {
    "dist": "dist/",
    "distFonts": 'dist/fonts/',
    "distVendor": 'dist/vendor/',
    "debug": false,
    "vendorSrc": "bower_components/",
    "absolutePath": "/vendor/",
    "types": {
        "fonts": {
            extensions: [".eot", ".woff", ".ttf", ".woff2"],
            prefixPath: "fonts/"
        }
    }
};

// Fixes path to fonts in css files to use the right font path all in one place.
gulp.task("bowerFixCssDefaultConfig", function () {
    return gulp
        .src([config.vendorSrc + '**/*.css'])
        .pipe(bowerFixCss())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task('clean-fonts', function () {
    var fonts = config.distFonts + '*';
    return gulp
        .src(fonts, {read: false})
        .pipe(clean());
});

gulp.task('clean-vendor', function () {
    var vendors = config.distVendor + '*';
    return gulp
        .src(vendors, {read: false})
        .pipe(clean());
});

// shortcut here, imagine I would have minified everything and compiled to a single js file or something
gulp.task('fake-compile-vendor', ['clean-vendor'], function () {

    var sourceFiles = [config.vendorSrc + '/**/*'];
    var destination = config.distVendor;

    return gulp
        .src(sourceFiles)
        .pipe(gulp.dest(destination));

});

gulp.task('fonts', ["clean-fonts"], function () {

    var fonts = {
        bower: [
            'font-awesome/fonts/',
            'simple-line-icons/fonts/',
            'sportsfont/font/',
            'summernote/dist/font/'
        ]
    };

    files = fonts.bower.map(
        function (lib) {
            return "bower_components/" + lib + "*.*"
        }
    );

    return pump([
        gulp.src(files),
        gulp.dest(config.distFonts)
    ]);
});

gulp.task("bowerFixCssWithConfig", function () {
    return gulp.src([config.distVendor + '**/*.css'])
        .pipe(bowerFixCss(config))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task("default", ["fake-compile-vendor", "fonts"]);
