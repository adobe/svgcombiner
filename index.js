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

const cheerio = require('cheerio');

function loadXML(text) {
  return cheerio.load(text, {
    xmlMode: true
  });
}

function combine(iconName, icons) {
  var $ = loadXML('<svg xmlns="http://www.w3.org/2000/svg"/>');
  var $outerSvg = $('svg');

  $outerSvg.attr('id', iconName);

  for (var variantName in icons) {
    var svgContents = icons[variantName];

    // Parse SVG icon
    var $svg = $(svgContents);

    var $group;
    if ($svg.children().length > 1) {
      // Create group to house the children
      $group = $('<g/>');

      $group.append($svg.children());
    }
    else {
      // Just use the first child
      $group = $($svg.children().first());
    }

    // Check for duplicates
    var isUnique = Array.prototype.every.call($outerSvg.children(), function(svgChild) {
      // Strip classnames so we just compare the important stuff
      var isDuplicate = $.html($group).replace(/ class=".*?"/, '') === $.html(svgChild).replace(/ class=".*?"/, '');

      if (isDuplicate) {
        // Add our classname to the existing duplicate
        $(svgChild).addClass(variantName);
      }

      return !isDuplicate;
    });

    if (isUnique) {
      $group.addClass(variantName);

      $outerSvg.append($group);
    }
  }

  return $.html();
}

module.exports = combine;
