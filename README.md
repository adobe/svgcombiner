# svgcombiner
> Let your CSS classes choose which icon to display

This utility makes it possible to generate a sprite sheet that combines multiple SVGs into a single symbol. Each SVG within the symbol is given a classname that can be used to toggle the visibility of the individual SVGs, such that icons can be swapped out by showing or hidding the respective CSS class.

For instance, the included test processes the following files:

* `test/large/S_UICornerTriangle_6_N@1x.svg`


* `test/medium/S_UICornerTriangle_5_N@1x.svg`
* `test/medium/S_UIMore_18_N@1x.svg`

Given the following configuration:

```js
{
  classPrefix: 'spectrum-UIIcon--',
  idPrefix: 'spectrum-css-icon-'
}
```

And the set of icons defined as follows:

```json
{
  "CornerTriangle": {
    "medium": "test/medium/S_UICornerTriangle_5_N@1x.svg",
    "large": "test/large/S_UICornerTriangle_6_N@1x.svg"
  },
  "More": {
    "medium": "test/medium/S_UIMore_18_N@1x.svg"
  }
}
```

The result is:

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="spectrum-css-icon-CornerTriangle">
    <path d="M5 .604V4.75a.25.25 0 0 1-.25.25H.604a.25.25 0 0 1-.177-.427L4.573.427A.25.25 0 0 1 5 .604z" class="spectrum-UIIcon--medium"/>
    <path d="M6 .25v5.5a.25.25 0 0 1-.25.25H.25a.25.25 0 0 1-.177-.427l5.5-5.5A.25.25 0 0 1 6 .25z" class="spectrum-UIIcon--large"/>
  </symbol>
  <symbol id="spectrum-css-icon-More">
    <g class="spectrum-UIIcon--medium">
      <circle cx="8" cy="2" r="2"/>
      <circle cx="14" cy="2" r="2"/>
      <circle cx="2" cy="2" r="2"/>
    </g>
  </symbol>
</svg>
```

The following CSS can then be used to toggle the two different `CornerTriangle` icons as necessary:

```css
/* Hide all icons by default */
.spectrum-UIIcon--medium,
.spectrum-UIIcon--large {
  display: none;
}

/* Show the large icons when in large mode */
.spectrum--large .spectrum-UIIcon--large {
  display: inline;
}

/* Show the medium icons when in medium mode */
.spectrum--medium .spectrum-UIIcon--medium {
  display: inline;
}
```
