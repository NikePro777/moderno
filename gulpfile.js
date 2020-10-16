let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglifi = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')    //находит файл стайл.сцсс
        .pipe(sass({outputStyle: 'compressed'}))   //код в минифицированный превращает
        .pipe(rename({suffix : '.min'}))    //переименовывает файл в мин.цсс
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))   // Запускает автопрефиксер(подключает свойства для старых версий)
        .pipe(gulp.dest('app/css'))     // закидывает в папку цсс
        .pipe(browserSync.reload({stream: true})) // автоматически обновляет изменения в цсс
});

gulp.task('style', function(){   //обьединения цсс  файлов 
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css' //перечисляем все модули которые хотим обьединить
    ])
        .pipe(concat('libs.min.css'))    //обьединяем в файл
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))  // сохраняем
});

gulp.task('script', function(){   //обьединения js  файлов 
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js' //перечисляем все модули которые хотим обьединить
    ])
        .pipe(concat('libs.min.js'))    //обьединяем в файл
        .pipe(uglifi())     // делаем минифицированным
        .pipe(gulp.dest('app/js'))  // сохраняем
});

gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))   // автоматически обновляет изменения в html
});

gulp.task('js', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))  // автоматически обновляет изменения в js
});

gulp.task('browser-sync', function() {   // плагин который автоматически обновляет страницу после изменений
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')) //смотрит за изменениями в файле стайл.цсс и сохраняет их
    gulp.watch('app/*.html', gulp.parallel('html'))     // соответственно тоже смое для хтмл
    gulp.watch('app/js/*.js', gulp.parallel('js'))     // для js
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))  //паралельно запускаются эти процессы, ибо они все будут в режиме ожидания