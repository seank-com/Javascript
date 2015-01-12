/*jslint indent: 4, node: true, stupid: true */
/*global require: false, process: false, readFileSync: false */

var path = require('path'),
    fs = require('fs'),
    argv = process.argv,
    argc = argv.length;

function processDirectory(dir) {
    "use strict";

    var files = fs.readdirSync(dir).sort(),
        count  = files.length,
        file = '',
        map = [],
        i = 0,
        stat;

    for (i = 0; i < count; i += 1) {
        file = files[i];

        stat = fs.statSync(path.resolve(dir, file));

        if (stat.isFile()) {
            file = file.split('.')[0].split('(')[0].trim();

            map[file] = true;
        }
    }

    files = [];
    i = 0;

    for (file in map) {
        if (map.hasOwnProperty(file)) {
            files[i] = file;
            i += 1;
        }
    }

    files = files.sort();
    count = files.length;
    for (i = 0; i < count; i += 1) {
        file = files[i].replace(/ /g, '%%20');
        console.log('\"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe\" \"http://www.imdb.com/search/title?title=%s&title_type=feature\"', file);
    }
}

function main(argc, argv) {
    "use strict";

    if (argc !== 3) {
        console.log('usage: %s %s dir', argv[0], argv[1]);
    } else {
        processDirectory(path.resolve('.', argv[2]));
    }
}

main(argc, argv);
