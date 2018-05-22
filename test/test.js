var test = require('ava');
var fs = require('fs-extra');
var format = require('xml-formatter');

var combine = require('../index.js');

test('should combine SVGs', function(t) {
  return combine(fs.readJsonSync('test/icons.json'), {
    classPrefix: 'spectrum-UIIcon--',
    idPrefix: 'spectrum-css-icon-'
  }).then(function(svg) {
    t.is(
      format(svg),
      format(fs.readFileSync('test/icons.svg', 'utf8'))
    );
  });
});
