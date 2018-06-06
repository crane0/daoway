// 引入gulp等相关资源
const gulp = require('gulp')
var uglify = require('gulp-uglify')
const less = require('gulp-less')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')
const concat = require('gulp-concat')   //合并压缩js,css
const htmlmin = require('gulp-htmlmin')

const connect = require('gulp-connect')   //实现livereload
const open = require('open')    //自动打开浏览器（不会重复打开多个）


// 定义打包构建特定资源的任务
gulp.task('jsTask', function () {
  return gulp.src('public/js/*.js') //操作的源文件
    .pipe(concat('built.js',{newline:';'})) //合并到临时文件,如果是新的行，加分号
    .pipe(gulp.dest('dist/js')) //生成到目标文件夹
    .pipe(rename({suffix: '.min'})) //重命名
    .pipe(uglify())    //压缩
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
})


gulp.task('lessTask', function () {
  return gulp.src('public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload())
})

//在执行cssTask之前，要先执行lessTask
gulp.task('cssTask',['lessTask'], function () {
  return gulp.src('public/css/*.css')
    .pipe(concat('built.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

gulp.task('htmlTask', function() {
  return gulp.src('public/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

// 定义默认任务(关联了n个其它任务)
// gulp.task('default', ['jsTask','cssTask','htmlTask'])


//半自动构建（不在需要定义默认任务了）
// gulp.task('watch', ['default'], function () {
//   //监视指定的文件, 并指定对应的处理任务
//   gulp.watch('public/js/*.js', ['jsTask'])
//   gulp.watch(['public/css/*.css','public/less/*.less'], ['cssTask'])
// })

//实时重载（就不在需要半自动构建了）
gulp.task('livereload', function() {
  //配置加载的选项
  connect.server({
    root : 'dist/',//监视的源目标文件路径
    livereload : true,//是否实时刷新
    port : 5000//开启端口号
  });
  // 自动开启链接
  open('http://localhost:5000')
  // 监视目标文件（因为已经生成了html的压缩文件，就不在需要了，因为在html压缩文件中引入了css和js）
  // gulp.watch('public/js/*.js', ['jsTask']);
  gulp.watch('public/index.html', ['htmlTask']);
  gulp.watch(['public/css/*.css', 'public/less/*.less'], ['cssTask'])
})



