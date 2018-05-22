var test = require('ava');
var fs = require('fs');
var format = require('xml-formatter');

var combine = require('../index.js');

test('should combine SVGs', function(t) {
  var svg = combine('CornerTriangle', {
    medium: fs.readFileSync('test/medium/S_UICornerTriangle_5_N@1x.svg', 'utf8'),
    large: fs.readFileSync('test/large/S_UICornerTriangle_6_N@1x.svg', 'utf8')
  });

  t.is(
    format(svg),
    format(fs.readFileSync('test/CornerTriangle.svg', 'utf8'))
  );
});

test('should correctly group SVGs with more than one child', function(t) {
  var svg = combine('More', {
    medium: fs.readFileSync('test/medium/S_UIMore_18_N@1x.svg', 'utf8')
  });

  t.is(
    format(svg),
    format(fs.readFileSync('test/More.svg', 'utf8'))
  );
});
