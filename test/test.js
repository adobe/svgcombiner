/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

var test = require('ava');
var fs = require('fs');
var format = require('xml-formatter');

var combine = require('../index.js');

test('should combine SVGs', function(t) {
  var svg = combine('CornerTriangle', {
    'icon-medium': fs.readFileSync('test/medium/S_UICornerTriangle_5_N@1x.svg', 'utf8'),
    'icon-large': fs.readFileSync('test/large/S_UICornerTriangle_6_N@1x.svg', 'utf8')
  });

  t.is(
    format(svg),
    format(fs.readFileSync('test/CornerTriangle.svg', 'utf8'))
  );
});

test('should correctly group SVGs with more than one child', function(t) {
  var svg = combine('More', {
    'icon-medium': fs.readFileSync('test/medium/S_UIMore_18_N@1x.svg', 'utf8')
  });

  t.is(
    format(svg),
    format(fs.readFileSync('test/More.svg', 'utf8'))
  );
});
