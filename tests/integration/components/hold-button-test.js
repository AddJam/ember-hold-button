import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

Ember.Test.registerAsyncHelper('sleep', function(app, duration) {
  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(resolve, duration);
  });
});

moduleForComponent('hold-button', 'Integration | Component | hold button', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);

  this.render(hbs`{{hold-button delay=0 action='finished'}}`);
  let $component = this.$('.ember-hold-button');
  assert.equal($component.length, 1);
  assert.ok(!$component.hasClass('is-holding'), "is-holding class not added");
  assert.ok(!$component.hasClass('is-complete'), "is-complete class not added");

  // Template block usage:
  this.render(hbs`
    {{#hold-button}}
      template block text
    {{/hold-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('animation time set on inline style', function(assert) {
  this.render(hbs`{{hold-button delay=600 action='finished'}}`);
  let $span = this.$('.ember-hold-button > span');

  let duration = $span.css('transition-duration');
  assert.equal(duration.indexOf("0.6"), 0);
});

test('it calls the action', function(assert) {
  assert.expect(4);
  this.render(hbs`{{hold-button delay=0 action='finished'}}`);
  let $component = this.$('.ember-hold-button');

  let finished = false;
  this.on('finished', function() {
    finished = true;
  });

  $component.mousedown();
  Ember.run.later(() => {
    assert.ok($component.hasClass('is-holding'), "is-holding class added");
    $component.mouseup();

    Ember.run.later(() => {
      assert.ok(!$component.hasClass('is-holding'), "is-holding class removed");
      assert.ok($component.hasClass('is-complete'), "is-complete class added");
      assert.ok(finished, "finished action called", "finish called");
    });
  });
});

test('type reflects CSS class', function(assert) {
  assert.expect(1);
  this.render(hbs`{{hold-button delay=0 action='finished' type='banana'}}`);
  let $component = this.$('.ember-hold-button');
  assert.ok($component.hasClass('banana'), "type class added");
});
