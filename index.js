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
        $group = $($svg.children().first());
      }

      $group.addClass(config.classPrefix + variant);

      return $group;
    })
    .catch(function(err) {
      console.error(err);
      reject(err);
    });
}

function processIcon(icon, iconName, config) {
  var promise = new Promise(function(resolve, reject) {
    var $ = loadXML('<symbol/>');
    var $symbol = $('symbol');
    $symbol.attr('id', config.idPrefix + iconName);

    var promises = [];
    for (var variant in icon) {
      var iconPath = path.resolve(icon[variant]);

      promises.push(
        processVariant(iconPath, variant, config).then(function($group) {
          $symbol.append($group);
        })
      );
    }

    // Wait for all files to be read and processed
    Promise.all(promises).then(function() {
      resolve($symbol);
    });
  });

  return promise;
}

module.exports = function combine(icons, config) {
  var $ = loadXML('<svg xmlns="http://www.w3.org/2000/svg"/>');
  var $sheet = $('svg');

  var promises = [];
  for (var iconName in icons) {
    var icon = icons[iconName];
    promises.push(
      processIcon(icon, iconName, config)
        .then(function($symbol) {
          $sheet.append($symbol);
        })
    );
  }

  var promise = new Promise(function(resolve, reject) {
    // Wait for all icons to be processed
    Promise.all(promises).then(function() {
      resolve($.html());
    })
    .catch(function(err) {
      reject(err);
    });
  });

  return promise;
};
