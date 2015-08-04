import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    finished(text) {
      if (text) {
        alert("PEW! " + text);
      } else {
        alert("Pewwww");
      }
    }
  }
});
