module.exports = function (source) {
    const loaderUtils = require('loader-utils')
    const params = loaderUtils.parseQuery(this.resourceQuery)

    const folder = getFolderParam(params);
    if (folder) {
        source = combineAllFiles(this.context, folder, source)
    }

    return source || {}
}

function getFolderParam(params) {
    for (var p in params) {
        if (p.toLowerCase() === 'folder') {
            return params[p]
        }
    }

    return null
}

function combineAllFiles(context, folder, source) {
    const fs = require('fs')
    const path = require('path')

    var jsonSource = JSON.parse(source || '{}');
    var fullFolder = path.resolve(context, folder)

    fs.readdirSync(fullFolder).forEach(file => {
        var srcFile = path.resolve(fullFolder, file)
        var srcContents = fs.readFileSync(srcFile).toString()
        jsonSource = Object.assign(jsonSource, JSON.parse(srcContents || '{}'))
    });

    return JSON.stringify(jsonSource)
}