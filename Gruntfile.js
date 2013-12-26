module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		clear: {
			files: ['**/*'],
			tasks: ['clear']
		},

		compass: {
			dist: {
				options: {
					require: 'susy',
					sassDir: 'sass',
					cssDir: 'css',
					environment: 'production'
				}
			}
		},

		uglify: {
			my_target: {
				files: {
					'js/build/production.min.js': ['js/build/production.js']
				}
			}
		},

		concat: {
			dist: {
				src: [
					'js/test.js', // All JS in the libs folder
					'js/main.js'  // This specific file
				],
				dest: 'js/build/production.js',
			}
		},

		watch: {
			all: {
				files: 'index.html', // Change this if you are not watching index.html
				options: {
					livereload: true
				}
			},
			css: {
				files: ['**/*.scss', 'css/main.css'],
				tasks: ['compass']
			},
			options: {
				livereload: true
			}
		},

		cssmin: {
			combine: {
				files: {
					'css/build/main.min.css': ['css/lib/*.css','css/normalize.css','css/*.css']
				}
			}
		}

	});

	// Load these required NPM tasks:
	grunt.loadNpmTasks('grunt-clear');
	grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


	//register the task
	//grunt.registerTask('test',['cssmin']);
	grunt.registerTask('build',['clear','concat','uglify','cssmin']);
	grunt.registerTask('c',['clear']); // This registers the watch task as the default task. If you require more tasks, create another one
	grunt.registerTask('default',['watch']); // This registers the watch task as the default task. If you require more tasks, create another one

};