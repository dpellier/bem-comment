/**
 * Bem-comment
 * https://github.com/dpellier/bem-comment
 *
 * Copyright (c) 2014 Damien Pellier
 * Licensed under the MIT license.
 */

var LineByLineReader = require('line-by-line');
var fs = require('fs');
var cli = require('cli');

var commentBuff = {};
var previousLine = '';
var stdout = [];

module.exports = {
    processFiles: function() {
        cli.args.forEach(function(src) {
            processFile(src);
        });
    }
};

/**
 * Read a file and add full class name
 * @param {string} src
 */
function processFile(src) {
    commentBuff = {};
    previousLine = '';
    stdout = [];

    var lr = new LineByLineReader(src);

    lr.on('line', function(line) {
        stdout.push(processLine(line));
        previousLine = line;
    });

    lr.on('end', function() {
        fs.writeFile(src, stdout.join('\n') + '\n');
    });

    lr.on('error', function(err) {
        throw err;
    });
}

/**
 * Extract the needed info for class line
 * @param {string} line
 * @returns {string}
 */
function processLine(line) {
    var isClassLine = /^\s*[\.&][^\s]+/gi.test(line);

    if (!isClassLine) {
        return line;
    }

    checkPreviousLine();

    var spaces = /^\s+/gi.exec(line);
    var level = spaces ? spaces[0].length : 0;

    commentBuff[level] = line.trim().replace(/[\.&\s{]/gi, '');

    return buildComment(level) + '\n' + line;
}

/**
 * Return the complete class name comment
 * @param {number} level
 * @returns {string}
 */
function buildComment(level) {
    var comment = '\/\/ ';

    for (var i = 0; i <= level; i++) {
        comment = ' ' + comment;

        if (commentBuff[i]) {
            comment += commentBuff[i];
        }
    }

    return comment.substr(1);
}

/**
 * If the previous line is already a comment, we remove it
 */
function checkPreviousLine() {
    if (/^\s*[\/\/]/gi.test(previousLine)) {
        stdout.splice(-1);
    }
}
