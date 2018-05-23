# svgcombiner
> Let your CSS classes choose which icon to display

This utility combines multiple SVGs into a single SVG. Each source SVG is given a classname that can be used to toggle its visibility, such that icons can be swapped out by showing or hiding the respective CSS class.

For instance, the included test processes the following files:

* `test/medium/S_UICornerTriangle_5_N@1x.svg`
* `test/large/S_UICornerTriangle_6_N@1x.svg`
Given the following configuration:

```js
combine('CornerTriangle', {
  'icon-medium': fs.readFileSync('test/medium/S_UICornerTriangle_5_N@1x.svg', 'utf8'),
  'icon-large': fs.readFileSync('test/large/S_UICornerTriangle_6_N@1x.svg', 'utf8')
})
```

The result is:

```xml
<svg xmlns="http://www.w3.org/2000/svg" id="CornerTriangle">
  <path d="M5,.60355V4.75A.25.25,0,0,1,4.75,5H.60355A.25.25,0,0,1,.4268,4.5732L4.5732.4268A.25.25,0,0,1,5,.60355Z" class="icon-medium"/>
  <path d="M6,.25v5.5A.25.25,0,0,1,5.75,6H.25a.25.25,0,0,1-.17675-.4268l5.5-5.49995A.25.25,0,0,1,6,.25Z" class="icon-large"/>
</svg>
```

Assuming you've embeded this SVG in the page and referenced the symbol with `<use>`:

```
<div class="checkbox">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="#icon-CheckboxCheckmark"></use>
  </svg>
</div>
```

You could then use the following CSS to switch between the medium and large icons:

```css
/* Hide all icons by default */
.icon-medium,
.icon-large {
  display: none;
}

/* Show the large icons when in large mode */
.ui-large .icon-large {
  display: inline;
}

/* Show the medium icons when in medium mode */
.ui-medium .icon-medium {
  display: inline;
}
```

Or, you could use media queries to switch between icon sets:

```css
.icon-medium {
  display: inline;
}

.icon-large {
  display: none;
}

@media (min-width:480px) {
  .icon-large {
    display: inline;
  }

  .ui-medium .icon-medium {
    display: none;
  }
}
```

#### Viewbox

The size of the viewboxes does not have to match, and viewbox is ignored entirely. You must size the icons using CSS if the size changes.

#### Spritesheets

The resulting SVGs can be combined into spritesheets using other utilities.

#### Minification

You should probably minify your SVGs before passing them to svgcombiner.

### Contributing

Contributions are welcomed! Read the [Contributing Guide](.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
