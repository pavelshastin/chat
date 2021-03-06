var gulp = require("gulp"),
	jade = require("gulp-jade"),
	wiredep = require("wiredep").stream,
	clean = require("gulp-clean"),
	useref = require("gulp-useref"),
	gulpif = require("gulp-if"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	prefixer = require("gulp-autoprefixer"),
	minifyCss = require("gulp-minify-css"),
	filter = require("gulp-filter"),
	imagemin = require("gulp-imagemin"),
	size = require("gulp-size"),
	spriteSmith = require("gulp.spritesmith"),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	wait = require("gulp-wait"),
	pxtorem = require("gulp-px-to-rem"),
	time = 1500;




gulp.task("jade", function(){
	gulp.src("app/templates/*.jade")
		.pipe(wait(time))
		.pipe(jade({
			pretty: '\t'
		}))
		.on("error", log)
		.pipe(gulp.dest("dist/"))
		.pipe(reload({stream: true}));
});


gulp.task("media_list", function() {
	gulp.src("app/css/media_list.scss")
		.pipe(wait(time))
		.pipe(sass())
		.pipe(gulp.dest("dist/css/"))
});


gulp.task("style", function() {
	gulp.src("app/css/main.scss")
		.pipe(wait(time))
		.pipe(sass())
		.pipe(prefixer())
		//.pipe(pxtorem({rootPX: 19, accuracy: 6})) //use CAREFULLY!!!
		.pipe(gulp.dest("dist/css/"))
});


gulp.task("server", ["jade", "style", 'wiredep'], function(){
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: "dist"
		}	
	});

	
});

//bower dependences
gulp.task("wiredep", function(){
	gulp.src("app/js/**/*.js")
		.pipe(wait(time))
		// .pipe(widerep({
		// 	ignorePath: /^(\.\.\/)*\.\./
		// }))
		.pipe(gulp.dest('dist/js/'));

});


gulp.task("sprite", function(){
	
	return gulp.src("app/icons/*.png")
			.pipe(wait(time))
			.pipe(spriteSmith({
				imgName: "images/sprites.png",
				cssName: "css/sprites.css",
				padding: 10,
				cssFormat: "css",
				cssOpts: {
					cssSelector: function(item){

						/*if (item.name.indexOf("-hover") !== -1) {
							return item.name.replace("-hover", ":hover");
						}*/

						if (item.name.indexOf("-") !== -1) {
							return "." + item.name.replace(/\-/g, ":"); //replace all occurences of "-"
						}

						return "." + item.name;
					}

				}

			}))
			.pipe(gulp.dest("dist/"))

});




gulp.task("watch", function(){
	gulp.watch("app/templates/**/*.*", ['jade']);
	gulp.watch("app/css/**/*.scss", ['style'], );
	gulp.watch("app/js/*.js", ['wiredep']);
	gulp.watch(['app/js/**/*.js', 'app/css/**/*.scss', 'app/css/**/*.css', 'app/*.html'])
		.on('change', reload);

});


gulp.task("default", ["server", "watch"])


// ====================================================
// ====================================================
// ===================== Функции ======================
 
// Более наглядный вывод ошибок

var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}


// ====================================================
// ====================================================
// =============== Важные моменты  ====================
// gulp.task(name, deps, fn) 
// deps - массив задач, которые будут выполнены ДО запуска задачи name
// внимательно следите за порядком выполнения задач!
// 
// ====================================================
// ====================================================
// ================= Сборка DIST ======================
// 

 
// Очистка папки
// gulp.task('clean', function(){
// 	return gulp.src("dist", [{read: false}])
// 			.pipe(clean());	

// }); 


// // Переносим HTML, CSS, JS в папку dist 
// gulp.task('useref', function(){

// return gulp.src(['dist/**/*'])
// 		.pipe(useref())
// 		.pipe(gulpif("*.js", uglify()))
// 		.pipe(gulpif("*.css", minifyCss({compatibility: 'ie8'})))
// 		.pipe(gulp.dest("dist/"))
// });



// //перенос шрифтов
// gulp.task("fonts", function(){
// 	return gulp.src("app/fonts/*")
// 		//.pipe(filter(['*.svg','*.otf',]))
// 		.pipe(gulp.dest("dist/fonts"))
// });

// //перенос картинок
// gulp.task('images', function () {
//   return gulp.src('app/images/**/*')
//     .pipe(imagemin({
//       progressive: true,
//       interlaced: true
//     }))
//     .pipe(gulp.dest('dist/images'));
// });
 


// // Сборка и вывод размера содержимого папки dist
// gulp.task('dist', ['useref', 'images', 'fonts'], function () {
//   return gulp.src('dist/**/*').pipe(size({title: 'build'}));
// });

// // Собираем папку DIST (только после компиляции Jade)
// gulp.task('build', ['dist', 'style', 'jade', 'wiredep']);


