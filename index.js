const cheerio = require('cheerio');

function loadXML(text) {
  return cheerio.load(text, {
    xmlMode: true
  });
}

function combine(iconName, icons) {
  var $ = loadXML('<svg xmlns="http://www.w3.org/2000/svg"/>');
  var $outerSvg = $('svg');

  var $symbol = $('<symbol/>');
  $symbol.attr('id', iconName);

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

    $group.addClass(variantName);

    $symbol.append($group);
  }

  $outerSvg.append($symbol);

  return $.html();
}

module.exports = combine;
