module.exports = function(grunt) {    
    
    // Plugins
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-mailgun');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Tasks
    grunt.registerTask('default', ['premailer', 'newer:imagemin', 'watch']);
    grunt.registerTask('html', ['premailer']);
    grunt.registerTask('images', ['imagemin']);
    grunt.registerTask('send', ['mailgun']);
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
        * Set project info
        */
        project: {
          src: 'src',
          build: 'build'
        },
        imagemin: {
          dynamic: {                       
            files: [{
              expand: true,
              cwd: 'src/',
              src: ['*.{png,jpg,gif}'],
              dest: '<%= project.build %>/'
            }]
          }
        },
        premailer: {
          main: {
            options: {
              verbose: true
            },
            files: {
              '<%= project.build %>/index.html': ['<%= project.src %>/index.html']
            }
          }
        },
        mailgun: {
          mailer: {
            options: {
              key: 'key-7b7afd2aae081f12ab49b67077f5e1db', // Enter your Mailgun API key here
              sender: 'mick@binaryvein.com', // Change this
              recipient: ['mickperkins@gmail.com'], // Change this
              subject: 'This is a test email'
            },
            src: ['<%= project.src %>/index.html']
          }
        },

		watch: {
            templates : {
                files: ['<%= project.src %>/index.html'],
                tasks: ['html']
            },
			images : {
                files: ['<%= project.src %>/*.{png,jpg,gif}'],
                tasks: ['images']
			}
        },
    });
};
