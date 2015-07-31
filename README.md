# ember-hold-button

Hold to confirm buttons, easily customisable, for ember-cli. After holding on the button for a specified amount of time, the given action is performed (e.g. hold to delete).

![Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/2W2B3W1Y0F1Q3Y12192Z/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)
![Circle Button](https://s3.amazonaws.com/f.cl.ly/items/412P231Y2Q261o0U2s2g/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)

## Installation

`ember install ember-hold-button`

## Usage

There are two types of buttons out of the box; `circle` and `rectangle`.

### Circle
`{{hold-button type="circle" action="finished"}}`    

![Circle Button](https://s3.amazonaws.com/f.cl.ly/items/412P231Y2Q261o0U2s2g/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)


### Rectangle
```
{{#hold-button type="rectangle" action="delete"}}
  Hold to Delete
{{/hold-button}}
```
![Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/2W2B3W1Y0F1Q3Y12192Z/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)

## Options

Option | Description
-------|-------------
delay  | Time the button should be held for.
action | The action to perform on completion.
type   | Style of the button. `circle` or `rectangle`


## Styling

The following are a few examples of how to style the button. The component is just a button tag containing a yield and a span. The span is the part that animates.

```
{{yield}}
<span></span>
```


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
