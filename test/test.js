var test = require('ava');

var combine = require('../index.js');

test('should combine SVGs', t => {
  return combine(require('./icons.json'), {
    classPrefix: 'spectrum-UIIcon--',
    idPrefix: 'spectrum-css-icon-'
  }).then(function(svg) {
    console.log(svg);
    t.pass();
  });
});
