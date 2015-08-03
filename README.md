[![npm version](https://badge.fury.io/js/ember-hold-button.svg)](http://badge.fury.io/js/ember-hold-button)

# ember-hold-button

Hold to confirm buttons, easily customisable, for ember-cli. After holding on the button for a specified amount of time, the given action is performed (e.g. hold to delete).

![Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/2W2B3W1Y0F1Q3Y12192Z/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)
![Circle Button](https://s3.amazonaws.com/f.cl.ly/items/412P231Y2Q261o0U2s2g/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)
![Border Circle Button](https://s3.amazonaws.com/f.cl.ly/items/3c2n3k08042R230Q3y2I/Screen%20Recording%202015-08-03%20at%2002.04%20pm.gif)

## Installation

`ember install ember-hold-button`

## Usage

There are a few types of buttons out of the box; `rectangle`, `circle`, and `border-circle`.

### Rectangle
```
{{#hold-button type="rectangle" action="delete"}}
  Hold to Delete
{{/hold-button}}
```
![Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/2W2B3W1Y0F1Q3Y12192Z/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)

### Circle
`{{hold-button type="circle" action="finished"}}`    

![Circle Button](https://s3.amazonaws.com/f.cl.ly/items/412P231Y2Q261o0U2s2g/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)

### Border Circle
`{{hold-button delay=800 type='border-circle' action='finished'}}`

![Border Circle Button](https://s3.amazonaws.com/f.cl.ly/items/3c2n3k08042R230Q3y2I/Screen%20Recording%202015-08-03%20at%2002.04%20pm.gif)

## Options

Option | Description                                          | Default
-------|------------------------------------------------------|----------
delay  | Time the button should be held for, in milliseconds. | `500`.
action | The action to perform on completion.                 | `null`
type   | Style of the button. `circle`, `border-circle` or `rectangle`.        | `rectangle`


## Styling

The following are a few examples of how to style the button. The component is just a button tag containing a yield and a span. The span is the part that animates.

```
{{yield}}
<span></span>
```

When you specify a `type` for the hold-button, that type becomes a class for the component. So you could specify a custom type (e.g. `type='my-cool-button'`) to customise from scratch.

### Full progress bar
![Full Progress Bar](https://s3.amazonaws.com/f.cl.ly/items/2u1i1q0B1R3j3z0N1O2k/Screen%20Recording%202015-07-31%20at%2004.25%20pm.gif)

Template
```
{{#hold-button type="rectangle" action="finished"}}
  Hold to Delete
{{/hold-button}}
```

CSS
```
.ember-hold-button.rectangle {
  background: transparent;
  color: #aaa;
}

.ember-hold-button.rectangle span {
  z-index: -1;
  height: 100%;
  background-color: black;
}
```

### Reverse circle animation

![Reverse Circle Animation](https://s3.amazonaws.com/f.cl.ly/items/1N3B1i3G3X2J2J0Q3t27/Screen%20Recording%202015-07-31%20at%2004.31%20pm.gif)

Template    

`{{hold-button type="circle" action="finished"}}`

CSS
```
.ember-hold-button.circle {
  border-color: orange;
}

.ember-hold-button.circle span {
  background-color: orange;
  transform: scale(1);
}

.ember-hold-button.circle.is-holding span {
  transform: scale(0);
}
```

## Compatibility
CSS3 transitions are being used, so IE8/9 are out the window but other browsers should be fine. See [can I use this](http://caniuse.com/#search=transition).

## License

The MIT License (MIT)

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
