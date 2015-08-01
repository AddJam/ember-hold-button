import Ember from 'ember';
import layout from '../templates/components/hold-button';


export default Ember.Component.extend({
  layout: layout,
  tagName: 'button',
  classNames: ['ember-hold-button'],
  classNameBindings: ['isHolding', 'isComplete', 'type'],

  delay: 500,
  action: null,
  type: 'rectangle',

  timer: null,
  isHolding: false,
  isComplete: false,

  transitionStyle: Ember.computed('delay', function() {
    let delay = this.get('delay');
    let durations = Ember.EnumerableUtils.map([
      '-webkit-transition-duration',
      '-moz-transition-duration',
      'transition-duration'
    ], function(property) {
      return property + ': ' + delay + 'ms';
    }).join(';');

    return Ember.String.htmlSafe(durations);
  }),

  setup: Ember.on('willInsertElement', function() {
    this.registerHandler();
  }),

  registerHandler() {
    this.on('mouseDown', this, this.startTimer);
  },

  startTimer() {
    if (!this.get('timer')) {
      this.set('isComplete', false);
      this.set('isHolding', true);

      this.off('mouseDown');
      this.on('mouseUp', this, this.cancelTimer);
      this.on('mouseLeave', this, this.cancelTimer);

      let timer = Ember.run.later(this, this.timerFinished, this.get('delay'));
      this.set('timer', timer);
    }
  },

  cancelTimer() {
    this.set('isHolding', false);
    Ember.run.cancel(this.get('timer'));
    this.set('timer', null);
    this.off('mouseUp');
    this.off('mouseLeave');
    this.registerHandler();
  },

  timerFinished() {
    if (this.get('isHolding') && !this.get('isComplete')) {
      this.sendAction();
      this.set('isComplete', true);
      this.registerHandler();
    }
  }
});
