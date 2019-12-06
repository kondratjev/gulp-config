module.exports = {
    plugins: [
        // require('postcss-import'),
        require('postcss-flexbugs-fixes'),
        // require('css-mqpacker'),
        require('cssnano')({
            preset: 'default',
            autoprefixer: {
                browsers: ['last 2 versions', '> 5%'],
                add: true
            }
        }),
        require('postcss-reporter')({
            clearReportedMessages: true
        })
    ]
};