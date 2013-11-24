'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}

process.stdin.on('data', function (text) {
  console.log('received data:', util.inspect(text));
  if (text === 'quit\n') {
    done();
  }
});

console.log('continuing to do stuff');


var chokidar = require('chokidar');

var watcher = chokidar.watch('file or dir', {ignored: /^\./, persistent: true});

watcher
  .on('add', function(path) {console.log('File', path, 'has been added');})
  .on('change', function(path) {console.log('File', path, 'has been changed');})
  .on('unlink', function(path) {console.log('File', path, 'has been removed');})
  .on('error', function(error) {console.error('Error happened', error);});

// 'add' and 'change' events also receive stat() results as second argument.
// http://nodejs.org/api/fs.html#fs_class_fs_stats
watcher.on('change', function(path, stats) {
  console.log('File', path, 'changed size to', stats.size);
});

watcher.add('new-file');
watcher.add(['new-file-2', 'new-file-3']);

// Only needed if watching is persistent.
watcher.close();


