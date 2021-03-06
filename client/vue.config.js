const path = require('path')

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    },
    chainWebpack: config => {
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
                .loader("@kazupon/vue-i18n-loader")
                .end()
            .use('i18nFolderLoader')
                .loader('./src/loaders/i18n-folder-loader')
                .end()
    }
}
