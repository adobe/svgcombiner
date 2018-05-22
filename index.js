const cheerio = require('cheerio');
const fs = require('fs-extra')
const path = require('path');
const SVGO = require('svgo');
const Promise = require('promise');
const svgo = new SVGO();

function loadXML(text) {
  return cheerio.load(text, {
    xmlMode: true
  });
}

function processVariant(iconPath, variant, config) {
  return fs.readFile(iconPath)
    .then(function(svgContents) {
      return svgo.optimize(svgContents);
    })
    .then(function(result) {
      var svgContents = result.data;

      var $ = loadXML(svgContents);
      var $svg = $('svg');

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

      $group.addClass(config.classPrefix + variant);

      return $group;
    });
}

function processIcon(icon, iconName, config) {
  return new Promise(function(resolve, reject) {
    // Create a wrapper to contain the icon
    var $ = loadXML('<symbol/>');
    var $symbol = $('symbol');
    $symbol.attr('id', config.idPrefix + iconName);

    // Process each variant
    var promises = [];
    for (var variant in icon) {
      var iconPath = path.resolve(icon[variant]);
      promises.push(processVariant(iconPath, variant, config));
    }

    Promise.all(promises).then(function(results) {
      // Add variants into the group in order
      results.forEach(function($group) {
        $symbol.append($group);
      });

      resolve($symbol);
    })
    .catch(function(err) {
      reject(err);
    });
  });
}

module.exports = function combine(icons, config) {
  var $ = loadXML('<svg xmlns="http://www.w3.org/2000/svg"/>');
  var $sheet = $('svg');

  // Process each icon
  var promises = [];
  for (var iconName in icons) {
    var icon = icons[iconName];
    promises.push(processIcon(icon, iconName, config));
  }

  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(results) {
      // Add icons into the sheet in order
      results.forEach(function($symbol) {
        $sheet.append($symbol);
      });

      resolve($.xml());
    })
    .catch(function(err) {
      reject(err);
    });
  });
};
