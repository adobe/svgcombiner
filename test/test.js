var test = require('ava');
var fs = require('fs');

var combine = require('../index.js');

test('should combine SVGs', function(t) {
  return combine(require('./icons.json'), {
    classPrefix: 'spectrum-UIIcon--',
    idPrefix: 'spectrum-css-icon-'
  }).then(function(svg) {
    t.is(svg, fs.readFileSync('test/icons.svg', 'utf8'));
  });
});
