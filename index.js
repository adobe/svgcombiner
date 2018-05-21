var $ = require('cheerio');
var fs = require('fs');
var path = require('path');

function loadXML(text) {
  return $.load(text, {
    xmlMode: true
  });
}

function readFile(filePath) {
  return fs.readFileSync(filePath);
}

function processIcon(icon, iconName, config) {
  var $symbol = loadXML('<symbol/>')('symbol');

  for (var variant in icon) {
    var iconPath = icon[variant];

    var svgContents = readFile(path.resolve(iconPath));

    var $svg = loadXML(svgContents)('svg');

    // Clean SVG

    var $group;
    if ($svg.children().length > 1) {
      // Create group to house the children
      $group = loadXML('<g/>')('g');

      $group.append($svg.children());
    }
    else {
      $group = $svg.firstChild();
    }

    $group.addClass(config.classPrefix + variant);

    $symbol.append($group);
  }

  $symbol.attr('id', config.idPrefix + iconName);

  return $symbol;
}

module.exports = function combine(icons, config) {
  var $sheet = loadXML('<svg xmlns="http://www.w3.org/2000/svg"/>')('svg');

  for (var iconName in icons) {
    var icon = icons[iconName];
    var $symbol = processIcon(icon, iconName, config);
    $sheet.append($symbol);
  }

  return $sheet.html();
};
