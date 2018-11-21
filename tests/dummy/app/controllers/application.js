import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    finished(text) {
      if (text) {
        alert('PEW! ' + text);
      } else {
        alert('Pewwww');
      }
    },

    success() {
      // eslint-disable-next-line
      console.log('yay');
    }
  }
});
