//引入gulp组件
var gulp = require('gulp');

//引入常用组件
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

//1.copy并压缩html文件
gulp.task('html',function(){
	gulp.src('src/**/*.html')
	.pipe(htmlmin({
		removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({stream:true}));
})
//2.编译less文件，压缩变异后的css文件，把css文件放到目标目录
gulp.task('less',function(){
	gulp.src('src/less/**/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({stream:true}));
})
//3.js压缩
gulp.task('js',function(){
	gulp.src('src/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'))
	.pipe(browserSync.reload({stream:true}));
})

//4.定义一个任务，监视所有的文件

gulp.task('watch',['html','js','less'],function(){
	gulp.watch('src/**/*.html',['html']);
	gulp.watch('src/js/**/*.js',['js']);
	gulp.watch('src/less/**/*.less',['less']);
});

//5.启动一个web服务
gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:"dist/"
		}
	})
})
//6.定义一个默认的任务，该任务自动调用serve和watch任务
gulp.task('default',['watch','serve']);