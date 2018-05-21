var test = require('ava');

var combine = require('../index.js');

test('should combine SVGs', t => {
  var svg = combine(require('./icons.json'), {
    classPrefix: 'spectrum-UIIcon--',
    idPrefix: 'spectrum-css-icon-'
  });

  console.log(svg);

  t.pass();
});
