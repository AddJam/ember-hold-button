[![npm version](https://badge.fury.io/js/ember-hold-button.svg)](http://badge.fury.io/js/ember-hold-button)
[![Travis CI](https://travis-ci.org/AddJam/ember-hold-button.svg)](https://travis-ci.org/AddJam/ember-hold-button)

# ember-hold-button

Hold to confirm buttons, easily customisable, for ember-cli. After holding on the button for a specified amount of time, the given action is performed (e.g. hold to delete).

![Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/2W2B3W1Y0F1Q3Y12192Z/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)
![Circle Button](https://s3.amazonaws.com/f.cl.ly/items/412P231Y2Q261o0U2s2g/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)
![Border Circle Button](https://s3.amazonaws.com/f.cl.ly/items/3c2n3k08042R230Q3y2I/Screen%20Recording%202015-08-03%20at%2002.04%20pm.gif)
![Modified Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/0b2p2W1G24113b07451i/Screen%20Recording%202016-05-05%20at%2010.49%20am.gif?v=07d4f6b3)

## Installation

`ember install ember-hold-button`

## Usage

There are a few types of buttons out of the box; `rectangle`, `circle`, and `border-circle`.

### Rectangle

```hbs
{{#hold-button type="rectangle" action="delete"}}
  Hold to Delete
{{/hold-button}}
```

![Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/2W2B3W1Y0F1Q3Y12192Z/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)

### Circle

```hbs
{{hold-button type="circle" action="finished"}}
```

![Circle Button](https://s3.amazonaws.com/f.cl.ly/items/412P231Y2Q261o0U2s2g/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)

### Border Circle

```hbs
{{hold-button delay=800 type='border-circle' action='finished'}}
```

![Border Circle Button](https://s3.amazonaws.com/f.cl.ly/items/3c2n3k08042R230Q3y2I/Screen%20Recording%202015-08-03%20at%2002.04%20pm.gif)

## Options

| Option | Description                                                    | Default     |
| ------ | -------------------------------------------------------------- | ----------- |
| delay  | Time the button should be held for, in milliseconds.           | `500`.      |
| action | The action to perform on completion.                           | `null`      |
| type   | Style of the button. `circle`, `border-circle` or `rectangle`. | `rectangle` |

You can also pass arguments to the component which will then be passed to the action.

```hbs
{{hold-button model action="save" type="rectangle"}}
```

## Styling

The following are a few examples of how to style the button. The component is just a button tag containing a yield and a span. The span is the part that animates.

```hbs
{{yield}}
<span></span>
```

When you specify a `type` for the hold-button, that type becomes a class for the component. So you could specify a custom type (e.g. `type='my-cool-button'`) to customise from scratch.

The button always has the CSS class `ember-hold-button`, and also has `is-holding` while it is being held and `is-complete` upon completion. These are bound to the `isHolding` and `isComplete` attributes respectively, if you want to take control of this.

### Full progress bar

![Full Progress Bar](https://s3.amazonaws.com/f.cl.ly/items/2u1i1q0B1R3j3z0N1O2k/Screen%20Recording%202015-07-31%20at%2004.25%20pm.gif)

Template

```hbs
{{#hold-button type="rectangle" action="finished"}}
  Hold to Delete
{{/hold-button}}
```

CSS

```css
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

```hbs
{{hold-button type="circle" action="finished"}}
```

CSS

```css
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

### Completion styling

![Rectangle Button with Completion Style](https://s3.amazonaws.com/f.cl.ly/items/0b2p2W1G24113b07451i/Screen%20Recording%202016-05-05%20at%2010.49%20am.gif?v=07d4f6b3)

This one modifies the rectangle style to animate the progress bar height instead of width and places text in pseudoelements.

Template

```hbs
{{hold-button action="finished"}}
```

CSS

```css
.ember-hold-button.rectangle {
  width: 160px;
}

.ember-hold-button.rectangle span {
  height: 0;
  transition-property: height;
  width: 100%;
  z-index: 0;
}

.ember-hold-button.rectangle.is-holding span {
  height: 100%;
}

.ember-hold-button.rectangle:before {
  content: 'Hold to delete';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.ember-hold-button.rectangle:after {
  content: 'Deleted ✓';
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2ECC71;
  transition: 0.4s;
}

.ember-hold-button.rectangle.is-complete:after {
  opacity: 1;
}

.ember-hold-button.rectangle.is-complete:before {
  content: '';
}
```

## Compatibility

CSS3 transitions are being used, so IE8/9 are out the window but other browsers should be fine. See [can I use this](http://caniuse.com/#search=transition).

## Other Resources

- [Emberscreencasts demonstration of ember-hold-button](https://www.emberscreencasts.com/posts/70-ember-hold-button)

## Contributing

### Installation

- `git clone <repository-url>`
- `cd my-addon`
- `npm install`

### Linting

- `npm run lint:hbs`
- `npm run lint:js`
- `npm run lint:js -- --fix`

### Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

- `ember serve`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE.md).
