# Ember-hold-button

Hold to confirm buttons, for ember-cli.

![Rectangle Button](https://s3.amazonaws.com/f.cl.ly/items/2W2B3W1Y0F1Q3Y12192Z/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)
![Circle Button](https://s3.amazonaws.com/f.cl.ly/items/412P231Y2Q261o0U2s2g/Screen%20Recording%202015-07-31%20at%2002.41%20pm.gif)

## Installation

`ember install ember-hold-button`

## Usage

`{{hold-button type="circle" action="finished"}}`

```
{{#hold-button type="rectangle" action="finished"}}
  Hold to Delete
{{/hold-button}}
```

## Options

Option | Description
-------|-------------
delay  | Time the button should be held for.
action | The action to perform on completion.
type   | Style of the button. `circle` or `rectangle`


