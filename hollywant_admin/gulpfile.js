//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    // less = require('gulp-less');
      cssmin = require('gulp-minify-css');
      htmlmin = require('gulp-htmlmin');
 	imagemin = require('gulp-imagemin');
 	uglify = require('gulp-uglify');
     mkdirp = require('mkdirp');
     concat = require("gulp-concat");

 	// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('js/*.js')
    // 2. 压缩文件
        .pipe(uglify({ mangle: false }))
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
})	
gulp.task('mkdirp',function(){
    var js = './src/h-ui/js';
    var images = './src/h-ui/images';
    var css = './src/h-ui/css';
    var lib = './src/lib'
    var index = './src/views';
    var dirs = [js,images,css,lib,index];
    dirs.forEach(dir => {
    mkdirp.sync(dir);
});
})
gulp.task('mkdir2',function(){
    var js = './build/h-ui/js';
    var images = './build/h-ui/images';
    var css = './build/h-ui/css';
    var lib = './build/lib'
    var index = './build/views';
    var dirs = [js,images,css,lib,index];
    dirs.forEach(dir => {
    mkdirp.sync(dir);
});
})
gulp.task('mkdir3',function(){
    var js = './dist/h-ui/js';
    var images = './dist/h-ui/images';
    var css = './dist/h-ui/css';
    var lib = './dist/lib'
    var index = './dist/views';
    var dirs = [js,images,css,lib,index];
    dirs.forEach(dir => {
    mkdirp.sync(dir);
});
})
gulp.task('mkdir',['mkdirp','mkdir2','mkdir3']);
// 文件合并
gulp.task('concat', function () {
    gulp.src(['./js/index.js'],['./js/public.js'])          // 要合并的文件
        .pipe(concat('all.js'))   // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy',  function() {
  return gulp.src(['./src/**.html'])
    .pipe(gulp.dest('./build'))
});


gulp.task('testCssmin', function () {
    gulp.src('')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('views/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/views'));
     gulp.src('index.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist'));
});
gulp.task('testImagemin', function () {
    gulp.src('images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            // optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            // progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            // multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'));
});
 
gulp.task('default',['testCssmin','testHtmlmin','testImagemin','script']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径